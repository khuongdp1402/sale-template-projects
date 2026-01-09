# Test API Endpoints
# Quick script to verify all API endpoints are working

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing K-WingX API Endpoints" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$API_BASE = "http://localhost:8080"

# Test 1: Health Check
Write-Host "[1/3] Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$API_BASE/health" -Method Get -TimeoutSec 5
    Write-Host "✓ Health check passed: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure backend is running: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 2: Login
Write-Host "[2/3] Testing Login Endpoint..." -ForegroundColor Yellow
$loginBody = @{
    username = "admin"
    password = "admin"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$API_BASE/api/v1/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body $loginBody

    $token = $loginResponse.token
    Write-Host "✓ Login successful!" -ForegroundColor Green
    Write-Host "  User: $($loginResponse.user.username)" -ForegroundColor Gray
    Write-Host "  Email: $($loginResponse.user.email)" -ForegroundColor Gray
    Write-Host "  Roles: $($loginResponse.user.roles -join ', ')" -ForegroundColor Gray
} catch {
    Write-Host "✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
    exit 1
}

Write-Host ""

# Test 3: Protected Endpoint (Blog Posts)
Write-Host "[3/3] Testing Protected Endpoint (Blog Posts)..." -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $token"
}

try {
    $posts = Invoke-RestMethod -Uri "$API_BASE/api/v1/admin/blog-posts?page=1&pageSize=10" `
        -Method Get `
        -Headers $headers

    Write-Host "✓ Blog posts API working!" -ForegroundColor Green
    Write-Host "  Total Posts: $($posts.totalCount)" -ForegroundColor Gray
    Write-Host "  Page: $($posts.page) / $($posts.totalPages)" -ForegroundColor Gray
    
    if ($posts.items -and $posts.items.Count -gt 0) {
        Write-Host "  First Post: $($posts.items[0].title)" -ForegroundColor Gray
    }
} catch {
    Write-Host "✗ Blog posts API failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All Tests Completed!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access Points:" -ForegroundColor Yellow
Write-Host "  - Swagger UI:  http://localhost:8080/swagger" -ForegroundColor Cyan
Write-Host "  - Admin UI:    http://localhost:3001/admin" -ForegroundColor Cyan
Write-Host "  - MinIO UI:    http://localhost:9001 (admin/admin)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Credentials:" -ForegroundColor Yellow
Write-Host "  - Admin:  admin / admin" -ForegroundColor Cyan
Write-Host "  - MinIO:  minioadmin / minioadmin" -ForegroundColor Cyan
Write-Host ""

