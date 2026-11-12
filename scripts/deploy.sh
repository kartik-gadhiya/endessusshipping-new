#!/usr/bin/env bash

# ==============================================================================
# Automated Deployment Script for En Dessus Global Forwarding
#
# Usage:
#   ./scripts/deploy.sh [branch_name]
# Defaults:
#   branch_name: main
# ==============================================================================

set -uo pipefail

# 1. Resolve project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}" || exit 1

TARGET_BRANCH="${1:-main}"
START_TIME=$(date +%s)
HOSTNAME_NAME=$(hostname 2>/dev/null || echo "server")

# 2. Set up logging directory and file
LOG_DIR="${PROJECT_ROOT}/.deploy-logs"
mkdir -p "${LOG_DIR}"
LOG_FILE="${LOG_DIR}/deploy_$(date +'%Y%m%d_%H%M%S').log"

# Duplicate stdout & stderr to log file while keeping console output
exec > >(tee -a "${LOG_FILE}") 2>&1

echo "================================================================="
echo "  Starting Automated Deployment"
echo "  Date:       $(date)"
echo "  Target:     ${TARGET_BRANCH}"
echo "  Directory:  ${PROJECT_ROOT}"
echo "  Host:       ${HOSTNAME_NAME}"
echo "================================================================="

# Helper function to send email notification
send_notification() {
  local status="$1"
  local err_msg="${2:-}"
  local end_time
  local duration
  end_time=$(date +%s)
  duration=$((end_time - START_TIME))

  local commit_hash
  local commit_author
  local commit_msg
  commit_hash=$(git rev-parse HEAD 2>/dev/null || echo "unknown")
  commit_author=$(git log -1 --pretty=format:'%an <%ae>' 2>/dev/null || echo "unknown")
  commit_msg=$(git log -1 --pretty=format:'%s' 2>/dev/null || echo "Deployment triggered")

  echo ""
  echo ">>> Dispatching deployment ${status} email notification..."
  node "${SCRIPT_DIR}/send-deployment-email.mjs" \
    --status="${status}" \
    --branch="${TARGET_BRANCH}" \
    --commit="${commit_hash}" \
    --author="${commit_author}" \
    --message="${commit_msg}" \
    --duration="${duration}" \
    --hostname="${HOSTNAME_NAME}" \
    --error="${err_msg}" \
    --log-file="${LOG_FILE}" || true
}

# Trap unexpected errors
handle_failure() {
  local exit_code="$1"
  local line_number="$2"
  local failed_command="$3"

  echo ""
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  echo "  DEPLOYMENT FAILED"
  echo "  Exit Code:    ${exit_code}"
  echo "  Line Number:  ${line_number}"
  echo "  Command:      ${failed_command}"
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

  local err_detail="Command '${failed_command}' failed at line ${line_number} with exit code ${exit_code}."
  send_notification "FAILED" "${err_detail}"
  exit "${exit_code}"
}

trap 'handle_failure $? $LINENO "$BASH_COMMAND"' ERR

# 3. Verify git repository status
echo "[1/5] Checking Git repository..."
if [ ! -d ".git" ]; then
  echo "Error: .git directory not found in ${PROJECT_ROOT}" >&2
  exit 1
fi

# Fetch target branch
echo "[2/5] Fetching latest changes from origin/${TARGET_BRANCH}..."
git fetch origin "${TARGET_BRANCH}"

# Switch to target branch and pull latest changes
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "${CURRENT_BRANCH}" != "${TARGET_BRANCH}" ]; then
  echo "Switching branch: ${CURRENT_BRANCH} -> ${TARGET_BRANCH}"
  git checkout "${TARGET_BRANCH}"
fi

echo "Pulling latest code from origin/${TARGET_BRANCH}..."
git pull origin "${TARGET_BRANCH}"

CURRENT_COMMIT=$(git rev-parse --short HEAD)
echo "Current commit: ${CURRENT_COMMIT} - $(git log -1 --pretty=format:'%s (%an)')"

# 4. Install dependencies
echo "[3/5] Installing dependencies..."
if [ -f "package-lock.json" ]; then
  npm install --no-audit --no-fund
else
  npm install --no-audit --no-fund
fi

# 5. Build production bundle
echo "[4/5] Building production application..."
npm run build

# Verify build output
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
  echo "Error: Build output verification failed. dist/index.html was not generated." >&2
  exit 1
fi

BUILD_SIZE=$(du -sh dist | cut -f1)
echo "Build verification passed: dist/ generated successfully (${BUILD_SIZE})."

# 6. Optional: Restart application process if PM2 or a background runner is configured
echo "[5/5] Checking process reload..."
if command -v pm2 >/dev/null 2>&1; then
  # If a PM2 process with name "endessus" or matching current folder exists, reload it
  if pm2 describe endessus >/dev/null 2>&1; then
    echo "Reloading PM2 process 'endessus'..."
    pm2 reload endessus --update-env || true
  fi
fi

# Rotate old deployment logs (keep last 20)
ls -1t "${LOG_DIR}"/deploy_*.log 2>/dev/null | tail -n +21 | xargs -I {} rm -f "{}" 2>/dev/null || true

echo "================================================================="
echo "  DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "  Duration: $(( $(date +%s) - START_TIME )) seconds"
echo "================================================================="

# Send SUCCESS notification email
send_notification "SUCCESS"

exit 0

