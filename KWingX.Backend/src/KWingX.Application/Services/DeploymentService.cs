using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Services;

public class DeploymentService : IDeploymentService
{
    private readonly IUnitOfWork _unitOfWork;

    public DeploymentService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    #region Targets
    public async Task<List<DeploymentTarget>> GetTargetsAsync()
    {
        return await _unitOfWork.DeploymentTargets.ListAsync();
    }

    public async Task<DeploymentTarget?> GetTargetByIdAsync(Guid id)
    {
        return await _unitOfWork.DeploymentTargets.GetByIdAsync(id);
    }

    public async Task<DeploymentTarget> CreateTargetAsync(DeploymentTarget target)
    {
        await _unitOfWork.DeploymentTargets.AddAsync(target);
        await _unitOfWork.SaveChangesAsync();
        return target;
    }

    public async Task UpdateTargetAsync(Guid id, DeploymentTarget target)
    {
        var existing = await _unitOfWork.DeploymentTargets.GetByIdAsync(id);
        if (existing == null) throw new KeyNotFoundException();

        existing.Name = target.Name;
        existing.Host = target.Host;
        existing.Port = target.Port;
        existing.Username = target.Username;
        existing.Password = target.Password;
        existing.SshKey = target.SshKey;
        existing.BasePath = target.BasePath;
        existing.IsActive = target.IsActive;

        await _unitOfWork.DeploymentTargets.UpdateAsync(existing);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteTargetAsync(Guid id)
    {
        var target = await _unitOfWork.DeploymentTargets.GetByIdAsync(id);
        if (target != null)
        {
            await _unitOfWork.DeploymentTargets.DeleteAsync(target);
            await _unitOfWork.SaveChangesAsync();
        }
    }
    #endregion

    #region Sites
    public async Task<PagedResponse<CustomerSite>> GetSitesAsync(int page, int pageSize)
    {
        var items = await _unitOfWork.CustomerSites.ListAsync();
        var total = items.Count;
        var pagedItems = items.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        return new PagedResponse<CustomerSite> { Items = pagedItems, Total = total, Page = page, PageSize = pageSize };
    }

    public async Task<CustomerSite?> GetSiteByIdAsync(Guid id)
    {
        return await _unitOfWork.CustomerSites.GetByIdAsync(id);
    }

    public async Task RedeploySiteAsync(Guid id)
    {
        await EnqueueJobAsync(id, DeploymentJobType.Redeploy);
    }

    public async Task StopSiteAsync(Guid id)
    {
        await EnqueueJobAsync(id, DeploymentJobType.Stop);
    }

    public async Task StartSiteAsync(Guid id)
    {
        await EnqueueJobAsync(id, DeploymentJobType.Start);
    }

    public async Task RemoveSiteAsync(Guid id)
    {
        await EnqueueJobAsync(id, DeploymentJobType.Remove);
    }

    private async Task EnqueueJobAsync(Guid siteId, DeploymentJobType type)
    {
        var job = new DeploymentJob
        {
            SiteId = siteId,
            Type = type,
            Status = DeploymentStatus.Queued,
            CorrelationId = Guid.NewGuid().ToString()
        };
        await _unitOfWork.DeploymentJobs.AddAsync(job);
        await _unitOfWork.SaveChangesAsync();
    }
    #endregion

    #region Jobs
    public async Task<PagedResponse<DeploymentJob>> GetJobsAsync(int page, int pageSize)
    {
        var items = await _unitOfWork.DeploymentJobs.ListAsync();
        var total = items.Count;
        var pagedItems = items.OrderByDescending(j => j.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize).ToList();

        return new PagedResponse<DeploymentJob> { Items = pagedItems, Total = total, Page = page, PageSize = pageSize };
    }

    public async Task<DeploymentJob?> GetJobByIdAsync(Guid id)
    {
        return await _unitOfWork.DeploymentJobs.GetByIdAsync(id);
    }
    #endregion
}
