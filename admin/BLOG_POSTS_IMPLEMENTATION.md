# Blog Posts Implementation - Frontend Setup

## Required Packages

Install TipTap and dependencies:

```bash
cd admin
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder
npm install react-color
```

## Component Structure

1. **BlogPostsListPage.tsx** ✅ Created
   - List view with table
   - Search and filter
   - Create/Edit/Delete actions

2. **BlogPostDrawer.tsx** - Right-side drawer
   - Form with all fields
   - TipTap rich editor
   - Image upload integration
   - CTA button configuration

3. **TipTapEditor.tsx** - Wrapper component
   - TipTap editor instance
   - Image drag/drop handler
   - Image paste handler
   - Image upload integration

## Routes

Update `admin/src/app/routes.tsx`:

```tsx
{
  path: 'blog/posts',
  element: <BlogPostsListPage />,
},
```

## API Integration

✅ `admin/src/services/blogApi.ts` - Created with all endpoints

## Next Steps

1. Install TipTap packages
2. Create TipTapEditor component
3. Create BlogPostDrawer component
4. Update routes
5. Test image upload
6. Test create/edit flow

