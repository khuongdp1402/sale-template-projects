# Script to run EF Core migration
# Run this from the project root

Write-Host "Running EF Core migration..." -ForegroundColor Cyan
Write-Host ""

$infraPath = "src\KWingX.Infrastructure"
$webApiPath = "src\KWingX.WebApi"

if (-Not (Test-Path $infraPath)) {
    Write-Host "Error: Infrastructure project not found at $infraPath" -ForegroundColor Red
    exit 1
}

if (-Not (Test-Path $webApiPath)) {
    Write-Host "Error: WebApi project not found at $webApiPath" -ForegroundColor Red
    exit 1
}

Write-Host "Applying migration: UpdateBlogPostForHtmlContent" -ForegroundColor Yellow
Write-Host ""

dotnet ef database update --project $infraPath --startup-project $webApiPath

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Migration completed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Migration failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

