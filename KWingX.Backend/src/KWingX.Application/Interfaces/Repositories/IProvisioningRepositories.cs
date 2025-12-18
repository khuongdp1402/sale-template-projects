using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces.Repositories;

public interface IDeploymentTargetRepository : IRepository<DeploymentTarget> { }

public interface ICustomerSiteRepository : IRepository<CustomerSite>
{
    Task<List<CustomerSite>> GetByUserIdAsync(Guid userId);
}

public interface IDeploymentJobRepository : IRepository<DeploymentJob>
{
    Task<DeploymentJob?> GetNextQueuedJobAsync();
}
