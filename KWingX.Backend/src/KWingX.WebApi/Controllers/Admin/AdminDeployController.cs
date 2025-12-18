using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/deploy")]
[Authorize(Policy = AuthorizationPolicies.DeployOps)]
[Tags("Admin - Deployment")]
public class AdminDeployController : ControllerBase
{
    private readonly IDeploymentService _deployService;

    public AdminDeployController(IDeploymentService deployService)
    {
        _deployService = deployService;
    }

    #region Targets
    [HttpGet("targets")]
    public async Task<ActionResult<List<DeploymentTarget>>> GetTargets()
    {
        var result = await _deployService.GetTargetsAsync();
        return Ok(result);
    }

    [HttpPost("targets")]
    public async Task<ActionResult<DeploymentTarget>> CreateTarget([FromBody] DeploymentTarget target)
    {
        var result = await _deployService.CreateTargetAsync(target);
        return Ok(result);
    }

    [HttpPut("targets/{id}")]
    public async Task<ActionResult> UpdateTarget(Guid id, [FromBody] DeploymentTarget target)
    {
        await _deployService.UpdateTargetAsync(id, target);
        return NoContent();
    }

    [HttpDelete("targets/{id}")]
    public async Task<ActionResult> DeleteTarget(Guid id)
    {
        await _deployService.DeleteTargetAsync(id);
        return NoContent();
    }
    #endregion

    #region Sites
    [HttpGet("sites")]
    public async Task<ActionResult<PagedResponse<CustomerSite>>> GetSites([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _deployService.GetSitesAsync(page, pageSize);
        return Ok(result);
    }

    [HttpGet("sites/{id}")]
    public async Task<ActionResult<CustomerSite>> GetSiteById(Guid id)
    {
        var result = await _deployService.GetSiteByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost("sites/{id}/redeploy")]
    public async Task<ActionResult> RedeploySite(Guid id)
    {
        await _deployService.RedeploySiteAsync(id);
        return NoContent();
    }

    [HttpPost("sites/{id}/stop")]
    public async Task<ActionResult> StopSite(Guid id)
    {
        await _deployService.StopSiteAsync(id);
        return NoContent();
    }

    [HttpPost("sites/{id}/start")]
    public async Task<ActionResult> StartSite(Guid id)
    {
        await _deployService.StartSiteAsync(id);
        return NoContent();
    }

    [HttpPost("sites/{id}/remove")]
    public async Task<ActionResult> RemoveSite(Guid id)
    {
        await _deployService.RemoveSiteAsync(id);
        return NoContent();
    }
    #endregion

    #region Jobs
    [HttpGet("jobs")]
    public async Task<ActionResult<PagedResponse<DeploymentJob>>> GetJobs([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _deployService.GetJobsAsync(page, pageSize);
        return Ok(result);
    }

    [HttpGet("jobs/{id}")]
    public async Task<ActionResult<DeploymentJob>> GetJobById(Guid id)
    {
        var result = await _deployService.GetJobByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }
    #endregion
}
