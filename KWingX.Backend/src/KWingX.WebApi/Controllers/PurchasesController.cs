using KWingX.Application.Features.Purchases.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KWingX.WebApi.Controllers;

[Authorize]
[ApiController]
[Route("api/me/purchases")]
public class PurchasesController : ControllerBase
{
    private readonly IMediator _mediator;

    public PurchasesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("templates/{templateId}")]
    public async Task<ActionResult<Guid>> PurchaseTemplate(Guid templateId)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        try
        {
            var purchaseId = await _mediator.Send(new PurchaseTemplateCommand(userId, templateId));
            return Ok(new { purchaseId });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
