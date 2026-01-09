# 🚀 Quick Start - Blog Posts Feature

## 🔐 Login Credentials

### Admin Panel
```
Username: admin
Password: admin
```

### MinIO Console
```
Username: minioadmin
Password: minioadmin
```

## ✅ Implementation Complete!

All components have been implemented and are ready to use.

---

## 📋 Setup Steps

### 1. Install Frontend Dependencies
```bash
cd admin
npm install
```

**Packages installed:**
- @tiptap/react
- @tiptap/starter-kit
- @tiptap/extension-image
- @tiptap/extension-link
- @tiptap/extension-placeholder
- react-color

### 2. Run Backend Migration

**Windows:**
```powershell
cd KWingX.Backend
.\run-migration.ps1
```

**Linux/Mac:**
```bash
cd KWingX.Backend
chmod +x run-migration.sh
./run-migration.sh
```

**Or manually:**
```bash
cd KWingX.Backend/src/KWingX.Infrastructure
dotnet ef database update --startup-project ../KWingX.WebApi
```

### 3. Start Services
```bash
# From project root
docker compose up -d
```

This starts:
- ✅ PostgreSQL (port 5435)
- ✅ MinIO (ports 9000, 9001)
- ✅ API (port 8080)
- ✅ Admin UI (port 3001)

### 4. Start Frontend Dev Server
```bash
cd admin
npm run dev
```

Access: http://localhost:5173/admin/blog/posts

---

## 🎯 Usage

### Create Blog Post

1. Navigate to `/admin/blog/posts`
2. Click **"New Post"** button
3. Fill in:
   - **Title** (required, 3-200 chars)
   - **Short Description** (required, max 500 chars)
   - **Cover Image** (optional - drag & drop or click to upload)
   - **Content** (TipTap editor):
     - Type or paste text
     - Format with toolbar (Bold, Italic, Headings, Lists)
     - **Drag & drop images** into editor → auto-uploads
     - **Paste images** (Ctrl+V) → auto-uploads
     - Click image icon to upload from file
   - **CTA Button** (optional):
     - Button Text
     - Button Link URL
     - Button Color (color picker)
     - Text Color (color picker)
     - Live preview shown
   - **Status**: Draft or Published
4. Click **"Save Draft"** or **"Publish"**

### Edit Blog Post

1. Click **Edit** icon on any post in the list
2. Drawer opens with existing data
3. Make changes
4. Save

### Delete Blog Post

1. Click **Delete** icon
2. Confirm deletion

---

## 🖼️ Image Upload Features

### In TipTap Editor:
- **Drag & Drop**: Drag image file into editor → auto-uploads
- **Paste**: Copy image and paste (Ctrl+V) → auto-uploads
- **Button**: Click image icon in toolbar → select file → uploads

### Cover Image:
- Click file input or drag & drop
- Preview shown immediately
- Click X to remove

### Image Storage:
- Stored in MinIO: `blog/{yyyy}/{MM}/{dd}/{guid}-{fileName}`
- Public URL: `http://localhost:9000/blog-assets/blog/...`
- Max size: 5MB
- Formats: All image/* types

---

## 🔧 Configuration

### MinIO Access
- **Console**: http://localhost:9001
- **Username**: minioadmin
- **Password**: minioadmin
- **Bucket**: blog-assets (auto-created)

### API Endpoints
- **List**: `GET /api/v1/admin/blog-posts`
- **Get**: `GET /api/v1/admin/blog-posts/{id}`
- **Create**: `POST /api/v1/admin/blog-posts`
- **Update**: `PUT /api/v1/admin/blog-posts/{id}`
- **Delete**: `DELETE /api/v1/admin/blog-posts/{id}`
- **Upload**: `POST /api/v1/admin/uploads/images`

---

## 🐛 Troubleshooting

### Migration Fails
**Error**: Index already exists
**Solution**: Comment out the `CreateIndex` for Slug in migration file, or drop existing index first

### MinIO Not Starting
**Check**: `docker logs kwingx_minio`
**Solution**: Ensure ports 9000, 9001 are free

### Image Upload Fails
**Check**:
1. MinIO is running
2. S3 config in appsettings.json
3. File size < 5MB
4. File is image/* type

### TipTap Editor Not Loading
**Check**:
1. Packages installed: `npm list @tiptap/react`
2. Browser console for errors
3. React 18+ installed

---

## ✅ Features Implemented

### Backend
- ✅ HTML content storage
- ✅ ContentJson for editor state
- ✅ Slug auto-generation
- ✅ HTML sanitization
- ✅ CTA button fields
- ✅ PublishedAt auto-rules
- ✅ MinIO file storage
- ✅ Image upload validation
- ✅ FluentValidation

### Frontend
- ✅ Right-side drawer UI
- ✅ TipTap rich editor
- ✅ Image drag & drop
- ✅ Image paste
- ✅ Auto-upload on insert
- ✅ Cover image upload
- ✅ CTA button config
- ✅ Live preview
- ✅ Form validation
- ✅ Loading states

---

## 📚 Documentation

- **Complete Guide**: `COMPLETE_IMPLEMENTATION_GUIDE.md`
- **Migration Guide**: `KWingX.Backend/MIGRATION_GUIDE_BLOG_POSTS.md`
- **Implementation Summary**: `BLOG_POSTS_IMPLEMENTATION_SUMMARY.md`

---

## 🎉 Ready to Use!

Everything is implemented and tested. Start creating blog posts! 🚀

