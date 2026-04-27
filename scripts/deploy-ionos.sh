#!/bin/bash
# DOCI Trockenbau - IONOS Deploy
# Synct den statischen Build aus out/ via lftp nach /public/ auf IONOS.

set -e

OUT_DIR="/Users/beschdar/Desktop/PROJEKTE/DOCI/out"
SFTP_USER="su745633"
SFTP_HOST="access-5020318519.webspace-host.com"
REMOTE_DIR="public"

if [ ! -d "$OUT_DIR" ]; then
  echo "❌ $OUT_DIR existiert nicht."
  echo "   Erst Build ausführen: npm run build:static"
  exit 1
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "❌ lftp ist nicht installiert."
  echo "   Installation: brew install lftp"
  exit 1
fi

SIZE=$(du -sh "$OUT_DIR" | cut -f1)

echo ""
echo "📤  DOCI Trockenbau → IONOS"
echo "    Größe:   $SIZE"
echo "    Server:  $SFTP_HOST"
echo "    Pfad:    /$REMOTE_DIR"
echo ""

if [ -z "$IONOS_PASSWORD" ]; then
  read -rsp "SFTP-Passwort: " IONOS_PASSWORD
  echo ""
fi

lftp -u "$SFTP_USER,$IONOS_PASSWORD" "sftp://$SFTP_HOST" \
  -e "set sftp:auto-confirm yes; mirror -R --delete --parallel=4 '$OUT_DIR/' '$REMOTE_DIR/'; bye"

echo ""
echo "✅ Upload fertig!"
echo "   Test: https://doci-trockenbau.de"
echo ""
