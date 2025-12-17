# K-WingX Backend API Endpoints

## Portal APIs (Public/Consumer)

### Templates
- `GET /api/templates` - List templates with filters
- `GET /api/templates/{idOrSlug}` - Get template detail
- `GET /api/templates/{idOrSlug}/media` - Get template media
- `GET /api/templates/{idOrSlug}/customers` - Get customer use cases
- `GET /api/templates/{idOrSlug}/similar` - Get similar templates

### Blog
- `GET /api/blog/posts` - List blog posts
- `GET /api/blog/posts/{slug}` - Get blog post detail
- `GET /api/blog/categories` - Get categories
- `GET /api/blog/featured` - Get featured posts
- `GET /api/blog/trending?limit=5` - Get trending posts
- `GET /api/blog/guides` - Get guide posts

### Landing
- `GET /api/landing/sections` - Get landing sections

### Services
- `GET /api/services` - List services
- `GET /api/services/{slug}` - Get service detail

### Contacts
- `POST /api/contacts` - Submit contact request

### Auth (Existing)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `GET /api/auth/me`
- `PUT /api/auth/profile`
- `PUT /api/auth/change-password`

### Purchases & Keys
- `GET /api/me/purchases`
- `POST /api/me/purchases/templates/{templateId}`
- `POST /api/me/purchases/services/{serviceId}`
- `GET /api/me/purchases/{purchaseId}/license-key`
- `POST /api/me/purchases/{purchaseId}/license-key/revoke`
- `POST /api/me/purchases/{purchaseId}/license-key/rotate`

### API Access
- `GET /api/me/api-key`
- `POST /api/me/api-key/rotate`
- `POST /api/me/api-key/revoke`
- `GET /api/me/api-connection-info`
- `GET /api/docs/summary`

## Admin APIs (Protected with [Authorize])

### Templates Admin
- `GET /api/admin/templates` - List with admin filters
- `GET /api/admin/templates/{id}` - Get detail
- `POST /api/admin/templates` - Create
- `PUT /api/admin/templates/{id}` - Update
- `DELETE /api/admin/templates/{id}` - Delete
- `POST /api/admin/templates/{id}/publish` - Publish
- `POST /api/admin/templates/{id}/unpublish` - Unpublish
- `POST /api/admin/templates/{id}/media` - Add/replace media
- `DELETE /api/admin/templates/{id}/media/{mediaId}` - Delete media
- `PUT /api/admin/templates/{id}/similar` - Set similar templates
- `PUT /api/admin/templates/{id}/customers` - Replace customers

### Blog Admin
- `GET /api/admin/blog/posts`
- `GET /api/admin/blog/posts/{id}`
- `POST /api/admin/blog/posts`
- `PUT /api/admin/blog/posts/{id}`
- `DELETE /api/admin/blog/posts/{id}`
- `POST /api/admin/blog/posts/{id}/publish`
- `POST /api/admin/blog/posts/{id}/unpublish`

### Landing Sections Admin
- `GET /api/admin/landing/sections`
- `PUT /api/admin/landing/sections/{id}`
- `POST /api/admin/landing/sections`
- `DELETE /api/admin/landing/sections/{id}`
- `PUT /api/admin/landing/sections/reorder`

### Users Admin
- `GET /api/admin/users`
- `GET /api/admin/users/{id}`
- `PUT /api/admin/users/{id}/roles`
- `PUT /api/admin/users/{id}/status`
- `POST /api/admin/users/{id}/reset-password`

### Orders Admin
- `GET /api/admin/orders`
- `GET /api/admin/orders/{id}`
- `PUT /api/admin/orders/{id}/status`
- `POST /api/admin/orders/{id}/notes`

### Payments Admin
- `GET /api/admin/payments`
- `GET /api/admin/payments/{id}`
- `GET /api/admin/payments/failures`

### Contacts Admin
- `GET /api/admin/contacts`
- `GET /api/admin/contacts/{id}`
- `PUT /api/admin/contacts/{id}/status`
- `PUT /api/admin/contacts/{id}/notes`

### Logs Admin
- `GET /api/admin/logs`
- `GET /api/admin/logs/{id}`

### Monitoring Admin
- `GET /api/admin/monitoring/health`
- `GET /api/admin/monitoring/webhooks`
- `GET /api/admin/monitoring/jobs`
- `GET /api/admin/monitoring/incidents`

### Deploy Admin
- `GET /api/admin/deployments`
- `GET /api/admin/deployments/{id}`
- `POST /api/admin/deployments/trigger`
- `POST /api/admin/deployments/{id}/rollback`

## Authorization Policies

- `TemplatesWrite`: SuperAdmin, Admin, Editor
- `BlogWrite`: SuperAdmin, Admin, Editor
- `LandingWrite`: SuperAdmin, Admin, Editor
- `UsersManage`: SuperAdmin, Admin
- `OrdersManage`: SuperAdmin, Admin, Support
- `PaymentsView`: SuperAdmin, Admin, Finance
- `DeployOps`: SuperAdmin, Admin, Ops
- `LogsView`: SuperAdmin, Admin, Ops, Finance, Support
- `MonitoringView`: SuperAdmin, Admin, Ops

