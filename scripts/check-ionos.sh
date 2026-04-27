#!/bin/bash
# Diagnose: was liegt wo auf dem IONOS Webspace?

SFTP_USER="su745633"
SFTP_HOST="access-5020318519.webspace-host.com"
SFTP_PORT=22

BATCH_FILE=$(mktemp)
trap "rm -f $BATCH_FILE" EXIT

cat > "$BATCH_FILE" <<'EOF'
pwd
ls -la
ls -la public
bye
EOF

echo "🔍 Schaue auf den IONOS Webspace..."
echo ""
sftp -P "$SFTP_PORT" \
  -o StrictHostKeyChecking=accept-new \
  "$SFTP_USER@$SFTP_HOST" < "$BATCH_FILE"
