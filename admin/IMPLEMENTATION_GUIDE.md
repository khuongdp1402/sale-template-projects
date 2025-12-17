# Admin UI Implementation Guide

## ✅ Completed

### Core Infrastructure
- ✅ API Types updated to match backend DTOs (`src/types/api.ts`)
- ✅ Admin API service module created (`src/services/adminApi.ts`)
- ✅ Dashboard page wired to real API endpoints
- ✅ Templates list page updated with filters and real API calls
- ✅ Authorization and API client setup

### Patterns Established

1. **API Service Pattern** (`src/services/adminApi.ts`)
   - Each feature has its own API module (templatesApi, blogApi, etc.)
   - Consistent method names: list, getById, create, update, delete
   - Uses shared apiClient with automatic token attachment

2. **Query Pattern** (TanStack Query)
   ```typescript
   const { data, isLoading } = useQuery({
     queryKey: ['feature', page, filters...],
     queryFn: () => featureApi.list({ page, pageSize, ...filters }),
   });
   ```

3. **Mutation Pattern**
   ```typescript
   const mutation = useMutation({
     mutationFn: (id: string) => featureApi.delete(id),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['feature'] });
     },
   });
   ```

4. **Form Pattern** (react-hook-form + zod)
   ```typescript
   const schema = z.object({ ... });
   const { register, handleSubmit, formState: { errors } } = useForm({
     resolver: zodResolver(schema),
   });
   ```

## 🚧 Remaining Pages to Complete

### High Priority

1. **TemplateEditPage** (`src/features/templates/TemplateEditPage.tsx`)
   - Update to use templatesApi
   - Fix form schema to match backend DTOs
   - Add tabs: Basic, Pricing, Categories/Tags, Media, Customers, Similar
   - Implement media management
   - Implement customer use cases CRUD
   - Implement similar templates selector

2. **Blog Pages** (`src/features/blog/`)
   - BlogListPage: Wire to blogApi.list
   - BlogEditPage: Full form with markdown editor
   - Add publish/unpublish actions

3. **Landing Sections** (`src/features/landing/LandingSectionsPage.tsx`)
   - Wire to landingApi
   - Add create/edit modal
   - Implement reorder functionality

4. **Users Page** (`src/features/users/UsersPage.tsx`)
   - Wire to usersApi
   - Add filters (role, status)
   - Add user detail drawer
   - Implement role management
   - Implement status toggle

5. **Orders Page** (`src/features/orders/OrdersPage.tsx`)
   - Wire to ordersApi
   - Add filters (status, date range)
   - Add order detail page
   - Implement status update

6. **Payments Page** (`src/features/payments/PaymentsPage.tsx`)
   - Wire to paymentsApi
   - Add filters
   - Add payment detail drawer

7. **Contacts Page** (`src/features/contacts/ContactsPage.tsx`)
   - Wire to contactsApi
   - Add status filter
   - Add contact detail panel
   - Implement notes editor

8. **Logs Page** (`src/features/logs/LogsPage.tsx`)
   - Wire to logsApi
   - Add filters (type, severity, date range)
   - Add log detail drawer with JSON viewer

9. **Monitoring Page** (`src/features/monitoring/MonitoringPage.tsx`)
   - Wire to monitoringApi
   - Display health tiles
   - Show recent incidents

10. **Deploy Page** (`src/features/deploy/DeployPage.tsx`)
    - Wire to deploymentsApi
    - Add trigger deploy action
    - Add rollback action
    - Show deployment logs

## 📝 Implementation Checklist for Each Page

- [ ] Import adminApi service
- [ ] Use useQuery for list/get operations
- [ ] Use useMutation for create/update/delete
- [ ] Add filters (search, dropdowns)
- [ ] Add pagination
- [ ] Add loading states (skeleton)
- [ ] Add empty state
- [ ] Add error handling
- [ ] Add toast notifications on success/error
- [ ] Add confirm dialogs for destructive actions
- [ ] Ensure dark/light mode works
- [ ] Add SEO component with noindex
- [ ] Test with real API endpoints

## 🔧 Common Components to Use

- `PageHeader` - Title + actions
- `Input` - Text inputs
- `Button` - Actions
- `Table` - Data tables
- `Badge` - Status indicators
- `Card` - Containers
- `Modal` - Dialogs
- `ConfirmDialog` - Confirmation dialogs
- `EmptyState` - Empty states
- `SEO` - Meta tags (with noindex)

## 📚 Example: Complete Page Implementation

See `src/features/templates/TemplatesListPage.tsx` for a complete example of:
- API integration
- Filters
- Pagination
- Mutations
- Confirm dialogs
- Empty states

## 🚀 Next Steps

1. Complete TemplateEditPage with all tabs
2. Complete Blog pages
3. Complete remaining admin pages following the established patterns
4. Add toast notifications (create toast component if missing)
5. Test all pages with backend API
6. Add loading skeletons for better UX

