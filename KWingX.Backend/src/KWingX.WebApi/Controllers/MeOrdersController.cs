using KWingX.Application.DTOs.Orders;
using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[Authorize]
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/me/orders")]
public class MeOrdersController : ControllerBase
{
    private readonly IPurchaseService _purchaseService;

    public MeOrdersController(IPurchaseService purchaseService)
    {
        _purchaseService = purchaseService;
    }

    [HttpPost("templates/{templateId}")]
    public async Task<ActionResult<OrderDto>> CreateTemplateOrder(Guid templateId)
    {
        var order = await _purchaseService.CreateTemplateOrderAsync(templateId);
        return Ok(order);
    }

    [HttpPost("services/{serviceId}")]
    public async Task<ActionResult<OrderDto>> CreateServiceOrder(Guid serviceId)
    {
        var order = await _purchaseService.CreateServiceOrderAsync(serviceId);
        return Ok(order);
    }
}
