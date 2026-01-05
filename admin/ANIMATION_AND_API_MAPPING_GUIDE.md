# 🎨 Animation & API Mapping Guide

## 📋 Tổng quan

Guide này hướng dẫn cách implement animations đẹp mắt và mapping chính xác với Backend API.

---

## 🎬 Animations đã implement

### 1. CSS Animations (globals.css)

```css
.animate-fade-in        /* Fade in từ opacity 0 -> 1 */
.animate-slide-in       /* Slide up + fade in */
.animate-slide-in-right /* Slide from right + fade in */
.animate-slide-in-left  /* Slide from left + fade in */
.animate-shake          /* Shake effect cho errors */
.animate-scale-in       /* Scale + fade in */
```

### 2. Animation Delays

```css
.animate-delay-100      /* 100ms delay */
.animate-delay-200      /* 200ms delay */
.animate-delay-300      /* 300ms delay */
.animate-delay-400      /* 400ms delay */
```

### 3. SlidingPanel Component

File: `admin/src/components/common/SlidingPanel.tsx`

**Features:**
- ✅ Smooth slide-in từ bên phải
- ✅ Backdrop với blur effect
- ✅ Auto-scroll prevention
- ✅ ESC key để đóng
- ✅ Staggered content animation
- ✅ Responsive widths (sm, md, lg, xl, full)

**Usage:**
```tsx
import { SlidingPanel } from '@/components/common/SlidingPanel';

<SlidingPanel
  isOpen={isOpen}
  onClose={handleClose}
  title="Blog Post Details"
  subtitle="/my-awesome-post"
  width="lg"
>
  <YourContent />
</SlidingPanel>
```

---

## 🔗 Backend API Mapping

### 1. Blog Posts

**Backend DTO:** `KWingX.Backend/src/KWingX.Application/DTOs/Blog/BlogDtos.cs`

#### CreateBlogPostRequest
```csharp
{
  Title: string (required)
  Slug: string (required)
  Excerpt: string (required)
  ContentMd: string (required)
  Category: string (required)
  TagsCsv: string? (optional, comma-separated)
  CoverImage: string? (optional URL)
  IsFeatured: bool (default: false)
  Status: BlogPostStatus (enum: Draft, Published)
}
```

#### Frontend Form (BlogEditPage.tsx)
```tsx
const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  excerpt: z.string().min(1).max(500),
  contentMd: z.string().min(1),
  category: z.string().min(1),
  tagsCsv: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
});
```

✅ **100% mapping** - All backend fields are covered

---

### 2. Templates

**Backend DTO:** `KWingX.Backend/src/KWingX.Application/DTOs/Templates/TemplateDtos.cs`

#### CreateTemplateRequest
```csharp
{
  Slug: string (required)
  ShortDescription: string (required)
  LongDescription: string (required)
  TemplateType: enum (Service, Ecommerce, Landing)
  Audience: enum (B2B, B2C, Both)
  Price: decimal (required)
  OriginalPrice: decimal? (optional)
  IsHot: bool
  IsNew: bool
  IsPopular: bool
  Status: TemplateStatus (enum: Draft, Published, Archived)
  FeaturesCsv: string? (comma-separated)
  CategoryIds: List<Guid>
  TagIds: List<Guid>
}
```

#### Frontend Form (TemplateEditPage.tsx)
Current implementation covers:
- ✅ Basic info (name, slug, type, audience)
- ✅ Descriptions (short, long)
- ✅ Pricing (price, original price, currency)
- ✅ Flags (isPopular, isNew, isHot)
- ✅ Status

⚠️ **Missing fields:**
- ❌ CategoryIds (Guid[]) - Currently using string array
- ❌ TagIds (Guid[]) - Currently using string array
- ❌ FeaturesCsv - Currently array

**Fix needed:** Update to use proper Guid arrays for categories/tags

---

### 3. Contacts

**Backend DTO:** `KWingX.Backend/src/KWingX.Application/DTOs/Contacts/ContactDtos.cs`

#### ContactRequestDto (Read)
```csharp
{
  Id: Guid
  Name: string
  EmailOrPhone: string
  Message: string
  Source: string?
  PageUrl: string?
  Status: ContactRequestStatus
  Notes: string?
  CreatedAt: DateTime
}
```

#### Update Operations
```csharp
UpdateContactStatusRequest {
  Status: ContactRequestStatus
}

UpdateContactNotesRequest {
  Notes: string?
}
```

✅ **Fully mapped** in mock server

---

### 4. Users

**Backend DTO:** `KWingX.Backend/src/KWingX.Application/DTOs/Auth/AuthDtos.cs`

#### UserDto
```csharp
{
  Id: Guid
  Username: string
  Email: string
  Roles: List<string>
  TenantId: Guid?
  TenantCode: string?
}
```

⚠️ **Note:** Frontend mock có thêm `isActive`, `createdAt` - cần sync với backend

