#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/sputnik-kamchatka}"

sudo apt update
sudo apt install -y curl nginx

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
fi

sudo npm install -g pm2

sudo mkdir -p "$APP_DIR/.next" "$APP_DIR/public"
sudo chown -R "$USER:$USER" "$APP_DIR"

echo "VDS подготовлен. Теперь загрузите standalone-сборку в $APP_DIR"
