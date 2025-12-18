using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces.Repositories;

public interface ITenantRepository : IRepository<Tenant>
{
    Task<Tenant?> GetBySubdomainAsync(string subdomain);
    Task<Tenant?> GetByCustomDomainAsync(string customDomain);
}