---

## 🎯 Cách apply Animations vào Components

### Example 1: Form with Staggered Animation

```tsx
<form className="space-y-6 animate-fade-in">
  {/* Card 1 - No delay */}
  <Card className="animate-slide-in">
    <div className="p-6">
      {/* Content */}
    </div>
  </Card>

  {/* Card 2 - 100ms delay */}
  <Card className="animate-slide-in animate-delay-100">
    <div className="p-6">
      {/* Content */}
    </div>
  </Card>

  {/* Card 3 - 200ms delay */}
  <Card className="animate-slide-in animate-delay-200">
    <div className="p-6">
      {/* Content */}
    </div>
  </Card>
</form>
```

### Example 2: Error Animation

```tsx
{errors.title && (
  <p className="text-sm text-red-600 mt-1 animate-shake">
    {errors.title.message}
  </p>
)}
```

### Example 3: Loading State

```tsx
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="space-y-4 text-center animate-fade-in">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  );
}
```

### Example 4: Modal/Panel Transitions

```tsx
<div 
  className={`transform transition-all duration-500 ${
    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
  }`}
>
  {/* Panel content */}
</div>
```

---

## ✅ Checklist: Đảm bảo đầy đủ API Mapping

### Blog Posts ✅
- [x] Title, Slug, Excerpt
- [x] ContentMd (Markdown)
- [x] Category, TagsCsv
- [x] CoverImage URL
- [x] IsFeatured flag
- [x] Status (Draft/Published)

### Templates ⚠️
- [x] Basic info
- [x] Pricing
- [x] Flags (hot, new, popular)
- [ ] CategoryIds as Guid[] (needs fix)
- [ ] TagIds as Guid[] (needs fix)
- [ ] FeaturesCsv proper format

### Users ✅
- [x] Username, Email
- [x] Roles array
- [x] TenantId (optional)

### Contacts ✅
- [x] Name, EmailOrPhone, Message
- [x] Status update
- [x] Notes update

---

## 🚀 Quick Start: Add Animations to Existing Component

1. **Import animations CSS** (already in globals.css)

2. **Add to component:**
```tsx
// Container
<div className="animate-fade-in">

// Cards with staggered animation
<Card className="animate-slide-in">...</Card>
<Card className="animate-slide-in animate-delay-100">...</Card>
<Card className="animate-slide-in animate-delay-200">...</Card>

// Errors
{error && <p className="animate-shake">{error}</p>}

// Buttons on hover
<Button className="transition-all hover:scale-105">Save</Button>
```

3. **Use SlidingPanel for detail views:**
```tsx
import { SlidingPanel } from '@/components/common/SlidingPanel';

<SlidingPanel isOpen={isOpen} onClose={onClose} title="Details">
  {/* Your content */}
</SlidingPanel>
```

---

## 📊 API Endpoints Quick Reference

### Blog
- GET `/api/admin/blog/posts` - List
- GET `/api/admin/blog/posts/{id}` - Detail
- POST `/api/admin/blog/posts` - Create
- PUT `/api/admin/blog/posts/{id}` - Update
- POST `/api/admin/blog/posts/{id}/publish` - Publish

### Templates
- GET `/api/admin/templates` - List
- GET `/api/admin/templates/{id}` - Detail
- POST `/api/admin/templates` - Create
- PUT `/api/admin/templates/{id}` - Update
- POST `/api/admin/templates/{id}/publish` - Publish

### Contacts
- GET `/api/admin/contacts` - List
- PUT `/api/admin/contacts/{id}/status` - Update status
- PUT `/api/admin/contacts/{id}/notes` - Update notes

---

## 🎨 Color Accent Bars (Visual Enhancement)

Add colored bars to section headers:

```tsx
<h2 className="flex items-center gap-2">
  <div className="w-1 h-6 bg-sky-500 rounded-full"></div>
  Basic Information
</h2>

<h2 className="flex items-center gap-2">
  <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
  Content
</h2>

<h2 className="flex items-center gap-2">
  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
  Media
</h2>
```

---

## 🔧 Troubleshooting

**Animation không chạy:**
1. Check globals.css đã import chưa
2. Verify class names đúng
3. Check z-index conflicts

**API mapping errors:**
1. Check backend DTO structure
2. Verify field names match exactly
3. Check data types (string vs Guid, etc.)

**TypeScript errors:**
1. Update types in `admin/src/types/api.ts`
2. Sync with backend DTOs
3. Check enum values match

---

## 📚 Resources

- **Animations:** `admin/src/styles/globals.css`
- **SlidingPanel:** `admin/src/components/common/SlidingPanel.tsx`
- **Blog Editor:** `admin/src/features/blog/BlogEditPage.tsx`
- **Backend DTOs:** `KWingX.Backend/src/KWingX.Application/DTOs/`

---

Enjoy smooth animations and reliable API integration! 🎉

