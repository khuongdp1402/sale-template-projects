# Database Migration Guide

## Create Migration

To create a new migration for all the new entities and changes:

```bash
cd src/KWingX.Infrastructure
dotnet ef migrations add AddAdminEntities --startup-project ../KWingX.WebApi
```

## Apply Migration

Migrations are automatically applied on startup (see `Program.cs`).

To manually apply:

```bash
cd src/KWingX.WebApi
dotnet ef database update
```

## Migration Includes

The migration will include:

1. **New Entities:**
   - UserRole (many-to-many with User)
   - Order and OrderItem
   - Payment
   - ContactRequest
   - Log
   - Deployment

2. **Updated Entities:**
   - User: Added RolesCsv and UserRoles navigation
   - Template: Added Status and FeaturesCsv
   - BlogPost: Added Status
   - TemplateMedia: Fixed MediaType enum

3. **Indexes:**
   - Log: (Type, CreatedAt), (Severity)
   - ContactRequest: (Status, CreatedAt)
   - Payment: (Status, CreatedAt)
   - Order: (Status, CreatedAt)

4. **Many-to-Many:**
   - TemplateSimilar (self-referencing many-to-many for similar templates)

## Verify Migration

After migration, verify tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected tables:
- Users
- UserRoles
- Templates
- TemplateCategories
- TemplateTags
- TemplateMedia
- CustomerUseCases
- TemplateSimilar (junction table)
- BlogPosts
- LandingSections
- Orders
- OrderItems
- Payments
- ContactRequests
- Logs
- Deployments
- Purchases
- LicenseKeys
- Services
- ApiKeys

