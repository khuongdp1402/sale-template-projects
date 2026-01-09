# Apply migration script
$ErrorActionPreference = 'Continue'

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Applying Blog Post Migration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$infraPath = "src\KWingX.Infrastructure"
$webApiPath = "src\KWingX.WebApi"

# Step 1: Build
Write-Host "[1/2] Building Infrastructure project..." -ForegroundColor Yellow
$buildOutput = dotnet build $infraPath 2>&1
$buildExitCode = $LASTEXITCODE

if ($buildExitCode -ne 0) {
    Write-Host ""
    Write-Host "BUILD FAILED!" -ForegroundColor Red
    Write-Host $buildOutput
    Write-Host ""
    Write-Host "Please fix the build errors above and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✓ Build successful" -ForegroundColor Green
Write-Host ""

# Step 2: Apply migration
Write-Host "[2/2] Applying database migration..." -ForegroundColor Yellow
$migrationOutput = dotnet ef database update --project $infraPath --startup-project $webApiPath 2>&1
$migrationExitCode = $LASTEXITCODE

if ($migrationExitCode -ne 0) {
    Write-Host ""
    Write-Host "MIGRATION FAILED!" -ForegroundColor Red
    Write-Host $migrationOutput
    Write-Host ""
    Write-Host "Please check the error messages above." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Migration completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

