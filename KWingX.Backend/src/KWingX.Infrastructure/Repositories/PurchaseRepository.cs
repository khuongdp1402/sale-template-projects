using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class PurchaseRepository : BaseRepository<Purchase>, IPurchaseRepository
{
    public PurchaseRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<List<Purchase>> GetByUserIdAsync(Guid userId, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(p => p.LicenseKeys)
            .Where(p => p.UserId == userId)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query
            .OrderByDescending(p => p.PurchasedAt)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Purchase?> GetByIdWithLicenseKeysAsync(Guid id)
    {
        return await _dbSet
            .Include(p => p.LicenseKeys)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public override async Task<Purchase?> GetByIdAsync(Guid id, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(p => p.LicenseKeys)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(p => p.Id == id);
    }
}


