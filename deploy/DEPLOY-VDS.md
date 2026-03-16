# Деплой на VDS

Ниже готовый сценарий для Ubuntu 24 и запуска через `pm2`.

## 1. Подготовить сервер

На VDS выполните:

```bash
cd /root
chmod +x /path/to/project/deploy/setup-vds.sh
/path/to/project/deploy/setup-vds.sh
```

Если файл ещё не на сервере, можно просто выполнить вручную:

```bash
apt update
apt install -y curl nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
mkdir -p /var/www/sputnik-kamchatka/.next /var/www/sputnik-kamchatka/public
```

## 2. Загрузить проект с Windows

На локальной машине из корня проекта:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy\upload-vds.ps1
```

Если нужен другой хост:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy\upload-vds.ps1 -RemoteHost root@YOUR_IP -RemoteDir /var/www/sputnik-kamchatka
```

## 3. Запустить сайт на сервере

На VDS:

```bash
cd /var/www/sputnik-kamchatka
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Проверка:

```bash
pm2 status
curl http://127.0.0.1:3000
```

## 4. Подключить nginx

Скопируйте конфиг:

```bash
cp /path/to/project/deploy/nginx-sputnik.conf.example /etc/nginx/sites-available/sputnik-kamchatka
ln -s /etc/nginx/sites-available/sputnik-kamchatka /etc/nginx/sites-enabled/sputnik-kamchatka
nginx -t
systemctl reload nginx
```

Если сайт должен открываться по IP, можно оставить `server_name _;`.
Если будет домен, замените `server_name _;` на ваш домен.

## 5. Обновление сайта

Каждый следующий деплой:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy\upload-vds.ps1
```

После загрузки на сервере:

```bash
cd /var/www/sputnik-kamchatka
pm2 restart sputnik-kamchatka
```
