using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.MasterData;
using KWingX.Application.Interfaces.Services;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/[controller]")]
[Authorize(Policy = AuthorizationPolicies.TemplatesWrite)] // Master data management fits here or a new policy
[Tags("Admin - Master Data")]
public class AdminMasterDataController : ControllerBase
{
    private readonly IMasterDataService _masterDataService;

    public AdminMasterDataController(IMasterDataService masterDataService)
    {
        _masterDataService = masterDataService;
    }

    #region Categories
    [HttpGet("categories")]
    public async Task<ActionResult<PagedResponse<CategoryDto>>> GetCategories([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _masterDataService.GetCategoriesAsync(page, pageSize, onlyActive: false);
        return Ok(result);
    }

    [HttpPost("categories")]
    public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CreateCategoryRequest request)
    {
        var result = await _masterDataService.CreateCategoryAsync(request);
        return Ok(result);
    }

    [HttpPut("categories/{id}")]
    public async Task<ActionResult> UpdateCategory(Guid id, [FromBody] CreateCategoryRequest request)
    {
        await _masterDataService.UpdateCategoryAsync(id, request);
        return NoContent();
    }

    [HttpDelete("categories/{id}")]
    public async Task<ActionResult> DeleteCategory(Guid id)
    {
        await _masterDataService.DeleteCategoryAsync(id);
        return NoContent();
    }
    #endregion

    #region Tags
    [HttpGet("tags")]
    public async Task<ActionResult<PagedResponse<TagDto>>> GetTags([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _masterDataService.GetTagsAsync(page, pageSize, onlyActive: false);
        return Ok(result);
    }

    [HttpPost("tags")]
    public async Task<ActionResult<TagDto>> CreateTag([FromBody] CreateTagRequest request)
    {
        var result = await _masterDataService.CreateTagAsync(request);
        return Ok(result);
    }

    [HttpPut("tags/{id}")]
    public async Task<ActionResult> UpdateTag(Guid id, [FromBody] CreateTagRequest request)
    {
        await _masterDataService.UpdateTagAsync(id, request);
        return NoContent();
    }

    [HttpDelete("tags/{id}")]
    public async Task<ActionResult> DeleteTag(Guid id)
    {
        await _masterDataService.DeleteTagAsync(id);
        return NoContent();
    }
    #endregion

    #region Services
    [HttpGet("services")]
    public async Task<ActionResult<PagedResponse<ServiceDto>>> GetServices(
        [FromQuery] string? category = null, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10)
    {
        var result = await _masterDataService.GetServicesAsync(page, pageSize, category, onlyActive: false);
        return Ok(result);
    }

    [HttpPost("services")]
    public async Task<ActionResult<ServiceDto>> CreateService([FromBody] CreateServiceRequest request)
    {
        var result = await _masterDataService.CreateServiceAsync(request);
        return Ok(result);
    }

    [HttpPut("services/{id}")]
    public async Task<ActionResult> UpdateService(Guid id, [FromBody] CreateServiceRequest request)
    {
        await _masterDataService.UpdateServiceAsync(id, request);
        return NoContent();
    }

    [HttpDelete("services/{id}")]
    public async Task<ActionResult> DeleteService(Guid id)
    {
        await _masterDataService.DeleteServiceAsync(id);
        return NoContent();
    }
    #endregion
}
