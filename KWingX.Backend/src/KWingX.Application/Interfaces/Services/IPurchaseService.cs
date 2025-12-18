using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Orders;
using KWingX.Application.DTOs.Purchases;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Services;

public interface IPurchaseService
{
    // Portal - Orders
    Task<OrderDto> CreateTemplateOrderAsync(Guid templateId);
    Task<OrderDto> CreateServiceOrderAsync(Guid serviceId);
    
    // Portal - Purchases
    Task<List<PurchaseDto>> GetMyPurchasesAsync();
    Task<LicenseKeyDto?> GetLicenseKeyAsync(Guid purchaseId);
    Task RevokeLicenseKeyAsync(Guid purchaseId);
    Task<LicenseKeyDto> RotateLicenseKeyAsync(Guid purchaseId);

    // Admin - Orders
    Task<PagedResponse<OrderDto>> GetAdminOrdersAsync(int page, int pageSize, OrderStatus? status = null, string? search = null);
    Task<OrderDto?> GetOrderByIdAsync(Guid id);
    Task UpdateOrderStatusAsync(Guid id, OrderStatus status);
}
