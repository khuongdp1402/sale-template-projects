using KWingX.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace KWingX.Infrastructure.Persistence;

public class SoftDeleteSaveChangesInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        if (eventData.Context is null) return result;
        
        SoftDeleteEntities(eventData.Context);
        UpdateAuditFields(eventData.Context);
        
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        if (eventData.Context is null) return new ValueTask<InterceptionResult<int>>(result);
        
        SoftDeleteEntities(eventData.Context);
        UpdateAuditFields(eventData.Context);
        
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private static void SoftDeleteEntities(DbContext context)
    {
        var entries = context.ChangeTracker.Entries()
            .Where(e => e.Entity is BaseEntity && e.State == EntityState.Deleted);

        var now = DateTime.UtcNow;

        foreach (var entry in entries)
        {
            if (entry.Entity is BaseEntity entity)
            {
                // Convert delete to soft delete
                entry.State = EntityState.Modified;
                entity.IsDeleted = true;
                
                // Set DeletedAt if auditable
                if (entry.Entity is IAuditableEntity auditable)
                {
                    auditable.DeletedAt = now;
                    // DeletedBy should already be set by repository if provided
                }
            }
        }
    }

    private static void UpdateAuditFields(DbContext context)
    {
        var entries = context.ChangeTracker.Entries()
            .Where(e => e.Entity is IAuditableEntity && 
                       (e.State == EntityState.Added || e.State == EntityState.Modified));

        var now = DateTime.UtcNow;

        foreach (var entry in entries)
        {
            if (entry.Entity is IAuditableEntity auditable)
            {
                if (entry.State == EntityState.Added)
                {
                    if (auditable.CreatedAt == default)
                        auditable.CreatedAt = now;
                    // CreatedBy should already be set by repository if provided
                }
                else if (entry.State == EntityState.Modified)
                {
                    auditable.ModifiedAt = now;
                    // ModifiedBy should already be set by repository if provided
                }
            }
        }
    }
}

