using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Common;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class BaseRepository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<T> _dbSet;
    protected readonly ILogger<BaseRepository<T>> _logger;

    public BaseRepository(AppDbContext context, ILoggerFactory loggerFactory)
    {
        _context = context;
        _dbSet = context.Set<T>();
        _logger = loggerFactory.CreateLogger<BaseRepository<T>>();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(e => e.Id == id);
    }

    public virtual async Task<List<T>> ListAsync(bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.AsNoTracking().ToListAsync();
    }

    public virtual async Task AddAsync(T entity, string? createdBy = null)
    {
        if (entity is IAuditableEntity auditable && !string.IsNullOrEmpty(createdBy))
        {
            auditable.CreatedBy = createdBy;
        }
        
        await _dbSet.AddAsync(entity);
    }

    public virtual Task DeleteAsync(T entity, string? deletedBy = null)
    {
        if (entity is IAuditableEntity auditable && !string.IsNullOrEmpty(deletedBy))
        {
            auditable.DeletedBy = deletedBy;
        }
        
        // Remove will be intercepted by SoftDeleteSaveChangesInterceptor
        _dbSet.Remove(entity);
        return Task.CompletedTask;
    }

    public virtual Task UpdateAsync(T entity, string? modifiedBy = null)
    {
        if (entity is IAuditableEntity auditable && !string.IsNullOrEmpty(modifiedBy))
        {
            auditable.ModifiedBy = modifiedBy;
        }
        
        _dbSet.Update(entity);
        return Task.CompletedTask;
    }

    public virtual async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}

