using KWingX.Application.Features.Templates.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TemplatesController : ControllerBase
{
    private readonly IMediator _mediator;

    public TemplatesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<TemplateDto>>> GetList([FromQuery] GetTemplatesQuery query)
    {
        return Ok(await _mediator.Send(query));
    }

    [HttpGet("{idOrSlug}")]
    public async Task<ActionResult<TemplateDto>> GetDetail(string idOrSlug)
    {
        var result = await _mediator.Send(new GetTemplateDetailQuery(idOrSlug));
        if (result == null) return NotFound();
        return Ok(result);
    }
}
