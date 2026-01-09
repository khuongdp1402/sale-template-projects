# Blog Posts Create/Edit Implementation - Summary

## ✅ Backend Implementation (COMPLETE)

### 1. Domain Layer
- ✅ Updated `BlogPost` entity with:
  - `ContentHtml` (required, text)
  - `ContentJson` (optional, text)
  - `ShortDescription` (max 500)
  - `CoverImageUrl`
  - CTA button fields (`ButtonLinkUrl`, `ButtonText`, `ButtonColor`, `ButtonTextColor`)
  - `PublishedAt` (nullable)
- ✅ `BlogPostStatus` enum (Draft, Published)

### 2. Application Layer
- ✅ DTOs: `BlogPostCreateRequest`, `BlogPostUpdateRequest`, `BlogPostResponse`, `BlogPostListItemDto`
- ✅ FluentValidation validators with all rules:
  - Title: 3-200 chars
  - ShortDescription: max 500
  - ContentHtml: required
  - Hex color validation
  - URL validation
  - Button text/link mutual requirement
- ✅ Business logic in `BlogPostService`:
  - Slug generation from title (kebab-case)
  - Slug uniqueness (suffix -1, -2...)
  - PublishedAt auto-set rules
  - HTML sanitization (removes script tags, event handlers)
- ✅ Helpers: `SlugHelper`, `HtmlSanitizer`

### 3. Infrastructure Layer
- ✅ EF Core configuration (`BlogPostConfiguration`)
  - Column types (text for ContentHtml/ContentJson)
  - Max lengths
  - Unique index on Slug
- ✅ MinIO integration:
  - `IFileStorage` interface
  - `MinioS3FileStorage` implementation
  - `S3Options` configuration
  - `FileStorageHelper` for object key generation
- ✅ DI registration

### 4. API Layer
- ✅ `BlogPostsController`:
  - `GET /api/v1/admin/blog-posts` - List
  - `GET /api/v1/admin/blog-posts/{id}` - Get
  - `POST /api/v1/admin/blog-posts` - Create
  - `PUT /api/v1/admin/blog-posts/{id}` - Update
  - `DELETE /api/v1/admin/blog-posts/{id}` - Delete
- ✅ `UploadsController`:
  - `POST /api/v1/admin/uploads/images` - Upload image
    - Validates: image/* mime type, max 5MB
    - Returns: URL, objectKey, fileName, contentType, size

### 5. Docker & Configuration
- ✅ MinIO service added to `docker-compose.yml`
  - Ports: 9000 (API), 9001 (Console)
  - Volume: `minio_data`
  - Health check
- ✅ `appsettings.json` updated with S3 config

## ⚠️ Backend - Remaining Tasks

### 1. Generate Migration
```bash
cd KWingX.Backend/src/KWingX.Infrastructure
dotnet ef migrations add UpdateBlogPostForHtmlContent --startup-project ../KWingX.WebApi
dotnet ef database update --startup-project ../KWingX.WebApi
```

### 2. Add AWS SDK Package
The `AWSSDK.S3` package reference has been added to `KWingX.Infrastructure.csproj`. Run:
```bash
dotnet restore
```

### 3. Ensure Bucket on Startup (Optional)
Add to `Program.cs`:
```csharp
using (var scope = app.Services.CreateScope())
{
    var fileStorage = scope.ServiceProvider.GetRequiredService<IFileStorage>();
    await fileStorage.EnsureBucketExistsAsync();
}
```

## ✅ Frontend Implementation (PARTIAL)

### Completed
- ✅ API client (`admin/src/services/blogApi.ts`)
  - All CRUD operations
  - Image upload with FormData
- ✅ List page (`BlogPostsListPage.tsx`)
  - Table with search/filter
  - Pagination
  - Create/Edit/Delete actions

### Remaining
- ⚠️ **BlogPostDrawer** component (right-side drawer)
- ⚠️ **TipTapEditor** component (rich HTML editor)
- ⚠️ Install TipTap packages
- ⚠️ Update routes

## 📋 Frontend - Next Steps

### 1. Install Dependencies
```bash
cd admin
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder react-color
```

### 2. Create TipTapEditor Component
File: `admin/src/components/editor/TipTapEditor.tsx`

Key features:
- WYSIWYG editor
- Image drag & drop
- Image paste
- Upload images via `blogPostsApi.uploadImage()`
- Insert image URL into editor
- Output HTML

### 3. Create BlogPostDrawer Component
File: `admin/src/features/blog/BlogPostDrawer.tsx`

Fields:
- Title (input)
- ShortDescription (textarea with 0/500 counter)
- CoverImageUrl (file upload + preview)
- ContentHtml (TipTapEditor)
- ContentJson (optional, for editor state)
- CTA Button config:
  - ButtonText
  - ButtonLinkUrl
  - ButtonColor (color picker)
  - ButtonTextColor (color picker)
  - Live preview
- Status (Draft/Published)
- Actions: Cancel, Save Draft, Publish

### 4. Update Routes
File: `admin/src/app/routes.tsx`

Add:
```tsx
{
  path: 'blog/posts',
  element: <BlogPostsListPage />,
},
```

## 🎯 Image Upload Flow

1. User drags/drops or pastes image in TipTap editor
2. TipTap detects image
3. Call `blogPostsApi.uploadImage(file)`
4. Receive URL from backend
5. Insert `<img src="{url}">` into editor
6. Editor outputs HTML with image URLs

## 📝 Key Implementation Details

### Slug Generation
- Auto-generated from title
- Kebab-case conversion
- Uniqueness ensured with suffix (-1, -2...)

### HTML Sanitization
- Removes `<script>` tags
- Removes event handlers (onclick, etc.)
- Removes `javascript:` protocol
- **Note:** For production, consider using a proper HTML sanitizer library

### Image Storage
- Path: `blog/{yyyy}/{MM}/{dd}/{guid}-{fileName}`
- Public URL: `{PublicBaseUrl}/blog/{yyyy}/{MM}/{dd}/{guid}-{fileName}`
- Max size: 5MB
- MIME: image/*

### PublishedAt Rules
- If Status=Published and PublishedAt=null → Set to UtcNow
- If Status=Draft → Set PublishedAt=null

## 🚀 Testing

### Backend
1. Start services: `docker compose up -d`
2. Access MinIO console: http://localhost:9001 (minioadmin/minioadmin)
3. Test API endpoints via Swagger: http://localhost:8080/swagger
4. Test image upload: `POST /api/v1/admin/uploads/images`

### Frontend
1. Start dev server: `cd admin && npm run dev`
2. Navigate to `/admin/blog/posts`
3. Test create/edit flow
4. Test image upload in editor

## 📚 Documentation

- `KWingX.Backend/MIGRATION_GUIDE_BLOG_POSTS.md` - Migration steps
- `admin/BLOG_POSTS_IMPLEMENTATION.md` - Frontend setup guide

## ✅ Status

**Backend:** 95% Complete (needs migration)
**Frontend:** 40% Complete (needs TipTap integration)

---

**Ready for:** Backend testing, Frontend TipTap integration

