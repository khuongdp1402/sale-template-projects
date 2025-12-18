using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/logs")]
[Authorize(Policy = AuthorizationPolicies.LogsView)]
[Tags("Admin - Logs")]
public class AdminLogController : ControllerBase
{
    private readonly ILogRepository _logRepository;

    public AdminLogController(ILogRepository logRepository)
    {
        _logRepository = logRepository;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<Log>>> GetLogs(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] LogType? type = null,
        [FromQuery] LogSeverity? severity = null,
        [FromQuery] string? search = null)
    {
        var result = await _logRepository.GetListAsync(page, pageSize, type, severity, search: search);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Log>> GetById(Guid id)
    {
        var result = await _logRepository.GetByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }
}
