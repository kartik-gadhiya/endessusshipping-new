#!/usr/bin/env node

/**
 * webhook-deploy-server.mjs
 * Optional standalone HTTP listener for GitHub Webhooks.
 * Triggers scripts/deploy.sh whenever code is merged/pushed to the main branch.
 *
 * Usage:
 *   WEBHOOK_PORT=9000 WEBHOOK_SECRET=your_secret node scripts/webhook-deploy-server.mjs
 * Or with PM2:
 *   pm2 start scripts/webhook-deploy-server.mjs --name "deploy-webhook"
 */

import http from "node:http";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const PORT = parseInt(process.env.WEBHOOK_PORT || "9000", 10);
const SECRET = process.env.WEBHOOK_SECRET || "";

function verifySignature(secret, body, signature) {
  if (!secret) return true; // If no secret configured, allow (warned at startup)
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = `sha256=${hmac.update(body).digest("hex")}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

let isDeploying = false;

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/webhook/deploy") {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Not Found. Endpoint is POST /webhook/deploy" }));
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    // Protect against oversized payloads (> 5MB)
    if (body.length > 5 * 1024 * 1024) {
      res.writeHead(413, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Payload too large" }));
      req.destroy();
    }
  });

  req.on("end", () => {
    const signature = req.headers["x-hub-signature-256"];
    if (SECRET && !verifySignature(SECRET, body, signature)) {
      console.warn("[Webhook] Invalid signature received.");
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Invalid signature" }));
    }

    let payload = {};
    try {
      payload = JSON.parse(body);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Invalid JSON" }));
    }

    const event = req.headers["x-github-event"];
    if (event === "ping") {
      console.log("[Webhook] Ping event received from GitHub.");
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "PONG" }));
    }

    const ref = payload.ref;
    if (ref !== "refs/heads/main") {
      console.log(`[Webhook] Push event ignored for non-main branch: ${ref}`);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: `Ignored push to branch ${ref}` }));
    }

    if (isDeploying) {
      console.warn("[Webhook] A deployment is already in progress. Ignoring duplicate trigger.");
      res.writeHead(429, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Deployment already in progress" }));
    }

    console.log(`[Webhook] Push/Merge to main detected (Commit: ${payload.after?.slice(0, 7) || "unknown"}). Triggering deploy.sh...`);
    isDeploying = true;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, message: "Deployment triggered successfully" }));

    const deployProcess = spawn("bash", [path.join(projectRoot, "scripts", "deploy.sh"), "main"], {
      cwd: projectRoot,
      stdio: "inherit",
      detached: true,
    });

    deployProcess.on("close", (code) => {
      isDeploying = false;
      console.log(`[Webhook] Deployment process completed with exit code ${code}.`);
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[Webhook Listener] Server running on port ${PORT}`);
  console.log(`[Webhook Listener] Listening on POST http://0.0.0.0:${PORT}/webhook/deploy`);
  if (!SECRET) {
    console.warn("[Webhook Listener Warning] WEBHOOK_SECRET is not set. Signature verification is disabled.");
  }
});

