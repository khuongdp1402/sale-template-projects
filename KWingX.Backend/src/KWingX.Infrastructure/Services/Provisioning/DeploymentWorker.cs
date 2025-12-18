using KWingX.Application.Interfaces;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Renci.SshNet;

namespace KWingX.Infrastructure.Services.Provisioning;

public class DeploymentWorker : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<DeploymentWorker> _logger;

    public DeploymentWorker(IServiceProvider serviceProvider, ILogger<DeploymentWorker> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Deployment Worker is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await ProcessNextJobAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while processing deployment job");
            }

            await Task.Delay(10000, stoppingToken); // Poll every 10 seconds
        }
    }

    private async Task ProcessNextJobAsync()
    {
        using var scope = _serviceProvider.CreateScope();
        var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

        var job = await unitOfWork.DeploymentJobs.GetNextQueuedJobAsync();
        if (job == null) return;

        _logger.LogInformation("Processing job {JobId} for site {SiteId}", job.Id, job.SiteId);

        job.Status = DeploymentStatus.Running;
        job.StartedAt = DateTime.UtcNow;
        await unitOfWork.SaveChangesAsync();

        try
        {
            await ExecuteDeploymentAsync(job, unitOfWork);
            
            job.Status = DeploymentStatus.Success;
            job.FinishedAt = DateTime.UtcNow;
            job.Site.Status = job.Type switch
            {
                DeploymentJobType.Stop => CustomerSiteStatus.Stopped,
                DeploymentJobType.Remove => CustomerSiteStatus.Removed,
                _ => CustomerSiteStatus.Active
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Job {JobId} failed", job.Id);
            job.Status = DeploymentStatus.Failed;
            job.ErrorMessage = ex.Message;
            job.Site.Status = CustomerSiteStatus.Failed;
            
            await LogSystemMessageAsync(unitOfWork, LogSeverity.Error, $"Deployment failed: {ex.Message}", job.CorrelationId);
        }

        await unitOfWork.SaveChangesAsync();
    }

    private async Task ExecuteDeploymentAsync(DeploymentJob job, IUnitOfWork unitOfWork)
    {
        var target = job.Site.DeploymentTarget;
        var site = job.Site;

        using var client = new SshClient(target.Host, target.Port, target.Username, target.Password ?? "");
        client.Connect();

        string command = "";
        switch (job.Type)
        {
            case DeploymentJobType.Deploy:
            case DeploymentJobType.Redeploy:
                // Mocked docker compose deploy
                var sitePath = $"{target.BasePath}/{site.Subdomain}";
                command = $"mkdir -p {sitePath} && cd {sitePath} && echo 'version: \"3\"' > docker-compose.yml && docker compose up -d";
                break;
            case DeploymentJobType.Stop:
                command = $"cd {target.BasePath}/{site.Subdomain} && docker compose stop";
                break;
            case DeploymentJobType.Start:
                command = $"cd {target.BasePath}/{site.Subdomain} && docker compose start";
                break;
            case DeploymentJobType.Remove:
                command = $"cd {target.BasePath}/{site.Subdomain} && docker compose down && rm -rf {target.BasePath}/{site.Subdomain}";
                break;
        }

        var result = client.RunCommand(command);
        if (result.ExitStatus != 0)
        {
            throw new Exception($"SSH command failed with exit code {result.ExitStatus}: {result.Error}");
        }

        await LogSystemMessageAsync(unitOfWork, LogSeverity.Info, $"Successfully executed {job.Type} for site {site.Subdomain}", job.CorrelationId);
        client.Disconnect();
    }

    private async Task LogSystemMessageAsync(IUnitOfWork unitOfWork, LogSeverity severity, string message, string? correlationId)
    {
        var log = new Log
        {
            Type = LogType.Deploy,
            Severity = severity,
            Message = message,
            CorrelationId = correlationId
        };
        await unitOfWork.Logs.AddAsync(log);
    }
}
