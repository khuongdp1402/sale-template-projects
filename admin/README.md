# K-WingX Admin Portal

Internal Admin CMS for managing K-WingX ecosystem.

## Features

- **Dashboard**: System overview with KPIs, charts, and health monitoring
- **Templates CMS**: Full CRUD for template management
- **Blog CMS**: Blog post management
- **Landing Sections**: Landing page content management
- **Users Management**: User accounts and role management
- **Orders**: Order tracking and management
- **Payments**: Payment transaction monitoring
- **Contacts**: Lead and contact request management
- **Monitoring**: System health and status monitoring
- **Deployments**: Deployment management and status
- **Logs**: Unified log viewer

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query (React Query)
- React Hook Form + Zod
- Recharts
- Lucide React Icons
- React Helmet Async (SEO)

## Setup

1. Install dependencies:
```bash
cd admin
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
VITE_API_BASE_URL=http://localhost:8080
```

4. Run development server:
```bash
npm run dev
```

The admin portal will be available at `http://localhost:3001/admin`

## Project Structure

```
admin/
├── src/
│   ├── app/              # App setup, routes, providers, layout
│   ├── features/         # Feature modules (auth, dashboard, templates, etc.)
│   ├── components/       # Shared components (UI, common)
│   ├── lib/              # Utilities (API client, format, permissions, SEO)
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
├── public/               # Static assets
└── index.html
```

## Authentication

- Login page: `/admin/login`
- JWT token stored in localStorage (TODO: migrate to httpOnly cookies)
- Protected routes require authentication
- RBAC (Role-Based Access Control) implemented

## API Integration

The admin portal connects to `KwingX.Backend` API. All API calls go through the centralized `apiClient` which:
- Attaches JWT token automatically
- Handles 401 errors (logout + redirect)
- Uses base URL from `VITE_API_BASE_URL`

## SEO

- All admin pages are set to `noindex,nofollow` by default
- Uses React Helmet Async for meta tags
- robots.txt configured to disallow all crawlers

## Environment Variables

- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:8080)

## Build

```bash
npm run build
```

Output will be in `dist/` directory.

