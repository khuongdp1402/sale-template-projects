using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.MasterData;
using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class MasterDataController : ControllerBase
{
    private readonly IMasterDataService _masterDataService;

    public MasterDataController(IMasterDataService masterDataService)
    {
        _masterDataService = masterDataService;
    }

    [HttpGet("categories")]
    [AllowAnonymous]
    public async Task<ActionResult<PagedResponse<CategoryDto>>> GetCategories([FromQuery] int page = 1, [FromQuery] int pageSize = 100)
    {
        var result = await _masterDataService.GetCategoriesAsync(page, pageSize, onlyActive: true);
        return Ok(result);
    }

    [HttpGet("tags")]
    [AllowAnonymous]
    public async Task<ActionResult<PagedResponse<TagDto>>> GetTags([FromQuery] int page = 1, [FromQuery] int pageSize = 100)
    {
        var result = await _masterDataService.GetTagsAsync(page, pageSize, onlyActive: true);
        return Ok(result);
    }

    [HttpGet("services")]
    [AllowAnonymous]
    public async Task<ActionResult<PagedResponse<ServiceDto>>> GetServices(
        [FromQuery] string? category = null, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10)
    {
        var result = await _masterDataService.GetServicesAsync(page, pageSize, category, onlyActive: true);
        return Ok(result);
    }

    [HttpGet("services/{slug}")]
    [AllowAnonymous]
    public async Task<ActionResult<ServiceDto>> GetServiceBySlug(string slug)
    {
        var result = await _masterDataService.GetServiceBySlugAsync(slug);
        if (result == null) return NotFound();
        return Ok(result);
    }
}
