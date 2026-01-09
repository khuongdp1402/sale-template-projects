# Upload System Guide

## Overview

Hệ thống upload được xây dựng để tái sử dụng cho nhiều mục đích khác nhau trong Admin Panel.

## Backend (MinIO Integration)

### API Endpoint

```
POST /api/v1/admin/uploads/images?prefix={prefix}
DELETE /api/v1/admin/uploads/{objectKey}
```

**Supported Prefixes:**
- `blog` - Blog posts
- `template` - Templates
- `landing` - Landing sections
- `avatar` - User avatars
- `product` - Products
- `general` - General purpose

### Response Format

```typescript
{
  url: string;          // Public URL to access the image
  objectKey: string;    // Unique object key in MinIO
  fileName: string;     // Original file name
  contentType: string;  // MIME type
  size: number;         // File size in bytes
}
```

## Frontend Usage

### 1. Using Generic Upload API

```typescript
import { uploadImage } from '@/services/uploadApi';

const handleUpload = async (file: File) => {
  try {
    const result = await uploadImage(file, 'blog');
    console.log('Uploaded:', result.url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### 2. Using ImageUploader Component

```tsx
import { ImageUploader } from '@/components/upload/ImageUploader';

function MyForm() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUploader
      value={imageUrl}
      onChange={setImageUrl}
      prefix="blog"
      maxSizeMB={5}
      showPreview
    />
  );
}
```

**Props:**
- `value?: string` - Current image URL
- `onChange: (url: string) => void` - Callback when upload succeeds
- `onRemove?: () => void` - Callback when image is removed
- `prefix?: UploadPrefix` - Storage category (default: 'general')
- `maxSizeMB?: number` - Max file size in MB (default: 5)
- `showPreview?: boolean` - Show image preview (default: true)
- `previewHeight?: string` - Preview height class (default: 'h-32')

### 3. Using Upload Hook

```tsx
import { useImageUpload } from '@/hooks/useImageUpload';

function MyComponent() {
  const { upload, isUploading } = useImageUpload({
    prefix: 'template',
    onSuccess: (url) => console.log('Uploaded:', url),
    onError: (err) => console.error('Error:', err),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await upload(file);
      // Use url...
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      disabled={isUploading}
    />
  );
}
```

## TipTap Editor Integration

TipTap editor tự động upload ảnh khi:
- Drag & drop ảnh vào editor
- Paste ảnh từ clipboard
- Click nút Image trong toolbar

```tsx
import { TipTapEditor } from '@/components/editor/TipTapEditor';

<TipTapEditor
  content={contentHtml}
  onChange={(html, json) => {
    setFormData(prev => ({
      ...prev,
      contentHtml: html,
      contentJson: json,
    }));
  }}
  placeholder="Start writing..."
/>
```

## File Storage Structure

Files được lưu trong MinIO với cấu trúc:

```
{prefix}/{yyyy}/{MM}/{dd}/{guid}-{sanitized-filename}.{ext}
```

**Example:**
```
blog/2026/01/07/a1b2c3d4-my-awesome-image.jpg
template/2026/01/07/e5f6g7h8-hero-banner.png
```

## Security

- **Authentication:** Yêu cầu JWT token
- **Authorization:** Policy `BlogWrite` (có thể mở rộng)
- **File Type:** Chỉ cho phép image types
- **File Size:** Max 5MB (configurable)
- **Prefix Whitelist:** Chỉ cho phép prefixes được định nghĩa

## Extending for New Use Cases

### 1. Add New Prefix

**Backend:**
```csharp
// UploadsController.cs
var allowedPrefixes = new[] { "blog", "template", "landing", "general", "avatar", "product", "your-new-prefix" };
```

**Frontend:**
```typescript
// uploadApi.ts
export type UploadPrefix = 'blog' | 'template' | 'landing' | 'general' | 'avatar' | 'product' | 'your-new-prefix';
```

### 2. Use in New Feature

```tsx
import { ImageUploader } from '@/components/upload/ImageUploader';

function MyNewFeature() {
  const [bannerUrl, setBannerUrl] = useState('');

  return (
    <ImageUploader
      value={bannerUrl}
      onChange={setBannerUrl}
      prefix="your-new-prefix"  // ← Use your new prefix
      maxSizeMB={10}            // ← Custom size limit
    />
  );
}
```

## Best Practices

1. **Use Appropriate Prefix:** Giúp tổ chức files và dễ quản lý
2. **Store objectKey:** Lưu objectKey để có thể delete file sau này
3. **Handle Errors:** Luôn catch và xử lý upload errors
4. **Show Loading State:** Hiển thị loading khi đang upload
5. **Validate Client-Side:** Kiểm tra file type và size trước khi upload

## Example: Complete Blog Cover Image

```tsx
import { useState } from 'react';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { Card } from '@/components/ui/Card';

function BlogPostForm() {
  const [formData, setFormData] = useState({
    title: '',
    coverImageUrl: '',
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Title *
          </label>
          <input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              title: e.target.value
            }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Cover Image
          </label>
          <ImageUploader
            value={formData.coverImageUrl}
            onChange={(url) => setFormData(prev => ({
              ...prev,
              coverImageUrl: url
            }))}
            prefix="blog"
            showPreview
          />
        </div>
      </div>
    </Card>
  );
}
```

## Troubleshooting

**Upload fails:**
1. Check MinIO is running: `docker ps`
2. Check network connectivity
3. Check file size and type
4. Check JWT token validity

**Images not displaying:**
1. Verify PublicBaseUrl in appsettings.json
2. Check MinIO bucket policy
3. Check CORS settings

**Delete fails:**
1. Verify objectKey format
2. Check if file exists in MinIO
3. Check permissions

