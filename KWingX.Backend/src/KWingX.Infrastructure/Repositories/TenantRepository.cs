using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class TenantRepository : BaseRepository<Tenant>, ITenantRepository
{
    public TenantRepository(AppDbContext context, ILoggerFactory loggerFactory) : base(context, loggerFactory)
    {
    }

    public async Task<Tenant?> GetBySubdomainAsync(string subdomain)
    {
        return await _dbSet.FirstOrDefaultAsync(t => t.Subdomain == subdomain && !t.IsDeleted);
    }

    public async Task<Tenant?> GetByCustomDomainAsync(string customDomain)
    {
        return await _dbSet.FirstOrDefaultAsync(t => t.CustomDomain == customDomain && !t.IsDeleted);
    }
}
