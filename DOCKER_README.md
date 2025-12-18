# Docker Setup for K-WingX

This Docker Compose setup runs the entire K-WingX ecosystem:
- **Portal Frontend** (Marketing Site) - Port 3000
- **Admin CMS Frontend** - Port 3001
- **Backend API** (.NET 8) - Port 8080
- **PostgreSQL Database** - Port 5432

## Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine + Docker Compose (Linux)
- At least 4GB RAM available for Docker

## Quick Start

### 1. Build and Start All Services

```bash
docker-compose up -d --build
```

This will:
- Build all frontend and backend images
- Start PostgreSQL database
- Start Backend API
- Start Portal frontend
- Start Admin CMS frontend

### 2. Access the Applications

Once all containers are running:

- **Portal (Marketing Site)**: http://localhost:3000
- **Admin CMS**: http://localhost:3001
- **Backend API**: http://localhost:8080
- **API Swagger**: http://localhost:8080/swagger
- **Health Check**: http://localhost:8080/health

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f portal
docker-compose logs -f admin
docker-compose logs -f postgres
```

### 4. Stop All Services

```bash
docker-compose down
```

### 5. Stop and Remove Volumes (Clean Database)

```bash
docker-compose down -v
```

## Services Details

### PostgreSQL Database
- **Image**: `postgres:15-alpine`
- **Port**: `5432`
- **Database**: `kwingx_db`
- **Username**: `postgres`
- **Password**: `postgres`
- **Volume**: `postgres_data` (persistent storage)

### Backend API
- **Framework**: .NET 8
- **Port**: `8080`
- **Health Check**: `/health`
- **Auto-migration**: Enabled on startup
- **Environment Variables**:
  - `ConnectionStrings__Postgres`: Auto-configured to connect to postgres service
  - `Jwt__Key`: JWT signing key
  - `Jwt__Issuer`: JWT issuer
  - `Jwt__Audience`: JWT audience

### Portal Frontend
- **Framework**: React 18 + Vite
- **Port**: `3000` (mapped from container port 80)
- **Nginx**: Serves built static files
- **API Proxy**: `/api/*` requests proxied to backend

### Admin CMS Frontend
- **Framework**: React 18 + Vite
- **Port**: `3001` (mapped from container port 80)
- **Nginx**: Serves built static files
- **API Proxy**: `/api/*` requests proxied to backend

## Environment Variables

You can override default values by creating a `.env` file in the root directory:

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=kwingx_db

# API
JWT_KEY=your-secret-key-here
JWT_ISSUER=kwingx.com
JWT_AUDIENCE=kwingx.com

# Frontend API URLs (for build-time)
VITE_API_BASE_URL=http://localhost:8080
```

## Development Workflow

### Rebuild After Code Changes

```bash
# Rebuild specific service
docker-compose build api
docker-compose up -d api

# Rebuild all services
docker-compose up -d --build
```

### Database Migrations

Migrations run automatically on API startup. To manually run migrations:

```bash
docker-compose exec api dotnet ef migrations add MigrationName --project src/KWingX.Infrastructure
docker-compose exec api dotnet ef database update --project src/KWingX.Infrastructure
```

### Access Database

```bash
# Using psql
docker-compose exec postgres psql -U postgres -d kwingx_db

# Or connect from host
psql -h localhost -p 5432 -U postgres -d kwingx_db
```

### View API Logs

```bash
docker-compose logs -f api
```

## Troubleshooting

### Port Already in Use

If ports 3000, 3001, 8080, or 5432 are already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "3002:80"  # Change host port
```

### Database Connection Issues

Ensure the API container waits for PostgreSQL to be healthy:

```bash
docker-compose ps  # Check service status
docker-compose logs postgres  # Check database logs
```

### Frontend Build Failures

Check build logs:

```bash
docker-compose build portal --no-cache
docker-compose build admin --no-cache
```

### Clear Everything and Start Fresh

```bash
# Stop and remove containers, networks, volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild from scratch
docker-compose up -d --build
```

## Production Considerations

For production deployment:

1. **Change default passwords** in `docker-compose.yml`
2. **Use environment variables** for sensitive data (don't commit secrets)
3. **Enable HTTPS** by adding SSL certificates and configuring nginx
4. **Use production build** for frontends (already configured)
5. **Set `ASPNETCORE_ENVIRONMENT=Production`** for API
6. **Configure proper CORS** origins in API
7. **Use secrets management** (Docker Secrets, Azure Key Vault, etc.)
8. **Set up proper logging** and monitoring
9. **Configure backup strategy** for PostgreSQL volume

## Network Architecture

```
┌─────────────┐
│   Portal    │ :3000
│  (Nginx)    │
└──────┬──────┘
       │
       ├─── /api ────┐
       │             │
┌──────▼──────┐      │
│    Admin    │ :3001│
│   (Nginx)   │      │
└──────┬──────┘      │
       │             │
       └─── /api ────┼───┐
                     │   │
              ┌──────▼───▼──────┐
              │   Backend API   │ :8080
              │    (.NET 8)     │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │   PostgreSQL   │ :5432
              └────────────────┘
```

All services communicate through Docker's internal network (`kwingx_network`).


