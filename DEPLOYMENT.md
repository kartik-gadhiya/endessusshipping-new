# Automated Deployment & Notification Guide

This repository is configured with an automated CI/CD deployment pipeline that automatically pulls latest changes, installs dependencies, builds the production bundle, and dispatches email notifications (Success/Failed) to multiple configured recipients whenever code is merged and pushed to the `main` branch.

---

## 1. Architecture Overview

```
[ Developer merges / pushes to main ]
               │
               ▼
[ GitHub Actions (.github/workflows/deploy.yml) ]  OR  [ GitHub Webhook (/webhook/deploy) ]
               │
               ▼
[ Server executes scripts/deploy.sh ]
   ├─ 1. Git fetch & checkout main
   ├─ 2. Git pull origin main
   ├─ 3. npm install (dependency sync)
   ├─ 4. npm run build (generates dist/)
   └─ 5. Verifies build output
               │
               ▼
[ scripts/send-deployment-email.mjs ]
   ├─ Reads DEPLOY_NOTIFY_EMAILS from .env
   ├─ Reads SMTP config from .env
   └─ Sends rich HTML status email to all recipients
```

---

## 2. Configuration (`.env`)

Add or update the following variables in your server's `.env` file:

```env
# ==============================================================================
# Deployment Notification Recipients
# Comma-separated list of email addresses
# ==============================================================================
DEPLOY_NOTIFY_EMAILS=admin@example.com,developer@example.com,manager@example.com

# ==============================================================================
# SMTP Configuration (Required to send emails)
# ==============================================================================
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=your-email@example.com
MAIL_PASSWORD=your-password-here
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=your-email@example.com
MAIL_FROM_NAME="En Dessus Deployment"
```

> **Note**: You can specify any number of recipient email addresses separated by commas. Whitespace around emails is automatically trimmed, and invalid addresses are safely filtered out.

---

## 3. GitHub Automatic Trigger Options

### Option A: GitHub Actions via SSH (Recommended)

When you merge and push to the `main` branch, the GitHub Actions workflow at `.github/workflows/deploy.yml` triggers automatically and securely connects to your server via SSH to execute `scripts/deploy.sh`.

#### Setting up GitHub Secrets:
1. Go to your GitHub repository: **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret** and add the following:

| Secret Name | Description | Example Value |
|---|---|---|
| `SERVER_HOST` | Server IP or domain | `123.45.67.89` or `app.endessus.com` |
| `SERVER_USER` | SSH username on server | `root`, `ubuntu`, or `deploy` |
| `SERVER_SSH_KEY` | Private SSH key (matching `~/.ssh/authorized_keys` on server) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SERVER_TARGET_DIR` | Absolute path to repository on server | `/opt/homebrew/var/www/endessusshipping-new` |
| `SERVER_PORT` *(Optional)* | SSH port (defaults to `22`) | `22` |

Once these secrets are configured, every push/merge to `main` will automatically deploy!

---

### Option B: Standalone Webhook Listener (Alternative without SSH)

If you prefer GitHub to call an HTTP webhook on your server instead of using SSH:

1. Start the webhook listener with PM2 on your server:
   ```bash
   WEBHOOK_PORT=9000 WEBHOOK_SECRET="your_custom_secret" pm2 start scripts/webhook-deploy-server.mjs --name "deploy-webhook"
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Webhooks** → **Add webhook**.
   - **Payload URL**: `http://your-server-ip:9000/webhook/deploy` (or your reverse-proxied HTTPS URL).
   - **Content type**: `application/json`
   - **Secret**: `your_custom_secret`
   - **Which events**: Select *"Just the push event"*.
   - Click **Add webhook**.

---

## 4. Manual Deployment on Server

You can also trigger deployment manually at any time directly on the server:

```bash
# Make sure scripts are executable
chmod +x scripts/deploy.sh scripts/send-deployment-email.mjs

# Run the deployment
./scripts/deploy.sh main
```

---

## 5. Deployment Email Notification Features

Every deployment notification email includes:
- **Status Banner**: Green with checkmark for **SUCCESS**, Red with alert for **FAILED**.
- **Metadata**: Target branch, commit hash, commit message, author, deployment duration, timestamp, and server hostname.
- **Error Diagnostics**: If a build or git step fails, the exact failing command and line number are highlighted.
- **Log Snippet**: The last 40 lines of the deployment log are automatically attached for fast debugging.

---

## 6. Gallery Watermark Management

To prevent unnecessary processing and file modifications during deployment, watermark generation is **not** run automatically on builds.

- All existing gallery images are tracked via `.watermark-cache/watermark-manifest.json`.
- When new gallery images are added and need to be watermarked, run the script manually:
  ```bash
  npm run watermark:gallery
  ```
- To force re-watermarking on all gallery images:
  ```bash
  npm run watermark:gallery -- --force
  ```

