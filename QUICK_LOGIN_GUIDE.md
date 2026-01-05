# 🚀 Quick Login Guide - Admin Panel

## Cách sử dụng Quick Login để test Admin Panel

### Phương pháp 1: Run Script (Đơn giản nhất)

**Windows (PowerShell):**
```powershell
.\run-admin-dev.ps1
```

**Linux/Mac:**
```bash
chmod +x run-admin-dev.sh
./run-admin-dev.sh
```

### Phương pháp 2: Manual

```bash
cd admin
npm install  # Chỉ cần chạy lần đầu
npm run dev
```

Sau khi dev server start, truy cập:
👉 **http://localhost:5173/admin/login**

## 🔓 Quick Login

Trên trang login, bạn có 2 cách:

### Cách 1: Click nút "Quick Login (Test Mode)"
- Không cần nhập gì
- Click nút màu xám ở dưới
- Login ngay lập tức với admin test account

### Cách 2: Để trống và Submit
- Để trống username và password
- Click "Sign in"
- Tự động sử dụng credentials: `admin` / `test`

## ✅ Features có sẵn

Sau khi login, bạn sẽ thấy:
- ✅ Dashboard với thống kê
- ✅ 12 Templates (mock data)
- ✅ 12 Blog Posts (mock data)  
- ✅ 30 Orders & Payments (mock data)
- ✅ 20 Users (mock data)
- ✅ 20 Contacts (mock data)
- ✅ System Logs & Monitoring

## 🔧 Chế độ Mock vs Real

### Mock Mode (Default - Development)
- ✅ Quick login hoạt động
- ✅ Không cần backend API
- ✅ Data giả lập trong memory
- ⚠️ Changes không persist khi reload

### Real Mode (Production)
Để kết nối backend thật, tạo file `admin/.env.local`:
```env
VITE_API_MODE=real
VITE_API_BASE_URL=http://localhost:8080
```

## 🐛 Troubleshooting

**Port 5173 đã được sử dụng:**
```bash
# Kill process đang dùng port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5173 | xargs kill -9
```

**Login không hoạt động:**
1. Mở Developer Tools (F12)
2. Check Console tab xem có error không
3. Xóa localStorage: `localStorage.clear()` trong Console
4. Refresh page

**TypeScript errors khi build:**
- Development mode (`npm run dev`) sẽ bỏ qua type errors
- Production build (`npm run build`) cần fix hết errors

## 📝 Test Accounts

Trong Mock Mode, bạn có thể login với:
- Username: `admin` (hoặc bất kỳ)
- Password: `test` (hoặc bất kỳ)
- Quick Login button làm việc này tự động

Trong Real Mode, phải có user trong database backend.

## 🚀 Next Steps

1. ✅ Login với Quick Login
2. ✅ Explore Dashboard
3. ✅ Test CRUD operations (mock mode)
4. ⚙️ Kết nối backend API khi cần

---

Enjoy testing! 🎉

