using KWingX.Application.Features.Templates.DTOs;
using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class TemplatesController : ControllerBase
{
    private readonly ITemplateService _templateService;

    public TemplatesController(ITemplateService templateService)
    {
        _templateService = templateService;
    }

    [HttpGet]
    public async Task<ActionResult> GetList(
        [FromQuery] string? category,
        [FromQuery] string? type,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12)
    {
        var result = await _templateService.GetListAsync(category, type, page, pageSize);
        return Ok(result);
    }

    [HttpGet("{idOrSlug}")]
    public async Task<ActionResult<TemplateDetailDto>> GetDetail(string idOrSlug)
    {
        var result = await _templateService.GetDetailAsync(idOrSlug);
        if (result == null) return NotFound();
        return Ok(result);
    }
}
