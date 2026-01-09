$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

Write-Host "=== Testing Build ===" -ForegroundColor Cyan

# Change to Infrastructure directory
Set-Location "src\KWingX.Infrastructure"

Write-Host "`nBuilding Infrastructure project..." -ForegroundColor Yellow
try {
    $output = dotnet build 2>&1 | Out-String
    Write-Host $output
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Build successful!" -ForegroundColor Green
        
        Write-Host "`nApplying migration..." -ForegroundColor Yellow
        $migrationOutput = dotnet ef database update --startup-project ..\KWingX.WebApi 2>&1 | Out-String
        Write-Host $migrationOutput
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✓ Migration completed successfully!" -ForegroundColor Green
        } else {
            Write-Host "`n✗ Migration failed!" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "`n✗ Build failed!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "`n✗ Error: $_" -ForegroundColor Red
    exit 1
} finally {
    Set-Location ..\..
}

