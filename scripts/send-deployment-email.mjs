#!/usr/bin/env node

/**
 * send-deployment-email.mjs
 * Sends modern, executive-grade deployment status notification emails to all
 * recipients configured in DEPLOY_NOTIFY_EMAILS.
 * Fully optimized for both desktop and mobile email clients.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import child_process from "node:child_process";
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

// Clean quoted environment strings
function cleanEnv(val, defaultVal = "") {
  if (val === undefined || val === null) return defaultVal;
  return String(val).replace(/^["']|["']$/g, "").trim();
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

// Git repository auto-detection
function detectGitRepo(dir) {
  try {
    const remoteUrl = child_process
      .execSync("git config --get remote.origin.url", { cwd: dir, timeout: 2000, stdio: ["pipe", "pipe", "ignore"] })
      .toString()
      .trim();
    if (remoteUrl) {
      const match = remoteUrl.match(/(?:github\.com[:/])([^/]+)\/([^/]+?)(?:\.git)?$/i);
      if (match) {
        return `${match[1]}/${match[2]}`;
      }
      return remoteUrl.replace(/^.*github\.com[:/]/, "").replace(/\.git$/, "");
    }
  } catch (e) {
    // fallback
  }
  return "";
}

// Domain auto-detection
function detectDomain(dir, repo) {
  const norm = dir.replace(/\/+$/, "");
  if (norm.endsWith("endessusshipping-dev")) return "dev.endessusshipping.com";
  if (norm.endsWith("endessusshipping")) return "endessusshipping.com";
  if (norm.endsWith("endessus_transport") || norm.endsWith("taksh-logistics")) return "endessustransport.com";
  if (repo.includes("endessusshipping-dev")) return "dev.endessusshipping.com";
  if (repo.includes("endessusshipping")) return "endessusshipping.com";
  return "endessustransport.com";
}

// Project name auto-detection
function detectProjectName(dir, repo) {
  const norm = dir.replace(/\/+$/, "");
  if (norm.endsWith("endessusshipping-dev")) return "En Dessus Shipping (Dev)";
  if (norm.endsWith("endessusshipping")) return "En Dessus Shipping";
  if (norm.endsWith("taksh-logistics")) return "Endessus Transport (Frontend)";
  if (norm.endsWith("endessus_transport")) return "Endessus Transport (Admin Backend)";
  return "Endessus Application";
}

// Status & metadata
const status = cleanEnv(args.status || process.env.DEPLOY_STATUS, "SUCCESS").toUpperCase();
const isSuccess = status === "SUCCESS";
const repo = cleanEnv(
  args.repo || args.repository || process.env.DEPLOY_REPO || process.env.DEPLOY_REPOSITORY || process.env.GITHUB_REPOSITORY,
  detectGitRepo(projectRoot) || "kartik-gadhiya/taksh-logistics"
);
const domain = cleanEnv(
  args.domain || process.env.DEPLOY_DOMAIN || process.env.APP_URL,
  detectDomain(projectRoot, repo)
).replace(/^https?:\/\//, "");

const projectName = cleanEnv(
  args.project || args["app-name"] || process.env.MAIL_FROM_NAME || process.env.APP_NAME,
  detectProjectName(projectRoot, repo)
);

const branch = cleanEnv(args.branch || process.env.DEPLOY_BRANCH, "main");
const commit = cleanEnv(args.commit || process.env.DEPLOY_COMMIT, "HEAD");
const author = cleanEnv(args.author || process.env.DEPLOY_AUTHOR, "Automated System");
const message = cleanEnv(args.message || process.env.DEPLOY_MESSAGE, "Automated CI/CD deployment execution");
const duration = cleanEnv(args.duration || process.env.DEPLOY_DURATION, "0");
const errorMessage = cleanEnv(args.error || process.env.DEPLOY_ERROR, "");
const logFile = cleanEnv(args["log-file"] || process.env.DEPLOY_LOG_FILE, "");
const hostname = cleanEnv(args.hostname, os.hostname());

// Date formatting
const now = new Date();
const formattedDate = now.toUTCString();

// Email validation
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Recipients
const rawRecipients = cleanEnv(process.env.DEPLOY_NOTIFY_EMAILS, "");
const recipients = Array.from(
  new Set(
    rawRecipients
      .split(",")
      .map((e) => cleanEnv(e))
      .filter((e) => e.length > 0 && isValidEmail(e))
  )
);

if (recipients.length === 0) {
  console.log("[Notification Info] No valid email addresses found in DEPLOY_NOTIFY_EMAILS. Skipping email dispatch.");
  process.exit(0);
}

// SMTP credentials
const smtpHost = cleanEnv(process.env.MAIL_HOST);
const smtpPort = parseInt(cleanEnv(process.env.MAIL_PORT, "465"), 10);
const smtpUser = cleanEnv(process.env.MAIL_USERNAME);
const smtpPass = cleanEnv(process.env.MAIL_PASSWORD);
const smtpFromAddress = (smtpHost.includes("hostinger") && smtpUser) ? smtpUser : (cleanEnv(process.env.MAIL_FROM_ADDRESS) || smtpUser);
const smtpFromName = cleanEnv(process.env.MAIL_FROM_NAME) || `${projectName} CI/CD`;
const smtpMailer = cleanEnv(process.env.MAIL_MAILER, "smtp").toLowerCase();
const smtpEncryption = cleanEnv(process.env.MAIL_ENCRYPTION, smtpPort === 465 ? "ssl" : "").toLowerCase();

if (smtpMailer === "log" || !smtpHost || !smtpUser || !smtpPass) {
  console.log("[Notification Info] SMTP credentials not fully configured in .env. Skipping email dispatch.");
  process.exit(0);
}

// Read log snippet if available
let logSnippet = "";
if (logFile && fs.existsSync(logFile)) {
  try {
    const fullLog = fs.readFileSync(logFile, "utf-8");
    const lines = fullLog.trim().split("\n");
    logSnippet = lines.slice(-40).join("\n");
  } catch (err) {
    logSnippet = `Could not read log file: ${err.message}`;
  }
}

// Transporter configuration
const isSecure = smtpEncryption === "ssl" || smtpEncryption === "tls" || smtpPort === 465;
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: isSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Presentation details
const statusColor = isSuccess ? "#059669" : "#dc2626";
const statusBadgeBg = isSuccess ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)";
const statusBadgeBorder = isSuccess ? "rgba(52, 211, 153, 0.4)" : "rgba(248, 113, 113, 0.4)";
const statusBadgeText = isSuccess ? "#34d399" : "#f87171";
const statusText = isSuccess ? "DEPLOYMENT SUCCESSFUL" : "DEPLOYMENT FAILED";
const statusIcon = isSuccess ? "&#10003;" : "&#10007;";

const domainUrl = domain.startsWith("http") ? domain : `https://${domain}`;
const repoUrl = repo.startsWith("http") ? repo : `https://github.com/${repo}`;
const commitUrl = repoUrl && commit !== "HEAD" && commit !== "unknown" ? `${repoUrl}/commit/${commit}` : repoUrl;
const shortCommit = commit.length > 7 ? commit.slice(0, 7) : commit;

// Clean subject line with Status, Repo, Branch, Domain
const subject = `[${isSuccess ? "SUCCESS" : "FAILED"}] Deployment: ${repo} (${branch}) - ${domain}`;

const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>${subject}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    /* Base resets */
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
      -ms-interpolation-mode: bicubic;
    }
    a {
      text-decoration: none;
    }

    /* Mobile Responsive Rules */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 12px 8px !important;
      }
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 12px !important;
      }
      .header-cell {
        padding: 26px 18px 22px 18px !important;
      }
      .header-title {
        font-size: 19px !important;
        line-height: 1.3 !important;
      }
      .header-subtitle {
        font-size: 12px !important;
      }
      .body-cell {
        padding: 20px 14px 18px 14px !important;
      }
      
      /* Stack 2x2 metric cards vertically into full-width cards */
      .grid-row {
        display: block !important;
        width: 100% !important;
      }
      .grid-col {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 10px !important;
        box-sizing: border-box !important;
      }
      .metric-box {
        padding: 14px !important;
      }
      .metric-label {
        font-size: 10.5px !important;
        margin-bottom: 4px !important;
      }
      .metric-value {
        font-size: 13.5px !important;
        line-height: 1.4 !important;
      }

      /* Stack Meta Details Table */
      .meta-table {
        margin-bottom: 20px !important;
      }
      .meta-row {
        display: block !important;
        width: 100% !important;
        border-bottom: 1px solid #f1f5f9 !important;
        padding: 10px 14px !important;
        box-sizing: border-box !important;
      }
      .meta-label {
        display: block !important;
        width: 100% !important;
        padding: 0 0 4px 0 !important;
        border-bottom: none !important;
        font-size: 11px !important;
        color: #64748b !important;
      }
      .meta-value {
        display: block !important;
        width: 100% !important;
        padding: 0 !important;
        border-bottom: none !important;
        font-size: 13px !important;
        color: #0f172a !important;
      }

      /* Full-width touch friendly action button */
      .btn-table {
        width: 100% !important;
      }
      .btn-cell {
        display: block !important;
        width: 100% !important;
      }
      .action-btn {
        display: block !important;
        width: 100% !important;
        padding: 14px 16px !important;
        font-size: 14px !important;
        box-sizing: border-box !important;
        text-align: center !important;
      }

      /* Log viewer box */
      .log-box {
        padding: 12px !important;
        font-size: 10.5px !important;
        max-height: 220px !important;
        word-break: break-all !important;
      }

      .footer-cell {
        padding: 20px 16px !important;
      }
      .footer-text {
        font-size: 11px !important;
        line-height: 1.5 !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="email-wrapper" style="background-color: #f1f5f9; table-layout: fixed; width: 100%;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <!-- MAIN CONTAINER (Max 620px Desktop, 100% Mobile) -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="email-container" style="max-width: 620px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);">
          
          <!-- HEADER -->
          <tr>
            <td class="header-cell" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 36px 32px 32px 32px; text-align: center; border-bottom: 3px solid ${statusColor};">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto 14px auto;">
                <tr>
                  <td style="background-color: ${statusBadgeBg}; border: 1px solid ${statusBadgeBorder}; border-radius: 9999px; padding: 6px 18px; font-size: 12px; font-weight: 700; color: ${statusBadgeText}; letter-spacing: 0.08em; text-transform: uppercase;">
                    ${statusIcon}&nbsp;&nbsp;${statusText}
                  </td>
                </tr>
              </table>
              <h1 class="header-title" style="margin: 0 0 6px 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.3;">
                ${projectName}
              </h1>
              <p class="header-subtitle" style="margin: 0; color: #94a3b8; font-size: 13px; font-weight: 500;">
                Automated CI/CD Pipeline &bull; ${hostname}
              </p>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td class="body-cell" style="padding: 32px 32px 24px 32px;">

              ${!isSuccess && errorMessage ? `
              <!-- ERROR ALERT BOX -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; overflow: hidden; width: 100%;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 12px; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
                      Deployment Error Details
                    </div>
                    <div style="font-size: 13px; color: #b91c1c; line-height: 1.5; font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; word-break: break-word; overflow-wrap: anywhere;">
                      ${errorMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                    </div>
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- 2x2 KEY METRICS GRID (Responsive Stacking on Mobile) -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; width: 100%;">
                <tr class="grid-row">
                  <!-- REPOSITORY CARD -->
                  <td width="50%" valign="top" class="grid-col" style="padding-right: 8px; padding-bottom: 16px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="metric-box" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; height: 100%;">
                      <tr>
                        <td style="padding: 16px;">
                          <div class="metric-label" style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
                            Repository
                          </div>
                          <div class="metric-value" style="font-size: 14px; font-weight: 700; color: #0f172a; word-break: break-word; overflow-wrap: anywhere;">
                            ${repoUrl ? `<a href="${repoUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">${repo}</a>` : repo}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  
                  <!-- BRANCH CARD -->
                  <td width="50%" valign="top" class="grid-col" style="padding-left: 8px; padding-bottom: 16px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="metric-box" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; height: 100%;">
                      <tr>
                        <td style="padding: 16px;">
                          <div class="metric-label" style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
                            Target Branch
                          </div>
                          <div class="metric-value" style="font-size: 14px; font-weight: 700; color: #0f172a;">
                            <span style="display: inline-block; background-color: #e0e7ff; color: #3730a3; padding: 3px 10px; border-radius: 6px; font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 12px; font-weight: 700;">
                              ${branch}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr class="grid-row">
                  <!-- DOMAIN CARD -->
                  <td width="50%" valign="top" class="grid-col" style="padding-right: 8px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="metric-box" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; height: 100%;">
                      <tr>
                        <td style="padding: 16px;">
                          <div class="metric-label" style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
                            Live Domain
                          </div>
                          <div class="metric-value" style="font-size: 14px; font-weight: 700; color: #0f172a; word-break: break-word; overflow-wrap: anywhere;">
                            <a href="${domainUrl}" target="_blank" style="color: #059669; text-decoration: none; font-weight: 700;">
                              ${domain} &#8599;
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- DURATION CARD -->
                  <td width="50%" valign="top" class="grid-col" style="padding-left: 8px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="metric-box" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; height: 100%;">
                      <tr>
                        <td style="padding: 16px;">
                          <div class="metric-label" style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
                            Duration & Status
                          </div>
                          <div class="metric-value" style="font-size: 14px; font-weight: 700; color: ${statusColor};">
                            ${duration}s &bull; <span style="font-weight: 800;">${status}</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- DETAILED META TABLE (Clean Desktop & Stacked Mobile) -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="meta-table" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px; width: 100%;">
                <tr class="meta-row">
                  <td class="meta-label" style="padding: 12px 18px; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 600; color: #64748b; width: 30%; text-transform: uppercase; letter-spacing: 0.05em;">
                    Commit
                  </td>
                  <td class="meta-value" style="padding: 12px 18px; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 500; color: #0f172a; word-break: break-word;">
                    <a href="${commitUrl}" target="_blank" style="display: inline-block; background-color: #f1f5f9; color: #2563eb; padding: 2px 8px; border-radius: 6px; font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 12px; text-decoration: none; font-weight: 700;">
                      ${shortCommit}
                    </a>
                  </td>
                </tr>
                <tr class="meta-row">
                  <td class="meta-label" style="padding: 12px 18px; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                    Commit Message
                  </td>
                  <td class="meta-value" style="padding: 12px 18px; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 500; color: #0f172a; line-height: 1.45; word-break: break-word; overflow-wrap: anywhere;">
                    ${message}
                  </td>
                </tr>
                <tr class="meta-row">
                  <td class="meta-label" style="padding: 12px 18px; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                    Author
                  </td>
                  <td class="meta-value" style="padding: 12px 18px; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 500; color: #0f172a; word-break: break-word; overflow-wrap: anywhere;">
                    ${author}
                  </td>
                </tr>
                <tr class="meta-row">
                  <td class="meta-label" style="padding: 12px 18px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                    Deployment Time
                  </td>
                  <td class="meta-value" style="padding: 12px 18px; font-size: 13px; font-weight: 500; color: #0f172a; word-break: break-word;">
                    ${formattedDate}
                  </td>
                </tr>
              </table>

              <!-- PRIMARY ACTION BUTTON (Responsive Touch Target) -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="btn-table" style="margin-bottom: 24px; width: 100%;">
                <tr>
                  <td align="center" class="btn-cell">
                    <a href="${domainUrl}" target="_blank" class="action-btn" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; padding: 13px 32px; border-radius: 8px; font-size: 13.5px; font-weight: 700; text-decoration: none; letter-spacing: 0.02em; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);">
                      Open Live Website &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              ${logSnippet ? `
              <!-- RECENT LOGS SNIPPET -->
              <div style="margin-top: 24px;">
                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">
                  Recent Deployment Logs
                </div>
                <div class="log-box" style="background-color: #090d16; color: #cbd5e1; padding: 16px; border-radius: 10px; font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; line-height: 1.5; overflow-x: auto; white-space: pre-wrap; word-break: break-all; max-height: 260px; border: 1px solid #1e293b;">
${logSnippet.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                </div>
              </div>
              ` : ""}

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td class="footer-cell" style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p class="footer-text" style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #475569;">
                Automated CI/CD Deployment Alert
              </p>
              <p class="footer-text" style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5; word-break: break-word;">
                Delivered to ${recipients.join(", ")} &bull; ${projectName} &bull; ${domain}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const textBody = `[${statusText}] ${projectName} Deployment

Status: ${status}
Repository: ${repo}
Branch: ${branch}
Domain: ${domainUrl}
Commit: ${shortCommit}
Message: ${message}
Author: ${author}
Duration: ${duration}s
Server: ${hostname}
Timestamp: ${formattedDate}
Recipients: ${recipients.join(", ")}

${errorMessage ? `Error: ${errorMessage}\n` : ""}
${logSnippet ? `Recent Logs:\n${logSnippet}` : ""}
`;

// Send email dispatch
async function send() {
  console.log(`[Notification] Dispatching deployment ${status} email...`);
  console.log(`[Notification] Project: ${projectName} | Repo: ${repo} | Branch: ${branch} | Domain: ${domain}`);
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
