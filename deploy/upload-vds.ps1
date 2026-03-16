param(
  [string]$RemoteHost = "root@135.136.191.125",
  [string]$RemoteDir = "/var/www/sputnik-kamchatka"
)

$ErrorActionPreference = "Stop"

Write-Host "Building project..."
npm run build

Write-Host "Preparing remote directories..."
ssh $RemoteHost "mkdir -p $RemoteDir/.next $RemoteDir/public $RemoteDir/deploy"

Write-Host "Uploading standalone server..."
scp -r .next/standalone/* "${RemoteHost}:$RemoteDir/"

Write-Host "Uploading Next static assets..."
scp -r .next/static "${RemoteHost}:$RemoteDir/.next/"

Write-Host "Uploading public assets..."
scp -r public/* "${RemoteHost}:$RemoteDir/public/"

Write-Host "Uploading PM2 config..."
scp ecosystem.config.cjs "${RemoteHost}:$RemoteDir/ecosystem.config.cjs"

Write-Host "Uploading nginx example..."
scp deploy/nginx-sputnik.conf.example "${RemoteHost}:$RemoteDir/deploy/nginx-sputnik.conf.example"

Write-Host "Done. Start app on server with:"
Write-Host "cd $RemoteDir && pm2 start ecosystem.config.cjs && pm2 save"
