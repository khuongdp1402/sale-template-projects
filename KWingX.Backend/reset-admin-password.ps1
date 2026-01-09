# Script to reset admin password to "admin"
# Run this if you need to reset the admin password

Write-Host "Resetting admin password..." -ForegroundColor Cyan

$infraPath = "src\KWingX.Infrastructure"
$webApiPath = "src\KWingX.WebApi"

# This will trigger the seed which updates admin password
Write-Host "Starting application to trigger password reset..." -ForegroundColor Yellow
Write-Host ""

# Build first
dotnet build $webApiPath

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Password will be reset when application starts." -ForegroundColor Green
Write-Host ""
Write-Host "To apply the change:" -ForegroundColor Yellow
Write-Host "1. Stop all containers: docker compose down" -ForegroundColor White
Write-Host "2. Start containers: docker compose up -d" -ForegroundColor White
Write-Host ""
Write-Host "Default credentials:" -ForegroundColor Cyan
Write-Host "  Username: admin" -ForegroundColor White
Write-Host "  Password: admin" -ForegroundColor White

