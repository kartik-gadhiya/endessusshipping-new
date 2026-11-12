
#!/usr/bin/env bash

# ==============================================================================
# Automated Deployment Script for En Dessus Global Forwarding
#
# Usage:
#   ./scripts/deploy.sh [branch_name]
#
# Defaults:
#   branch_name: main
#   Node.js:     24.22.2
#   Project:     Current script's parent directory
# ==============================================================================

set -Eeuo pipefail

# ==============================================================================
# 1. Resolve project root
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

TARGET_BRANCH="${1:-main}"
START_TIME="$(date +%s)"
HOSTNAME_NAME="$(hostname 2>/dev/null || echo "server")"

# ==============================================================================
# 2. Configure logging
# ==============================================================================

LOG_DIR="${PROJECT_ROOT}/.deploy-logs"

mkdir -p "${LOG_DIR}"

LOG_FILE="${LOG_DIR}/deploy_$(date +'%Y%m%d_%H%M%S').log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "================================================================="
echo "  Starting Automated Deployment"
echo "  Date:       $(date)"
echo "  Target:     ${TARGET_BRANCH}"
echo "  Directory:  ${PROJECT_ROOT}"
echo "  Host:       ${HOSTNAME_NAME}"
echo "================================================================="

# ==============================================================================
# 3. Load NVM and Node.js
# ==============================================================================

echo ""
echo "[1/7] Loading Node.js environment..."

export HOME="/home/deploy"
export NVM_DIR="${HOME}/.nvm"

if [ ! -s "${NVM_DIR}/nvm.sh" ]; then
    echo "ERROR: NVM not found at ${NVM_DIR}/nvm.sh"
    exit 1
fi

# Load NVM for non-interactive SSH sessions.
source "${NVM_DIR}/nvm.sh"

# Select required Node.js version.
nvm use 24.22.2 --silent

# Verify Node.js and npm.
if ! command -v node >/dev/null 2>&1; then
    echo "ERROR: Node.js is not available."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "ERROR: npm is not available."
    exit 1
fi

echo "Node.js Version: $(node -v)"
echo "npm Version:     $(npm -v)"
echo "Node Path:       $(command -v node)"
echo "npm Path:        $(command -v npm)"

# ==============================================================================
# 4. Email notification helper
# ==============================================================================

send_notification() {

    local status="$1"
    local err_msg="${2:-}"

    local end_time
    local duration

    end_time="$(date +%s)"
    duration=$((end_time - START_TIME))

    local commit_hash
    local commit_author
    local commit_msg

    commit_hash="$(git rev-parse HEAD 2>/dev/null || echo "unknown")"

    commit_author="$(
        git log -1 --pretty=format:'%an <%ae>' 2>/dev/null || echo "unknown"
    )"

    commit_msg="$(
        git log -1 --pretty=format:'%s' 2>/dev/null || echo "Deployment triggered"
    )"

    echo ""
    echo ">>> Sending deployment ${status} email notification..."

    if ! command -v node >/dev/null 2>&1; then
        echo "WARNING: Node.js unavailable. Email notification skipped."
        return 0
    fi

    if [ ! -f "${SCRIPT_DIR}/send-deployment-email.mjs" ]; then
        echo "WARNING: Email notification script not found."
        return 0
    fi

    node "${SCRIPT_DIR}/send-deployment-email.mjs" \
        --status="${status}" \
        --branch="${TARGET_BRANCH}" \
        --commit="${commit_hash}" \
        --author="${commit_author}" \
        --message="${commit_msg}" \
        --duration="${duration}" \
        --hostname="${HOSTNAME_NAME}" \
        --error="${err_msg}" \
        --log-file="${LOG_FILE}" || {
            echo "WARNING: Email notification failed."
        }

    return 0
}

# ==============================================================================
# 5. Failure handler
# ==============================================================================

DEPLOYMENT_FINISHED=false

handle_failure() {

    local exit_code="${1:-1}"
    local line_number="${2:-unknown}"
    local failed_command="${3:-unknown}"

    # Prevent duplicate failure notifications.
    if [ "${DEPLOYMENT_FINISHED}" = true ]; then
        return
    fi

    DEPLOYMENT_FINISHED=true

    trap - ERR

    echo ""
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    echo "  DEPLOYMENT FAILED"
    echo "  Exit Code:    ${exit_code}"
    echo "  Line Number:  ${line_number}"
    echo "  Command:      ${failed_command}"
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

    local err_detail

    err_detail="Command '${failed_command}' failed at line ${line_number} with exit code ${exit_code}."

    send_notification "FAILED" "${err_detail}"

    exit "${exit_code}"
}

