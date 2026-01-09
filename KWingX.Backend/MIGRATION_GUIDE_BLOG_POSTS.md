# Blog Posts Migration Guide

## Overview
This guide covers the migration to update BlogPost entity for HTML content, CTA buttons, and MinIO integration.

## Steps

### 1. Generate Migration
```bash
cd KWingX.Backend/src/KWingX.Infrastructure
dotnet ef migrations add UpdateBlogPostForHtmlContent --startup-project ../KWingX.WebApi
```

### 2. Review Migration
The migration will:
- Add new columns: `ShortDescription`, `ContentHtml`, `ContentJson`, `CoverImageUrl`, `ButtonLinkUrl`, `ButtonText`, `ButtonColor`, `ButtonTextColor`
- Update `PublishedAt` to nullable
- Keep legacy columns (`Excerpt`, `ContentMd`, `CoverImage`) for backward compatibility
- Add unique index on `Slug` (if not exists)

### 3. Apply Migration
```bash
dotnet ef database update --startup-project ../KWingX.WebApi
```

### 4. Start Services
```bash
docker compose up -d
```

This will start:
- PostgreSQL
- MinIO (on ports 9000, 9001)
- API
- Admin UI

### 5. Access MinIO Console
- URL: http://localhost:9001
- Username: minioadmin
- Password: minioadmin

The bucket `blog-assets` will be created automatically on first upload.

## Configuration

### appsettings.json
```json
{
  "S3": {
    "ServiceUrl": "http://minio:9000",
    "AccessKey": "minioadmin",
    "SecretKey": "minioadmin",
    "BucketName": "blog-assets",
    "PublicBaseUrl": "http://localhost:9000/blog-assets",
    "UseSSL": false
  }
}
```

### Docker Environment
For production, update environment variables in docker-compose.yml:
```yaml
minio:
  environment:
    - MINIO_ROOT_USER=your-secure-username
    - MINIO_ROOT_PASSWORD=your-secure-password
```

## API Endpoints

### Blog Posts
- `GET /api/v1/admin/blog-posts` - List posts
- `GET /api/v1/admin/blog-posts/{id}` - Get post
- `POST /api/v1/admin/blog-posts` - Create post
- `PUT /api/v1/admin/blog-posts/{id}` - Update post
- `DELETE /api/v1/admin/blog-posts/{id}` - Delete post

### Image Upload
- `POST /api/v1/admin/uploads/images` - Upload image (multipart/form-data)

## Image URL Format
Images are stored with the following path structure:
```
blog/{yyyy}/{MM}/{dd}/{guid}-{sanitizedFileName}
```

Public URL format:
```
{PublicBaseUrl}/blog/{yyyy}/{MM}/{dd}/{guid}-{sanitizedFileName}
```

Example:
```
http://localhost:9000/blog-assets/blog/2025/01/05/abc123-my-image.jpg
```

## Notes
- Legacy fields (`Excerpt`, `ContentMd`, `CoverImage`) are marked `[Obsolete]` but kept for backward compatibility
- HTML content is sanitized to remove script tags and event handlers
- Slug is auto-generated from title and ensured unique
- PublishedAt is automatically set when status changes to Published

