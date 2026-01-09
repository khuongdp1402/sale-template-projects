# Login Credentials

## Admin Panel

### Default Admin Account

```
Username: admin
Password: admin
```

**Access URLs:**
- Local: http://localhost:3001/admin/login
- Docker: http://localhost:3001/admin/login

### Roles

Admin user có role `SuperAdmin` với full permissions:
- Dashboard access
- Template management (CRUD)
- Blog management (CRUD)
- User management
- Order & Payment management
- Contact request management
- System monitoring
- Deployment management

## MinIO Console

```
Username: minioadmin
Password: minioadmin
```

**Access URL:**
- http://localhost:9001

## PostgreSQL Database

```
Host: localhost
Port: 5435
Database: kwingx_db
Username: postgres
Password: postgres
```

**Connection String:**
```
Host=localhost;Port=5435;Database=kwingx_db;Username=postgres;Password=postgres
```

## API Endpoints

**Base URL:** http://localhost:8080

**Swagger UI:** http://localhost:8080/swagger

### Authentication

**⚠️ IMPORTANT:** Endpoint là `/api/v1/auth/login` (có version `v1`, KHÔNG có `admin`)

**Endpoint:** `POST http://localhost:8080/api/v1/auth/login`

**Request:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "admin",
    "email": "admin@kwingx.com",
    "roles": ["SuperAdmin"]
  }
}
```

## Quick Start

### 1. Start Services

```bash
docker compose up -d
```

### 2. Login to Admin Panel

1. Go to http://localhost:3001/admin/login
2. Enter credentials:
   - Username: `admin`
   - Password: `admin`
3. Click "Sign in"

### 3. Access Features

After login, you can access:
- Dashboard: http://localhost:3001/admin
- Blog Posts: http://localhost:3001/admin/blog
- Templates: http://localhost:3001/admin/templates
- Orders: http://localhost:3001/admin/orders
- Users: http://localhost:3001/admin/users

## Reset Password

If you need to reset the admin password:

### Option 1: Using Script

```powershell
cd KWingX.Backend
.\reset-admin-password.ps1
docker compose down
docker compose up -d
```

### Option 2: Manual Reset

1. Stop containers:
   ```bash
   docker compose down
   ```

2. Remove database volume (will reset all data):
   ```bash
   docker volume rm kwingx_postgres_data
   ```

3. Start containers:
   ```bash
   docker compose up -d
   ```

Default credentials will be created automatically.

## Security Notes

**⚠️ IMPORTANT for Production:**

1. **Change default passwords** before deploying to production
2. **Use strong passwords** (minimum 12 characters, mixed case, numbers, symbols)
3. **Enable HTTPS** for all connections
4. **Rotate credentials** regularly
5. **Use environment variables** for sensitive data
6. **Enable rate limiting** on auth endpoints
7. **Set up proper CORS** policies

### Recommended Production Credentials

```env
# .env.production
ADMIN_USERNAME=your-secure-username
ADMIN_PASSWORD=YourSecurePassword123!@#
MINIO_ROOT_USER=your-minio-username
MINIO_ROOT_PASSWORD=YourMinIOPassword456!@#
POSTGRES_PASSWORD=YourPostgresPassword789!@#
JWT_KEY=your-very-long-random-jwt-secret-key-min-32-chars
```

## Troubleshooting

### Cannot Login

1. **Check credentials** - Username and password are case-sensitive
2. **Check network** - Ensure containers are running: `docker ps`
3. **Check logs** - View API logs: `docker compose logs api`
4. **Reset database** - If needed, remove volume and restart

### Password Not Working

1. **Verify seed ran** - Check API logs for "Database seeding completed"
2. **Reset password** - Use reset script
3. **Check database** - Verify user exists in database

### API Returns 401

1. **Token expired** - Re-login to get new token
2. **Invalid token** - Clear localStorage and re-login
3. **User inactive** - Check `IsActive` flag in database

## Development vs Production

### Development (Current)
- Simple credentials for easy testing
- Auto-seeding enabled
- Swagger UI enabled
- CORS permissive
- Debug logging enabled

### Production (Recommended)
- Strong, unique passwords
- Disable auto-seeding after first deploy
- Disable Swagger UI
- Strict CORS policy
- Error logging only
- Enable HTTPS
- Use Azure Key Vault / AWS Secrets Manager for credentials

