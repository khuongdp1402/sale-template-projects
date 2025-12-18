using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class DeploymentTargetRepository : BaseRepository<DeploymentTarget>, IDeploymentTargetRepository
{
    public DeploymentTargetRepository(AppDbContext context, ILoggerFactory loggerFactory) : base(context, loggerFactory) { }
}

public class CustomerSiteRepository : BaseRepository<CustomerSite>, ICustomerSiteRepository
{
    public CustomerSiteRepository(AppDbContext context, ILoggerFactory loggerFactory) : base(context, loggerFactory) { }

    public async Task<List<CustomerSite>> GetByUserIdAsync(Guid userId)
    {
        return await _dbSet
            .Include(s => s.Template)
            .Include(s => s.DeploymentTarget)
            .Where(s => s.UserId == userId)
            .ToListAsync();
    }

    public override async Task<CustomerSite?> GetByIdAsync(Guid id, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(s => s.Template)
            .Include(s => s.DeploymentTarget)
            .AsQueryable();

        if (includeDeleted)
            query = query.IgnoreQueryFilters();

        return await query.FirstOrDefaultAsync(s => s.Id == id);
    }
}

public class DeploymentJobRepository : BaseRepository<DeploymentJob>, IDeploymentJobRepository
{
    public DeploymentJobRepository(AppDbContext context, ILoggerFactory loggerFactory) : base(context, loggerFactory) { }

    public async Task<DeploymentJob?> GetNextQueuedJobAsync()
    {
        return await _dbSet
            .Include(j => j.Site)
            .ThenInclude(s => s.Template)
            .Include(j => j.Site)
            .ThenInclude(s => s.DeploymentTarget)
            .Where(j => j.Status == DeploymentStatus.Queued)
            .OrderBy(j => j.CreatedAt)
            .FirstOrDefaultAsync();
    }
}
