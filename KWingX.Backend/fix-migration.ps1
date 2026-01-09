# Script to fix and run migration
Write-Host "Checking build status..." -ForegroundColor Cyan

$infraPath = "src\KWingX.Infrastructure"
$webApiPath = "src\KWingX.WebApi"

# Build Infrastructure project first
Write-Host "Building Infrastructure project..." -ForegroundColor Yellow
$buildResult = dotnet build $infraPath 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed:" -ForegroundColor Red
    $buildResult | Write-Host
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green
Write-Host ""

# Check if migration exists
$migrationFile = Get-ChildItem -Path "$infraPath\Persistence\Migrations" -Filter "*UpdateBlogPost*" -ErrorAction SilentlyContinue
if ($migrationFile) {
    Write-Host "Migration file found: $($migrationFile.Name)" -ForegroundColor Green
} else {
    Write-Host "Migration file not found. Creating migration..." -ForegroundColor Yellow
    dotnet ef migrations add UpdateBlogPostForHtmlContent --project $infraPath --startup-project $webApiPath
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create migration" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Applying migration..." -ForegroundColor Yellow
dotnet ef database update --project $infraPath --startup-project $webApiPath

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Migration completed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Migration failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