trap 'handle_failure "$?" "$LINENO" "$BASH_COMMAND"' ERR

# ==============================================================================
# 6. Verify Git repository
# ==============================================================================

echo ""
echo "[2/7] Checking Git repository..."

if [ ! -d ".git" ]; then
    echo "ERROR: .git directory not found in ${PROJECT_ROOT}"
    exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
    echo "ERROR: Git remote 'origin' is not configured."
    exit 1
fi

echo "Git repository verified."

# ==============================================================================
# 7. Fetch and update source code
# ==============================================================================

echo ""
echo "[3/7] Fetching latest changes from origin/${TARGET_BRANCH}..."

git fetch origin "${TARGET_BRANCH}"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if [ "${CURRENT_BRANCH}" != "${TARGET_BRANCH}" ]; then

    echo "Switching branch: ${CURRENT_BRANCH} -> ${TARGET_BRANCH}"

    git checkout "${TARGET_BRANCH}"

fi

echo "Pulling latest code..."

git pull --ff-only origin "${TARGET_BRANCH}"

CURRENT_COMMIT="$(git rev-parse --short HEAD)"

echo "Current commit: ${CURRENT_COMMIT}"
echo "Commit message: $(git log -1 --pretty=format:'%s (%an)')"

# ==============================================================================
# 8. Install dependencies
# ==============================================================================

echo ""
echo "[4/7] Installing dependencies..."

if [ -f "package-lock.json" ]; then

    echo "package-lock.json found. Running npm ci..."

    npm ci --no-audit --no-fund

else

    echo "package-lock.json not found. Running npm install..."

    npm install --no-audit --no-fund

fi

echo "Dependencies installed successfully."

# ==============================================================================
# 9. Build production application
# ==============================================================================

echo ""
echo "[5/7] Building production application..."

# Do not execute watermark processing on every deployment.
export SKIP_WATERMARK=true

echo "Watermark processing skipped for this deployment."

npm run build

# Verify build output.
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then

    echo "ERROR: Build verification failed."
    echo "Expected output: dist/index.html"

    exit 1

fi

BUILD_SIZE="$(du -sh dist | cut -f1)"

echo "Build verification passed."
echo "Build directory: dist/"
echo "Build size:      ${BUILD_SIZE}"

# ==============================================================================
# 10. Reload PM2 process if configured
# ==============================================================================

echo ""
echo "[6/7] Checking application process..."

if command -v pm2 >/dev/null 2>&1; then

    if pm2 describe endessus >/dev/null 2>&1; then

        echo "Reloading PM2 process 'endessus'..."

        pm2 reload endessus --update-env

        echo "PM2 process reloaded successfully."

    else

        echo "PM2 process 'endessus' not found."
        echo "Skipping PM2 reload."

    fi

else

    echo "PM2 is not installed or not available in PATH."
    echo "Skipping PM2 reload."

fi

# ==============================================================================
# 11. Cleanup old deployment logs
# ==============================================================================

echo ""
echo "[7/7] Cleaning old deployment logs..."

find "${LOG_DIR}" \
    -maxdepth 1 \
    -type f \
    -name 'deploy_*.log' \
    -printf '%T@ %p\n' 2>/dev/null \
    | sort -rn \
    | tail -n +21 \
    | cut -d' ' -f2- \
    | while IFS= read -r old_log; do
        [ -n "${old_log}" ] && rm -f -- "${old_log}"
    done

# ==============================================================================
# 12. Deployment completed
# ==============================================================================

DEPLOYMENT_FINISHED=true

END_TIME="$(date +%s)"
TOTAL_DURATION=$((END_TIME - START_TIME))

echo ""
echo "================================================================="
echo "  DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "  Branch:       ${TARGET_BRANCH}"
echo "  Commit:       ${CURRENT_COMMIT}"
echo "  Build Size:   ${BUILD_SIZE}"
echo "  Duration:     ${TOTAL_DURATION} seconds"
echo "  Completed:    $(date)"
echo "================================================================="

# Send success notification.
send_notification "SUCCESS"

exit 0
