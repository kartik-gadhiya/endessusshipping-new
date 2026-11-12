#!/usr/bin/env node

/**
 * send-deployment-email.mjs
 * Sends deployment status notification emails to all recipients listed in DEPLOY_NOTIFY_EMAILS.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Load environment variables from .env in project root
const envPath = path.join(projectRoot, ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

// Parse command line arguments
function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("--")) {
      const eqIndex = arg.indexOf("=");
      if (eqIndex !== -1) {
        const key = arg.slice(2, eqIndex);
        const value = arg.slice(eqIndex + 1);
        args[key] = value;
      } else {
        args[arg.slice(2)] = true;
      }
    }
  }
  return args;
}

const args = parseArgs();

const status = (args.status || process.env.DEPLOY_STATUS || "SUCCESS").toUpperCase();
const isSuccess = status === "SUCCESS";
const branch = args.branch || process.env.DEPLOY_BRANCH || "main";
const commit = args.commit || process.env.DEPLOY_COMMIT || "HEAD";
const author = args.author || process.env.DEPLOY_AUTHOR || "Automated System";
const message = args.message || process.env.DEPLOY_MESSAGE || "No commit message provided";
const duration = args.duration || process.env.DEPLOY_DURATION || "0";
const errorMessage = args.error || process.env.DEPLOY_ERROR || "";
const logFile = args["log-file"] || process.env.DEPLOY_LOG_FILE || "";
const hostname = args.hostname || os.hostname();
const timestamp = new Date().toUTCString();

// Validate email helper
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Extract and parse recipients from DEPLOY_NOTIFY_EMAILS
const rawRecipients = process.env.DEPLOY_NOTIFY_EMAILS || "";
const recipients = Array.from(
  new Set(
    rawRecipients
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0 && isValidEmail(e))
  )
);

if (recipients.length === 0) {
  console.warn(
    "[Notification Warning] No valid email addresses found in DEPLOY_NOTIFY_EMAILS. Skipping email dispatch."
  );
  console.warn(
    "Ensure DEPLOY_NOTIFY_EMAILS is configured in your .env file (e.g., DEPLOY_NOTIFY_EMAILS=admin@example.com,dev@example.com)"
  );
  process.exit(0);
}

// Validate SMTP credentials
const smtpHost = process.env.MAIL_HOST;
const smtpPort = parseInt(process.env.MAIL_PORT || "587", 10);
const smtpUser = process.env.MAIL_USERNAME;
const smtpPass = process.env.MAIL_PASSWORD;
const smtpFromAddress = process.env.MAIL_FROM_ADDRESS || smtpUser;
const smtpFromName = process.env.MAIL_FROM_NAME || "En Dessus Deployment";
const smtpEncryption = (process.env.MAIL_ENCRYPTION || "").toLowerCase();

if (!smtpHost || !smtpUser || !smtpPass) {
  console.error("[Notification Error] Missing SMTP credentials in .env (MAIL_HOST, MAIL_USERNAME, MAIL_PASSWORD).");
  console.error("Cannot send deployment email notification.");
  process.exit(1);
}

// Read log snippet if log file exists
let logSnippet = "";
if (logFile && fs.existsSync(logFile)) {
  try {
    const fullLog = fs.readFileSync(logFile, "utf-8");
    const lines = fullLog.trim().split("\n");
    // Get last 40 lines
    logSnippet = lines.slice(-40).join("\n");
  } catch (err) {
    logSnippet = `Could not read log file: ${err.message}`;
  }
}

// Configure nodemailer transporter
const isSecure = smtpEncryption === "ssl" || smtpEncryption === "tls" || smtpPort === 465;
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: isSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

// Build HTML email content
const statusColor = isSuccess ? "#16a34a" : "#dc2626";
const statusBadgeBg = isSuccess ? "#dcfce7" : "#fee2e2";
const statusBadgeColor = isSuccess ? "#15803d" : "#b91c1c";
const statusText = isSuccess ? "DEPLOYMENT SUCCESSFUL" : "DEPLOYMENT FAILED";
const statusIcon = isSuccess ? "✔" : "✖";

const subject = `[${isSuccess ? "SUCCESS" : "FAILED"}] Deployment on ${branch} (${commit.slice(0, 7)}) - En Dessus`;

const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
    .header { background: ${isSuccess ? "linear-gradient(135deg, #065f46 0%, #047857 100%)" : "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)"}; padding: 28px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
    .badge { display: inline-block; margin-top: 10px; padding: 6px 14px; background: rgba(255,255,255,0.2); border-radius: 9999px; font-size: 13px; font-weight: 700; color: #ffffff; }
    .content { padding: 28px 24px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .meta-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .meta-table td.label { font-weight: 600; color: #64748b; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
    .meta-table td.value { font-weight: 500; color: #0f172a; word-break: break-all; }
    .code-box { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; line-height: 1.5; overflow-x: auto; white-space: pre-wrap; max-height: 320px; }
    .error-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; color: #991b1b; font-size: 13px; font-weight: 600; }
    .footer { padding: 18px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">${statusIcon} ${statusText}</span>
      <h1 style="margin-top: 12px;">En Dessus Global Forwarding</h1>
    </div>

    <div class="content">
      ${!isSuccess && errorMessage ? `<div class="error-box"><strong>Error Details:</strong><br>${errorMessage}</div>` : ""}

      <table class="meta-table">
        <tr>
          <td class="label">Status</td>
          <td class="value"><span style="color: ${statusColor}; font-weight: 700;">${status}</span></td>
        </tr>
        <tr>
          <td class="label">Branch</td>
          <td class="value"><code>${branch}</code></td>
        </tr>
        <tr>
          <td class="label">Commit</td>
          <td class="value"><code>${commit}</code></td>
        </tr>
        <tr>
          <td class="label">Commit Message</td>
          <td class="value">${message}</td>
        </tr>
        <tr>
          <td class="label">Commit Author</td>
          <td class="value">${author}</td>
        </tr>
        <tr>
          <td class="label">Deployment Duration</td>
          <td class="value">${duration} seconds</td>
        </tr>
        <tr>
          <td class="label">Server Host</td>
          <td class="value">${hostname}</td>
        </tr>
        <tr>
          <td class="label">Timestamp</td>
          <td class="value">${timestamp}</td>
        </tr>
        <tr>
          <td class="label">Recipients</td>
          <td class="value">${recipients.join(", ")}</td>
        </tr>
      </table>

      ${
        logSnippet
          ? `<p style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;">Recent Deployment Logs:</p>
             <div class="code-box">${logSnippet.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`
          : ""
      }
    </div>

    <div class="footer">
      Automated deployment alert generated by En Dessus CI/CD pipeline on ${hostname}.
    </div>
  </div>
</body>
</html>
`;

const textBody = `
[${statusText}] En Dessus Application Deployment

Status: ${status}
Branch: ${branch}
Commit: ${commit}
Author: ${author}
Message: ${message}
Duration: ${duration} seconds
Server: ${hostname}
Timestamp: ${timestamp}
Recipients: ${recipients.join(", ")}

${errorMessage ? `Error: ${errorMessage}\n` : ""}
${logSnippet ? `Recent Logs:\n${logSnippet}` : ""}
`;

// Send email
async function send() {
  console.log(`[Notification] Preparing to send deployment ${status} email...`);
  console.log(`[Notification] Recipients (${recipients.length}): ${recipients.join(", ")}`);

  try {
    const info = await transporter.sendMail({
      from: `"${smtpFromName}" <${smtpFromAddress}>`,
      to: recipients,
      subject: subject,
      text: textBody,
      html: htmlBody,
    });

    console.log(`[Notification Success] Deployment email sent successfully! MessageId: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`[Notification Error] Failed to send email via SMTP (${smtpHost}:${smtpPort}):`, error.message);
    return false;
  }
}

send().then((success) => {
  process.exit(success ? 0 : 1);
});

