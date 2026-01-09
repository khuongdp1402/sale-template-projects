# 🔨 Hướng Dẫn Build Lại Toàn Bộ Dự Án

## 📋 Mục Lục
1. [Build & Run với Docker (Khuyến Nghị)](#option-1-docker)
2. [Build Local Development](#option-2-local-dev)
3. [Build Từng Service Riêng Lẻ](#option-3-individual)
4. [Troubleshooting](#troubleshooting)

---

## Option 1: Build & Run với Docker (Khuyến Nghị) {#option-1-docker}

### A. Sử Dụng Script Tự Động

```powershell
# Chạy script rebuild tự động
.\rebuild-all.ps1
```

### B. Chạy Từng Lệnh Thủ Công

#### 1. Dừng và Xóa Containers Hiện Tại
```powershell
cd E:\Project\sale-template
docker-compose down
```

#### 2. Xóa Images Cũ (Optional)
```powershell
# Xóa images cũ để build lại hoàn toàn
docker rmi sale-template-api -f
docker rmi sale-template-admin -f
docker rmi sale-template-portal -f
```

#### 3. Xóa Volumes (CẢNH BÁO: Mất dữ liệu DB)
```powershell
# OPTIONAL - Chỉ làm nếu muốn reset database và MinIO
docker volume rm sale-template_postgres_data -f
docker volume rm sale-template_minio_data -f
```

#### 4. Build Lại Tất Cả Services
```powershell
# Build không sử dụng cache (đảm bảo code mới nhất)
docker-compose build --no-cache

# Hoặc build từng service riêng
docker-compose build --no-cache api
docker-compose build --no-cache admin
docker-compose build --no-cache portal
```

#### 5. Khởi Động Services
```powershell
docker-compose up -d
```

#### 6. Kiểm Tra Trạng Thái
```powershell
# Xem trạng thái containers
docker-compose ps

# Xem logs backend
docker logs kwingx_api --tail 50 -f

# Xem logs admin
docker logs kwingx_admin --tail 50 -f

# Xem logs portal
docker logs kwingx_portal --tail 50 -f
```

---

## Option 2: Build Local Development {#option-2-local-dev}

### A. Backend (.NET)

```powershell
cd E:\Project\sale-template\KWingX.Backend

# Clean solution
dotnet clean

# Restore packages
dotnet restore

# Build solution
dotnet build --configuration Release

# Run migrations (nếu cần)
cd src\KWingX.WebApi
dotnet ef database update --project ..\KWingX.Infrastructure\KWingX.Infrastructure.csproj

# Run backend
dotnet run --project src\KWingX.WebApi\KWingX.WebApi.csproj
```

**Backend sẽ chạy tại:** `http://localhost:8080`

### B. Admin UI (React)

```powershell
cd E:\Project\sale-template\admin

# Xóa node_modules và cache cũ
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path node_modules\.vite -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path dist -Recurse -Force -ErrorAction SilentlyContinue

# Cài đặt dependencies
npm install

# Build production
npm run build

# Hoặc chạy dev mode
npm run dev
```

**Admin UI sẽ chạy tại:** 
- Dev: `http://localhost:3001`
- Build output: `admin/dist/`

### C. Portal (React)

```powershell
cd E:\Project\sale-template

# Xóa node_modules và cache cũ
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path dist -Recurse -Force -ErrorAction SilentlyContinue

# Cài đặt dependencies
npm install

# Build production
npm run build

# Hoặc chạy dev mode
npm run dev
```

**Portal sẽ chạy tại:** 
- Dev: `http://localhost:3000`
- Build output: `dist/`

---

## Option 3: Build Từng Service Riêng Lẻ {#option-3-individual}

### Backend API Only
```powershell
cd E:\Project\sale-template
docker-compose build --no-cache api
docker-compose up -d api
docker logs kwingx_api -f
```

### Admin UI Only
```powershell
cd E:\Project\sale-template
docker-compose build --no-cache admin
docker-compose up -d admin
docker logs kwingx_admin -f
```

### Portal Only
```powershell
cd E:\Project\sale-template
docker-compose build --no-cache portal
docker-compose up -d portal
docker logs kwingx_portal -f
```

### PostgreSQL Only
```powershell
docker-compose up -d postgres
docker logs kwingx_postgres -f
```

### MinIO Only
```powershell
docker-compose up -d minio
docker logs kwingx_minio -f
```

---

## 🛠️ Troubleshooting {#troubleshooting}

### Lỗi: Port Already in Use

```powershell
# Kiểm tra process đang dùng port
netstat -ano | findstr :8080
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill process (thay PID bằng số thực tế)
Stop-Process -Id PID -Force
```

### Lỗi: Docker Build Failed

```powershell
# Xóa tất cả build cache
docker builder prune -a -f

# Restart Docker Desktop
Restart-Service docker

# Build lại với verbose output
docker-compose build --no-cache --progress=plain
```

### Lỗi: Database Migration Failed

```powershell
# Reset database (CẢNH BÁO: Mất dữ liệu)
docker-compose down
docker volume rm sale-template_postgres_data -f
docker-compose up -d postgres
docker-compose restart api
```

### Lỗi: MinIO Bucket Not Found

```powershell
# Access MinIO console: http://localhost:9001
# Login: minioadmin / minioadmin
# Manually create bucket: "blog-assets"
# Set policy to "public"

# Hoặc restart backend để auto-create
docker-compose restart api
docker logs kwingx_api --tail 30
```

### Lỗi: Frontend 404 hoặc Blank Page

```powershell
# Hard refresh browser
# Ctrl + Shift + R (Windows)
# Cmd + Shift + R (Mac)

# Clear browser cache
# Chrome: Ctrl + Shift + Delete

# Rebuild frontend
cd E:\Project\sale-template\admin
Remove-Item -Path dist -Recurse -Force
npm run build
docker-compose build --no-cache admin
docker-compose up -d admin
```

### Lỗi: API 401 Unauthorized

```powershell
# Check login credentials
# Default: admin / admin

# Reset admin password via database seeder
docker-compose restart api
docker logs kwingx_api | Select-String "Seeding"
```

---

## 📊 Kiểm Tra Sau Khi Build

### 1. Kiểm Tra Services
```powershell
docker-compose ps
```

Expected output:
```
NAME               STATUS          PORTS
kwingx_admin       Up              0.0.0.0:3001->80/tcp
kwingx_api         Up (healthy)    0.0.0.0:8080->8080/tcp
kwingx_minio       Up              0.0.0.0:9000-9001->9000-9001/tcp
kwingx_portal      Up              0.0.0.0:3000->80/tcp
kwingx_postgres    Up (healthy)    0.0.0.0:5432->5432/tcp
```

### 2. Test API Health
```powershell
curl http://localhost:8080/api/v1/health
```

### 3. Test Admin Login
1. Access: http://localhost:3001/admin/login
2. Login: `admin` / `admin`
3. Navigate to: http://localhost:3001/admin/blog

### 4. Test Image Upload
1. Create new blog post
2. Upload cover image
3. Check MinIO: http://localhost:9001 → bucket `blog-assets`

---

## 🌐 Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| **Admin UI** | http://localhost:3001 | admin / admin |
| **Portal** | http://localhost:3000 | - |
| **Backend API** | http://localhost:8080 | - |
| **Swagger Docs** | http://localhost:8080/swagger | - |
| **MinIO Console** | http://localhost:9001 | minioadmin / minioadmin |
| **PostgreSQL** | localhost:5432 | postgres / postgres |

---

## 🔄 Quick Commands Cheat Sheet

```powershell
# Rebuild everything
docker-compose down && docker-compose build --no-cache && docker-compose up -d

# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api

# Restart specific service
docker-compose restart api

# Stop all
docker-compose down

# Stop and remove volumes (reset DB)
docker-compose down -v

# Check resource usage
docker stats

# Clean up unused resources
docker system prune -a
```

---

## 📝 Notes

- **Hot Reload**: 
  - Frontend (React): Có hot reload khi chạy dev mode (`npm run dev`)
  - Backend (.NET): Không có hot reload trong Docker, cần rebuild
  
- **Build Time**:
  - Full rebuild (no cache): ~5-10 phút
  - Incremental build (with cache): ~1-2 phút
  
- **Disk Space**:
  - Backend image: ~300 MB
  - Frontend images: ~50 MB mỗi cái
  - Volumes (DB + MinIO): Tùy thuộc vào dữ liệu

---

## 🆘 Support

Nếu gặp vấn đề:
1. Check logs: `docker-compose logs -f [service]`
2. Check status: `docker-compose ps`
3. Restart service: `docker-compose restart [service]`
4. Full rebuild: Run `.\rebuild-all.ps1`

