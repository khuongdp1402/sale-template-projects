# Admin Panel - Quick Start Guide

## Quick Login (Development Mode)

Admin panel đã được cấu hình với **Mock Mode** mặc định để test nhanh không cần backend.

### Cách sử dụng:

#### 1. Chạy local (Development)

```bash
cd admin
npm install
npm run dev
```

Truy cập: http://localhost:5173/admin/login

**Quick Login:**
- Click nút **"Quick Login (Test Mode)"** để login ngay lập tức
- Hoặc để trống username/password và click **"Sign in"** (mặc định: admin/test)
- Không cần backend API, tất cả data là mock

#### 2. Chạy với Docker

```bash
# Build và chạy toàn bộ stack
docker compose up -d

# Chỉ rebuild admin
docker compose up -d --build admin
```

Truy cập: http://localhost:3001/admin/login

**Note:** Docker mặc định dùng Mock Mode, có Quick Login button

#### 3. Kết nối Backend thật

Tạo file `.env.development` hoặc `.env.local` trong folder `admin/`:

```env
VITE_API_MODE=real
VITE_API_BASE_URL=http://localhost:8080
```

Sau đó chạy lại:
```bash
npm run dev
```

## Features của Mock Mode

- ✅ Login nhanh không cần credentials
- ✅ 20 mock users
- ✅ 12 mock templates
- ✅ 12 mock blog posts
- ✅ 30 mock orders & payments
- ✅ 20 mock contacts
- ✅ 50 mock logs
- ✅ Health monitoring data

## Credentials Test

Khi ở Mock Mode:
- **Username:** bất kỳ (hoặc để trống)
- **Password:** bất kỳ (hoặc để trống)
- Click "Quick Login" để login ngay

Khi ở Real Mode (kết nối backend):
- Phải có user trong database
- Username/Password phải đúng

## Troubleshooting

**Login không hoạt động:**
1. Kiểm tra console browser (F12) xem có lỗi gì
2. Đảm bảo đang ở Mock Mode (mặc định)
3. Clear localStorage và thử lại
4. Restart dev server

**Docker admin không hiển thị:**
1. Rebuild container: `docker compose up -d --build admin`
2. Check logs: `docker logs kwingx_admin`
3. Đảm bảo port 3001 không bị chiếm

## API Mode Configuration

### Mock Mode (Default)
- Không cần backend
- Data giả lập trong memory
- Quick login enabled
- Development only

### Real Mode
- Cần backend API running
- Kết nối tới http://localhost:8080
- Phải có user trong DB
- Production ready

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_MODE | mock | 'mock' hoặc 'real' |
| VITE_API_BASE_URL | http://localhost:8080 | Backend API URL |
| VITE_API_VERSION | v1 | API version |
| VITE_API_TIMEOUT_MS | 15000 | Request timeout |

