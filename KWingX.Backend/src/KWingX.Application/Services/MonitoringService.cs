using KWingX.Application.Interfaces;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Enums;

namespace KWingX.Application.Services;

public class MonitoringService : IMonitoringService
{
    private readonly IUnitOfWork _unitOfWork;

    public MonitoringService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Task<object> GetSystemHealthAsync()
    {
        // Mocked for phase 1
        return Task.FromResult<object>(new
        {
            Status = "Healthy",
            Services = new[]
            {
                new { Name = "Database", Status = "Online" },
                new { Name = "SSH-Worker", Status = "Running" },
                new { Name = "Redis", Status = "Online" }
            },
            Timestamp = DateTime.UtcNow
        });
    }

    public async Task<object> GetIncidentsAsync()
    {
        var logs = await _unitOfWork.Logs.GetListAsync(1, 10, severity: LogSeverity.Error);
        return logs.Items;
    }

    public async Task<object> GetProvisioningStatsAsync()
    {
        var sites = await _unitOfWork.CustomerSites.ListAsync();
        var jobs = await _unitOfWork.DeploymentJobs.ListAsync();

        return new
        {
            TotalSites = sites.Count,
            ActiveSites = sites.Count(s => s.Status == Domain.Entities.CustomerSiteStatus.Active),
            PendingJobs = jobs.Count(j => j.Status == DeploymentStatus.Queued),
            FailedJobs = jobs.Count(j => j.Status == DeploymentStatus.Failed)
        };
    }
}
