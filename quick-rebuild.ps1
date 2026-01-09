#!/usr/bin/env pwsh
# Quick rebuild script - keeps database data

param(
    [switch]$FullRebuild = $false,
    [switch]$BackendOnly = $false,
    [switch]$FrontendOnly = $false
)

$ErrorActionPreference = "Continue"

Write-Host "🔨 KWingX Quick Rebuild Script" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

if ($FullRebuild) {
    Write-Host "⚠️  FULL REBUILD MODE - Will remove database!" -ForegroundColor Red
    $confirm = Read-Host "Are you sure? (yes/no)"
    if ($confirm -ne "yes") {
        Write-Host "❌ Cancelled" -ForegroundColor Yellow
        exit
    }
    .\rebuild-all.ps1
    exit
}

if ($BackendOnly) {
    Write-Host "🔧 Rebuilding Backend API only..." -ForegroundColor Yellow
    docker-compose build --no-cache api
    docker-compose up -d api
    Start-Sleep -Seconds 5
    docker logs kwingx_api --tail 30
    Write-Host "`n✅ Backend rebuilt!" -ForegroundColor Green
    Write-Host "🌐 API: http://localhost:8080" -ForegroundColor Cyan
    exit
}

if ($FrontendOnly) {
    Write-Host "🔧 Rebuilding Frontend (Admin + Portal)..." -ForegroundColor Yellow
    docker-compose build --no-cache admin portal
    docker-compose up -d admin portal
    Write-Host "`n✅ Frontend rebuilt!" -ForegroundColor Green
    Write-Host "🌐 Admin: http://localhost:3001" -ForegroundColor Cyan
    Write-Host "🌐 Portal: http://localhost:3000" -ForegroundColor Cyan
    exit
}

# Default: Quick rebuild without removing volumes
Write-Host "📦 Quick rebuild (keeps database data)..." -ForegroundColor Yellow

Write-Host "`n1️⃣  Stopping containers..." -ForegroundColor Cyan
docker-compose down

Write-Host "`n2️⃣  Building services..." -ForegroundColor Cyan
docker-compose build --no-cache

Write-Host "`n3️⃣  Starting services..." -ForegroundColor Cyan
docker-compose up -d

Write-Host "`n4️⃣  Waiting for services..." -ForegroundColor Cyan
Start-Sleep -Seconds 12

Write-Host "`n5️⃣  Checking status..." -ForegroundColor Cyan
docker-compose ps

Write-Host "`n✅ Quick rebuild completed!" -ForegroundColor Green
Write-Host "`n📌 Service URLs:" -ForegroundColor Cyan
Write-Host "  - Admin:  http://localhost:3001"
Write-Host "  - Portal: http://localhost:3000"
Write-Host "  - API:    http://localhost:8080"
Write-Host "  - MinIO:  http://localhost:9001"
Write-Host "`n💡 Usage:"
Write-Host "  .\quick-rebuild.ps1                 # Quick rebuild (keep DB)"
Write-Host "  .\quick-rebuild.ps1 -BackendOnly    # Rebuild API only"
Write-Host "  .\quick-rebuild.ps1 -FrontendOnly   # Rebuild Admin + Portal"
Write-Host "  .\quick-rebuild.ps1 -FullRebuild    # Full rebuild (reset DB)"
Write-Host ""

