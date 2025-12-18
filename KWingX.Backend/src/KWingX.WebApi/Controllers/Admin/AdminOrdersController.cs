using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Orders;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Enums;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/orders")]
[Authorize(Policy = AuthorizationPolicies.OrdersManage)]
[Tags("Admin - Orders")]
public class AdminOrdersController : ControllerBase
{
    private readonly IPurchaseService _purchaseService;

    public AdminOrdersController(IPurchaseService purchaseService)
    {
        _purchaseService = purchaseService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<OrderDto>>> GetList(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] OrderStatus? status = null,
        [FromQuery] string? search = null)
    {
        var result = await _purchaseService.GetAdminOrdersAsync(page, pageSize, status, search);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetById(Guid id)
    {
        var result = await _purchaseService.GetOrderByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPut("{id}/status")]
    public async Task<ActionResult> UpdateStatus(Guid id, [FromBody] UpdateOrderStatusRequest request)
    {
        await _purchaseService.UpdateOrderStatusAsync(id, request.Status);
        return NoContent();
    }
}
