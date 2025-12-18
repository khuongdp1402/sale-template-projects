using KWingX.Application.DTOs.Purchases;
using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<ActionResult<List<PurchaseDto>>> GetMyPurchases()
    {
        var purchases = await _purchaseService.GetMyPurchasesAsync();
        return Ok(purchases);
    }

    [HttpGet("{purchaseId}/license-key")]
    public async Task<ActionResult<LicenseKeyDto>> GetLicenseKey(Guid purchaseId)
    {
        var key = await _purchaseService.GetLicenseKeyAsync(purchaseId);
        if (key == null) return NotFound();
        return Ok(key);
    }

    [HttpPost("{purchaseId}/license-key/revoke")]
    public async Task<ActionResult> RevokeLicenseKey(Guid purchaseId)
    {
        await _purchaseService.RevokeLicenseKeyAsync(purchaseId);
        return NoContent();
    }

    [HttpPost("{purchaseId}/license-key/rotate")]
    public async Task<ActionResult<LicenseKeyDto>> RotateLicenseKey(Guid purchaseId)
    {
        var newKey = await _purchaseService.RotateLicenseKeyAsync(purchaseId);
        return Ok(newKey);
    }
}
