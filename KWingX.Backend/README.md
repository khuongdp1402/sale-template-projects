# K-WingX Backend (.NET 8 Web API)

This is the backend solution for K-WingX, built with .NET 8 using Clean Architecture.

## Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- PostgreSQL (or update connection string in `appsettings.json` to use another provider)

## Project Structure
- `src/KWingX.Domain`: Core entities and interfaces.
- `src/KWingX.Application`: Business logic, CQRS handlers, validators.
- `src/KWingX.Infrastructure`: Database implementation, external services.
- `src/KWingX.WebApi`: API Controllers and entry point.

## How to Run (Docker)
1. **Start the application**:
   ```bash
   docker compose up --build
   ```
   This will start the API and PostgreSQL database.
   - API: `http://localhost:8080`
   - Swagger: `http://localhost:8080/swagger`
   - Health Check: `http://localhost:8080/health`

2. **Database Migrations**:
   Migrations are automatically applied when the API container starts.
   The database `kwx` and all tables will be created automatically.

3. **Stop the application**:
   ```bash
   docker compose down
   ```
   To reset the database (delete volume):
   ```bash
   docker compose down -v
   ```

## How to Run (Local .NET)
1. **Install Dependencies**:
   ```bash
   dotnet restore
   ```

2. **Database Setup**:
   Ensure PostgreSQL is running. Update `appsettings.json` if needed.

3. **Run the API**:
   ```bash
   cd src/KWingX.WebApi
   dotnet run
   ```

## Features
- **Auth**: Login, Register, JWT Token generation.
- **Marketplace**: Browse templates, view details.
- **Purchases**: Buy templates, manage license keys.
- **Blog**: Read blog posts.
- **API Access**: Manage API keys.

## Development Notes
- The solution uses **EF Core** for data access.
- **MediatR** is used for CQRS pattern.
- **FluentValidation** handles request validation.
- Data is automatically seeded on startup in Development mode.
