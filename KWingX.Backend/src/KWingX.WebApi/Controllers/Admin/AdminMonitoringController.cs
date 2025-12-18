using KWingX.Application.Interfaces.Services;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/monitoring")]
[Authorize(Policy = AuthorizationPolicies.MonitoringView)]
[Tags("Admin - Monitoring")]
public class AdminMonitoringController : ControllerBase
{
    private readonly IMonitoringService _monitoringService;

    public AdminMonitoringController(IMonitoringService monitoringService)
    {
        _monitoringService = monitoringService;
    }

    [HttpGet("health")]
    public async Task<IActionResult> GetHealth()
    {
        var result = await _monitoringService.GetSystemHealthAsync();
        return Ok(result);
    }

    [HttpGet("incidents")]
    public async Task<IActionResult> GetIncidents()
    {
        var result = await _monitoringService.GetIncidentsAsync();
        return Ok(result);
    }

    [HttpGet("provisioning")]
    public async Task<IActionResult> GetProvisioningStats()
    {
        var result = await _monitoringService.GetProvisioningStatsAsync();
        return Ok(result);
    }
}
