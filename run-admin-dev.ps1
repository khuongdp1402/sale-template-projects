# Script to run Admin Panel in Development Mode
# Quick Login will be available at http://localhost:5173/admin/login

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  KWingX Admin - Development Mode " -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting Admin Panel with Quick Login enabled..." -ForegroundColor Yellow
Write-Host ""

# Navigate to admin folder
Set-Location -Path "admin"

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start dev server
Write-Host ""
Write-Host "Starting Vite dev server..." -ForegroundColor Green
Write-Host ""
Write-Host "Quick Login will be available at:" -ForegroundColor Green
Write-Host "  http://localhost:5173/admin/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "Click 'Quick Login (Test Mode)' button to login instantly!" -ForegroundColor Yellow
Write-Host ""

npm run dev

