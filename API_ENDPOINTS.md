# API Endpoints Reference

**Base URL:** `http://localhost:8080`

**API Version:** `v1`

**Pattern:** `/api/v{version}/{controller}/{action}`

---

## 🔓 Public Endpoints (No Auth Required)

### Authentication

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "guid",
    "username": "admin",
    "email": "admin@kwingx.com",
    "roles": ["SuperAdmin"]
  }
}
```

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!"
}
```

### Templates (Public)

```http
GET /api/v1/templates?page=1&pageSize=10&search=&category=&type=
```

```http
GET /api/v1/templates/{slug}
```

### Blog Posts (Public)

```http
GET /api/v1/blog/posts?page=1&pageSize=10&category=&search=
```

```http
GET /api/v1/blog/posts/{slug}
```

```http
GET /api/v1/blog/categories
```

### Services (Public)

```http
GET /api/v1/services
```

### Contact

```http
POST /api/v1/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "emailOrPhone": "john@example.com",
  "message": "I'm interested in your services",
  "source": "contact-page"
}
```

---

## 🔒 Protected Endpoints (Auth Required)

**Add Header:** `Authorization: Bearer {token}`

### User Profile

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/v1/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@kwingx.com"
}
```

#### Change Password
```http
PUT /api/v1/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "admin",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

### My Orders

```http
GET /api/v1/me/orders
Authorization: Bearer {token}
```

### My Purchases

```http
GET /api/v1/me/purchases
Authorization: Bearer {token}
```

---

## 👨‍💼 Admin Endpoints (SuperAdmin Role Required)

### Blog Posts Management

#### List Blog Posts (Admin)
```http
GET /api/v1/admin/blog-posts?page=1&pageSize=10&search=&status=
Authorization: Bearer {token}
```

#### Get Blog Post by ID
```http
GET /api/v1/admin/blog-posts/{id}
Authorization: Bearer {token}
```

#### Create Blog Post
```http
POST /api/v1/admin/blog-posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Blog Post",
  "shortDescription": "This is a short description",
  "contentHtml": "<h1>Content</h1><p>Hello world</p>",
  "contentJson": "{}",
  "coverImageUrl": "http://localhost:9000/blog-assets/blog/2026/01/07/image.jpg",
  "buttonText": "Get Started",
  "buttonLinkUrl": "https://example.com",
  "buttonColor": "#111111",
  "buttonTextColor": "#FFFFFF",
  "status": "draft"
}
```

#### Update Blog Post
```http
PUT /api/v1/admin/blog-posts/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "shortDescription": "Updated description",
  "contentHtml": "<h1>Updated Content</h1>",
  "contentJson": "{}",
  "coverImageUrl": "http://localhost:9000/blog-assets/blog/2026/01/07/image.jpg",
  "buttonText": "Learn More",
  "buttonLinkUrl": "https://example.com/learn",
  "buttonColor": "#007bff",
  "buttonTextColor": "#ffffff",
  "status": "published"
}
```

#### Delete Blog Post
```http
DELETE /api/v1/admin/blog-posts/{id}
Authorization: Bearer {token}
```

### File Upload

#### Upload Image
```http
POST /api/v1/admin/uploads/images?prefix=blog
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary file data]
```

**Query Parameters:**
- `prefix` (optional): Storage prefix - `blog`, `template`, `landing`, `general`, `avatar`, `product`. Default: `general`

**Response:**
```json
{
  "url": "http://localhost:9000/blog-assets/blog/2026/01/07/guid-filename.jpg",
  "objectKey": "blog/2026/01/07/guid-filename.jpg",
  "fileName": "filename.jpg",
  "contentType": "image/jpeg",
  "size": 123456
}
```

#### Delete File
```http
DELETE /api/v1/admin/uploads/{objectKey}
Authorization: Bearer {token}
```

### Users Management

```http
GET /api/v1/admin/users?page=1&pageSize=10
Authorization: Bearer {token}
```

```http
GET /api/v1/admin/users/{id}
Authorization: Bearer {token}
```

### Logs

```http
GET /api/v1/admin/logs?page=1&pageSize=50&level=&search=
Authorization: Bearer {token}
```

### Contact Requests (Admin)

```http
GET /api/v1/admin/contacts?page=1&pageSize=10&status=
Authorization: Bearer {token}
```

```http
GET /api/v1/admin/contacts/{id}
Authorization: Bearer {token}
```

```http
PUT /api/v1/admin/contacts/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "InProgress"
}
```

---

## 🧪 Testing with Swagger

Access Swagger UI: **http://localhost:8080/swagger**

1. Click **"Authorize"** button (🔓 icon)
2. Login via `/api/v1/auth/login` to get token
3. Paste token in format: `Bearer {your-token}`
4. Click **"Authorize"**
5. Now you can test all protected endpoints

---

## 🔧 Testing with cURL

### Get Token
```bash
TOKEN=$(curl -s -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}' \
  | jq -r '.token')

echo $TOKEN
```

### Use Token
```bash
curl -X GET http://localhost:8080/api/v1/admin/blog-posts \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔧 Testing with PowerShell

### Get Token
```powershell
$loginBody = @{
    username = "admin"
    password = "admin"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $loginBody

$token = $response.token
Write-Host "Token: $token"
```

### Use Token
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/admin/blog-posts" `
  -Method Get `
  -Headers $headers
```

---

## 📋 Common Errors

### 404 Not Found
- ❌ Wrong: `/api/admin/auth/login`
- ✅ Correct: `/api/v1/auth/login`
- Remember to include `v1` in the path

### 401 Unauthorized
- Missing or invalid JWT token
- Token expired (default: 120 minutes)
- User inactive

### 403 Forbidden
- Valid token but insufficient permissions
- Endpoint requires specific role (e.g., SuperAdmin)

### 400 Bad Request
- Invalid request body
- Validation errors
- Check response body for details

---

## 🌐 Frontend API Client

The admin frontend automatically handles authentication and API calls:

```typescript
// Auto-configured in admin/src/lib/apiClient.ts
const apiClient = new ApiClient();

// Base URLs
adminApiBase: '/api/v1/admin'
authApiBase: '/api/v1/auth'
```

Usage in admin panel:
```typescript
// Login (handled by authContext)
await login({ usernameOrEmail: 'admin', password: 'admin' });

// API calls (token added automatically)
const posts = await blogPostsApi.list({ page: 1, pageSize: 10 });
```

---

## 📝 Notes

1. **API Versioning:** All endpoints use `/api/v1/` prefix
2. **Authentication:** JWT token valid for 120 minutes
3. **Authorization:** Role-based access control (SuperAdmin, Admin, User)
4. **CORS:** Enabled for development (localhost:3000, localhost:3001, localhost:5173)
5. **Rate Limiting:** Not implemented (should add for production)
6. **Pagination:** Default page size: 10, max: 100

