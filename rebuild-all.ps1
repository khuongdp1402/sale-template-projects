#!/usr/bin/env pwsh
# Script to rebuild entire KWingX project

Write-Host "🛑 Step 1: Stopping all running containers..." -ForegroundColor Yellow
docker-compose down

Write-Host "`n🧹 Step 2: Cleaning up old images and volumes..." -ForegroundColor Yellow
# Remove old images
docker rmi sale-template-api -f
docker rmi sale-template-admin -f
docker rmi sale-template-portal -f

# Optionally remove volumes (CAUTION: This will delete database data!)
# Uncomment the next line if you want to start fresh with database
# docker volume rm sale-template_postgres_data sale-template_minio_data -f

Write-Host "`n🔨 Step 3: Building all services (no cache)..." -ForegroundColor Yellow
docker-compose build --no-cache

Write-Host "`n🚀 Step 4: Starting all services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host "`n⏳ Step 5: Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host "`n📊 Step 6: Checking service status..." -ForegroundColor Yellow
docker-compose ps

Write-Host "`n✅ Step 7: Viewing backend logs..." -ForegroundColor Yellow
docker logs kwingx_api --tail 50

Write-Host "`n"
Write-Host "================================" -ForegroundColor Green
Write-Host "🎉 REBUILD COMPLETED!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "`n📌 Service URLs:"
Write-Host "  - Admin UI:        http://localhost:3001" -ForegroundColor Cyan
Write-Host "  - Portal UI:       http://localhost:3000" -ForegroundColor Cyan
Write-Host "  - Backend API:     http://localhost:8080" -ForegroundColor Cyan
Write-Host "  - API Docs:        http://localhost:8080/swagger" -ForegroundColor Cyan
Write-Host "  - MinIO Console:   http://localhost:9001" -ForegroundColor Cyan
Write-Host "`n🔑 Login Credentials:"
Write-Host "  - Admin:           admin / admin" -ForegroundColor Yellow
Write-Host "  - MinIO:           minioadmin / minioadmin" -ForegroundColor Yellow
Write-Host "`n💡 Useful Commands:"
Write-Host "  - View logs:       docker-compose logs -f [service]"
Write-Host "  - Stop all:        docker-compose down"
Write-Host "  - Restart service: docker-compose restart [service]"
Write-Host ""

