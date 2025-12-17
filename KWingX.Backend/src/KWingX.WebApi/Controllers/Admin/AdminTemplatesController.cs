using KWingX.Application.Common.Models;
using KWingX.Application.Features.Templates.DTOs;
using KWingX.WebApi.Authorization;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/templates")]
[Authorize]
[Authorize(Policy = AuthorizationPolicies.TemplatesWrite)]
[Tags("Admin - Templates")]
public class AdminTemplatesController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminTemplatesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<TemplateListItemDto>>> GetList(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? category = null,
        [FromQuery] string? type = null,
        [FromQuery] string? audience = null,
        [FromQuery] string? status = null)
    {
        // TODO: Implement GetAdminTemplatesListQuery
        return Ok(new PagedResponse<TemplateListItemDto>
        {
            Page = page,
            PageSize = pageSize,
            Total = 0,
            Items = new List<TemplateListItemDto>()
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TemplateDetailDto>> GetById(Guid id)
    {
        // TODO: Implement GetAdminTemplateByIdQuery
        return NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<TemplateDetailDto>> Create([FromBody] object createCommand)
    {
        // TODO: Implement CreateTemplateCommand
        return BadRequest("Not implemented yet");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TemplateDetailDto>> Update(Guid id, [FromBody] object updateCommand)
    {
        // TODO: Implement UpdateTemplateCommand
        return BadRequest("Not implemented yet");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        // TODO: Implement DeleteTemplateCommand
        return BadRequest("Not implemented yet");
    }

    [HttpPost("{id}/publish")]
    public async Task<ActionResult> Publish(Guid id)
    {
        // TODO: Implement PublishTemplateCommand
        return BadRequest("Not implemented yet");
    }

    [HttpPost("{id}/unpublish")]
    public async Task<ActionResult> Unpublish(Guid id)
    {
        // TODO: Implement UnpublishTemplateCommand
        return BadRequest("Not implemented yet");
    }
}

