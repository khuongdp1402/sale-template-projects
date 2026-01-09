# Quick build test
$ErrorActionPreference = 'Continue'
Write-Host "Building Application project..." -ForegroundColor Yellow
$appResult = dotnet build src\KWingX.Application\KWingX.Application.csproj 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Application build OK" -ForegroundColor Green
} else {
    Write-Host "✗ Application build FAILED" -ForegroundColor Red
    $appResult | Select-String -Pattern "error" | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host "Building Infrastructure project..." -ForegroundColor Yellow
$infraResult = dotnet build src\KWingX.Infrastructure\KWingX.Infrastructure.csproj 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Infrastructure build OK" -ForegroundColor Green
} else {
    Write-Host "✗ Infrastructure build FAILED" -ForegroundColor Red
    $infraResult | Select-String -Pattern "error" | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host ""
Write-Host "All builds successful!" -ForegroundColor Green

