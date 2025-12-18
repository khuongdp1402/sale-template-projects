using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Services;

public interface IDeploymentService
{
    // Targets
    Task<List<DeploymentTarget>> GetTargetsAsync();
    Task<DeploymentTarget?> GetTargetByIdAsync(Guid id);
    Task<DeploymentTarget> CreateTargetAsync(DeploymentTarget target);
    Task UpdateTargetAsync(Guid id, DeploymentTarget target);
    Task DeleteTargetAsync(Guid id);

    // Sites
    Task<PagedResponse<CustomerSite>> GetSitesAsync(int page, int pageSize);
    Task<CustomerSite?> GetSiteByIdAsync(Guid id);
    Task RedeploySiteAsync(Guid id);
    Task StopSiteAsync(Guid id);
    Task StartSiteAsync(Guid id);
    Task RemoveSiteAsync(Guid id);

    // Jobs
    Task<PagedResponse<DeploymentJob>> GetJobsAsync(int page, int pageSize);
    Task<DeploymentJob?> GetJobByIdAsync(Guid id);
}

public interface IMonitoringService
{
    Task<object> GetSystemHealthAsync();
    Task<object> GetIncidentsAsync();
    Task<object> GetProvisioningStatsAsync();
}
