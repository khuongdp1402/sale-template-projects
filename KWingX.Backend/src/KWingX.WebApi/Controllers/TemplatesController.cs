using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Templates;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
    public async Task<ActionResult<PagedResponse<TemplateListItemDto>>> GetList(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 12, 
        [FromQuery] string? search = null,
        [FromQuery] string? category = null, 
        [FromQuery] TemplateType? templateType = null, 
        [FromQuery] Audience? audience = null,
        [FromQuery] decimal? priceMin = null,
        [FromQuery] decimal? priceMax = null,
        [FromQuery] bool? hot = null,
        [FromQuery] bool? isNew = null,
        [FromQuery] bool? popular = null,
        [FromQuery] bool? discount = null,
        [FromQuery] string? sort = null)
    {
        var result = await _templateService.GetPublishedTemplatesAsync(
            page, pageSize, search, category, templateType, audience, priceMin, priceMax, hot, isNew, popular, discount, sort);
        return Ok(result);
    }

    [HttpGet("{idOrSlug}")]
    [AllowAnonymous]
    public async Task<ActionResult<TemplateDto>> GetDetail(string idOrSlug)
    {
        var result = await _templateService.GetTemplateBySlugAsync(idOrSlug);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpGet("{idOrSlug}/media")]
    [AllowAnonymous]
    public async Task<ActionResult<List<TemplateMediaDto>>> GetMedia(string idOrSlug)
    {
        var result = await _templateService.GetTemplateMediaAsync(idOrSlug);
        return Ok(result);
    }

    [HttpGet("{idOrSlug}/customers")]
    [AllowAnonymous]
    public async Task<ActionResult<List<CustomerUseCaseDto>>> GetCustomers(string idOrSlug)
    {
        var result = await _templateService.GetTemplateCustomersAsync(idOrSlug);
        return Ok(result);
    }

    [HttpGet("{idOrSlug}/similar")]
    [AllowAnonymous]
    public async Task<ActionResult<List<TemplateListItemDto>>> GetSimilar(string idOrSlug)
    {
        var result = await _templateService.GetSimilarTemplatesAsync(idOrSlug);
        return Ok(result);
    }
}
