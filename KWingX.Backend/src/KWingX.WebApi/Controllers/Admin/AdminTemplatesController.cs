using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Templates;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Enums;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/templates")]
[Authorize(Policy = AuthorizationPolicies.TemplatesWrite)]
[Tags("Admin - Templates")]
public class AdminTemplatesController : ControllerBase
{
    private readonly ITemplateService _templateService;

    public AdminTemplatesController(ITemplateService templateService)
    {
        _templateService = templateService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<TemplateDto>>> GetList(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? category = null,
        [FromQuery] TemplateType? type = null,
        [FromQuery] Audience? audience = null,
        [FromQuery] TemplateStatus? status = null)
    {
        var result = await _templateService.GetAdminTemplatesAsync(page, pageSize, search, category, type, audience, status);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TemplateDto>> GetById(Guid id)
    {
        var result = await _templateService.GetTemplateByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<TemplateDto>> Create([FromBody] CreateTemplateRequest request)
    {
        var result = await _templateService.CreateTemplateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] CreateTemplateRequest request)
    {
        await _templateService.UpdateTemplateAsync(id, request);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _templateService.DeleteTemplateAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/publish")]
    public async Task<ActionResult> Publish(Guid id)
    {
        await _templateService.PublishTemplateAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/unpublish")]
    public async Task<ActionResult> Unpublish(Guid id)
    {
        await _templateService.UnpublishTemplateAsync(id);
        return NoContent();
    }

    [HttpPut("{id}/media")]
    public async Task<ActionResult> UpdateMedia(Guid id, [FromBody] List<TemplateMediaDto> media)
    {
        await _templateService.UpdateTemplateMediaAsync(id, media);
        return NoContent();
    }

    [HttpPut("{id}/customers")]
    public async Task<ActionResult> UpdateCustomers(Guid id, [FromBody] List<CustomerUseCaseDto> customers)
    {
        await _templateService.UpdateTemplateCustomersAsync(id, customers);
        return NoContent();
    }

    [HttpPut("{id}/similar")]
    public async Task<ActionResult> UpdateSimilar(Guid id, [FromBody] List<Guid> similarIds)
    {
        await _templateService.UpdateSimilarTemplatesAsync(id, similarIds);
        return NoContent();
    }

    [HttpPost("{id}/restore")]
    public async Task<ActionResult> Restore(Guid id)
    {
        await _templateService.RestoreTemplateAsync(id);
        return NoContent();
    }
}
