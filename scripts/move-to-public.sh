#!/bin/bash
# Verschiebt alle DOCI-Dateien aus / nach /public/ auf dem IONOS Webspace.

SFTP_USER="su745633"
SFTP_HOST="access-5020318519.webspace-host.com"
SFTP_PORT=22

BATCH_FILE=$(mktemp)
trap "rm -f $BATCH_FILE" EXIT

cat > "$BATCH_FILE" <<'EOF'
rename .htaccess public/.htaccess
rename 404 public/404
rename 404.html public/404.html
rename _next public/_next
rename datenschutz public/datenschutz
rename galerie public/galerie
rename impressum public/impressum
rename index.html public/index.html
rename index.txt public/index.txt
rename kontakt public/kontakt
rename logo.png public/logo.png
ls -la public
bye
EOF

echo "📦 Verschiebe Dateien aus / nach /public/ ..."
echo ""
sftp -P "$SFTP_PORT" \
  -o StrictHostKeyChecking=accept-new \
  "$SFTP_USER@$SFTP_HOST" < "$BATCH_FILE"

echo ""
echo "✅ Fertig — wenn /public jetzt voll ist, sollte die Domain die Seite zeigen."
