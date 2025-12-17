using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KWingX.WebApi.Controllers;

[Authorize]
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/me/purchases")]
public class PurchasesController : ControllerBase
{
    private readonly IPurchaseService _purchaseService;

    public PurchasesController(IPurchaseService purchaseService)
    {
        _purchaseService = purchaseService;
    }

    [HttpGet]
    public async Task<ActionResult> GetMyPurchases()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var purchases = await _purchaseService.GetByUserIdAsync(userId);
        return Ok(purchases);
    }

    [HttpPost("templates/{templateId}")]
    public async Task<ActionResult<Guid>> PurchaseTemplate(Guid templateId)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        try
        {
            // TODO: Implement purchase creation logic in service
            // For now, return placeholder
            return BadRequest(new { message = "Purchase creation not yet implemented in service" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{purchaseId}/license-key/rotate")]
    public async Task<ActionResult> RotateLicenseKey(Guid purchaseId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        try
        {
            var newKey = await _purchaseService.RotateLicenseKeyAsync(purchaseId, userId);
            return Ok(newKey);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
