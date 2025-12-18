using System.Security.Claims;
using KWingX.Application.Common.Interfaces;
using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Orders;
using KWingX.Application.DTOs.Purchases;
using KWingX.Application.Interfaces;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using Mapster;
using Microsoft.AspNetCore.Http;

namespace KWingX.Application.Services;

public class PurchaseService : IPurchaseService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IKeyGeneratorService _keyGenerator;

    public PurchaseService(
        IUnitOfWork unitOfWork, 
        IHttpContextAccessor httpContextAccessor,
        IKeyGeneratorService keyGenerator)
    {
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
        _keyGenerator = keyGenerator;
    }

    private Guid GetCurrentUserId()
    {
        var userIdStr = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new UnauthorizedAccessException();
        return userId;
    }

    private string GetCurrentUserEmail()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Email)?.Value ?? string.Empty;
    }

    #region Portal - Orders
    public async Task<OrderDto> CreateTemplateOrderAsync(Guid templateId)
    {
        var template = await _unitOfWork.Templates.GetByIdAsync(templateId);
        if (template == null) throw new KeyNotFoundException("Template not found");

        var order = new Order
        {
            UserId = GetCurrentUserId(),
            UserEmail = GetCurrentUserEmail(),
            Total = template.Price,
            Currency = template.Currency,
            Status = OrderStatus.Pending,
            PaymentStatus = PaymentStatus.Pending
        };

        order.Items.Add(new OrderItem
        {
            TemplateId = template.Id,
            ItemName = template.Name,
            Price = template.Price,
            Quantity = 1
        });

        await _unitOfWork.Orders.AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        return order.Adapt<OrderDto>();
    }

    public async Task<OrderDto> CreateServiceOrderAsync(Guid serviceId)
    {
        var service = await _unitOfWork.Services.GetByIdAsync(serviceId);
        if (service == null) throw new KeyNotFoundException("Service not found");

        var order = new Order
        {
            UserId = GetCurrentUserId(),
            UserEmail = GetCurrentUserEmail(),
            Total = service.Price,
            Currency = service.Currency,
            Status = OrderStatus.Pending,
            PaymentStatus = PaymentStatus.Pending
        };

        order.Items.Add(new OrderItem
        {
            ServiceId = service.Id,
            ItemName = service.Name,
            Price = service.Price,
            Quantity = 1
        });

        await _unitOfWork.Orders.AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        return order.Adapt<OrderDto>();
    }
    #endregion

    #region Portal - Purchases
    public async Task<List<PurchaseDto>> GetMyPurchasesAsync()
    {
        var userId = GetCurrentUserId();
        var purchases = await _unitOfWork.Purchases.GetByUserIdAsync(userId);
        return purchases.Adapt<List<PurchaseDto>>();
    }

    public async Task<LicenseKeyDto?> GetLicenseKeyAsync(Guid purchaseId)
    {
        var userId = GetCurrentUserId();
        var purchase = await _unitOfWork.Purchases.GetByIdWithLicenseKeysAsync(purchaseId);
        
        if (purchase == null || purchase.UserId != userId)
            throw new KeyNotFoundException("Purchase not found");

        var activeKey = purchase.LicenseKeys.FirstOrDefault(k => k.Status == KeyStatus.Active);
        return activeKey?.Adapt<LicenseKeyDto>();
    }

    public async Task RevokeLicenseKeyAsync(Guid purchaseId)
    {
        var userId = GetCurrentUserId();
        var purchase = await _unitOfWork.Purchases.GetByIdWithLicenseKeysAsync(purchaseId);

        if (purchase == null || purchase.UserId != userId)
            throw new KeyNotFoundException("Purchase not found");

        await _unitOfWork.ExecuteInTransactionAsync(async () =>
        {
            var activeKeys = purchase.LicenseKeys.Where(k => k.Status == KeyStatus.Active).ToList();
            foreach (var key in activeKeys)
            {
                key.Status = KeyStatus.Revoked;
                key.RevokedAt = DateTime.UtcNow;
                await _unitOfWork.LicenseKeys.UpdateAsync(key);
            }

            var log = new Log
            {
                Type = LogType.Infra,
                Severity = LogSeverity.Warn,
                Message = $"License key revoked for purchase {purchaseId} by user {userId}"
            };
            await _unitOfWork.Logs.AddAsync(log);
            
            await _unitOfWork.SaveChangesAsync();
        });
    }

    public async Task<LicenseKeyDto> RotateLicenseKeyAsync(Guid purchaseId)
    {
        var userId = GetCurrentUserId();
        var purchase = await _unitOfWork.Purchases.GetByIdWithLicenseKeysAsync(purchaseId);

        if (purchase == null || purchase.UserId != userId)
            throw new KeyNotFoundException("Purchase not found");

        LicenseKey? newKey = null;

        await _unitOfWork.ExecuteInTransactionAsync(async () =>
        {
            // 1. Revoke existing
            var activeKeys = purchase.LicenseKeys.Where(k => k.Status == KeyStatus.Active).ToList();
            foreach (var key in activeKeys)
            {
                key.Status = KeyStatus.Revoked;
                key.RevokedAt = DateTime.UtcNow;
                await _unitOfWork.LicenseKeys.UpdateAsync(key);
            }

            // 2. Generate new
            newKey = new LicenseKey
            {
                PurchaseId = purchase.Id,
                Key = _keyGenerator.GenerateLicenseKey(),
                Status = KeyStatus.Active
            };
            await _unitOfWork.LicenseKeys.AddAsync(newKey);

            var log = new Log
            {
                Type = LogType.Infra,
                Severity = LogSeverity.Info,
                Message = $"License key rotated for purchase {purchaseId} by user {userId}"
            };
            await _unitOfWork.Logs.AddAsync(log);

            await _unitOfWork.SaveChangesAsync();
        });

        return newKey!.Adapt<LicenseKeyDto>();
    }
    #endregion

    #region Admin - Orders
    public async Task<PagedResponse<OrderDto>> GetAdminOrdersAsync(int page, int pageSize, OrderStatus? status = null, string? search = null)
    {
        var result = await _unitOfWork.Orders.GetListAsync(page, pageSize, status, null, null, search);
        return new PagedResponse<OrderDto>
        {
            Items = result.Items.Adapt<List<OrderDto>>(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<OrderDto?> GetOrderByIdAsync(Guid id)
    {
        var order = await _unitOfWork.Orders.GetByIdAsync(id);
        return order?.Adapt<OrderDto>();
    }

    public async Task UpdateOrderStatusAsync(Guid id, OrderStatus status)
    {
        var order = await _unitOfWork.Orders.GetByIdAsync(id);
        if (order == null) throw new KeyNotFoundException("Order not found");

        var oldStatus = order.Status;
        order.Status = status;

        await _unitOfWork.ExecuteInTransactionAsync(async () =>
        {
            await _unitOfWork.Orders.UpdateAsync(order);

            // If order completed, create purchase
            if (status == OrderStatus.Completed && oldStatus != OrderStatus.Completed)
            {
                foreach (var item in order.Items)
                {
                    var purchase = new Purchase
                    {
                        UserId = order.UserId,
                        PurchaseType = item.TemplateId.HasValue ? PurchaseType.Template : PurchaseType.Service,
                        TemplateId = item.TemplateId,
                        ServiceId = item.ServiceId,
                        Status = PurchaseStatus.Active,
                        Price = item.Price,
                        Currency = order.Currency,
                        PurchasedAt = DateTime.UtcNow
                    };

                    await _unitOfWork.Purchases.AddAsync(purchase);
                    await _unitOfWork.SaveChangesAsync(); // Need Id for license key

                    if (item.TemplateId.HasValue)
                    {
                        var key = new LicenseKey
                        {
                            PurchaseId = purchase.Id,
                            Key = _keyGenerator.GenerateLicenseKey(),
                            Status = KeyStatus.Active
                        };
                        await _unitOfWork.LicenseKeys.AddAsync(key);

                        // Provisioning Phase 1: Create CustomerSite and DeploymentJob
                        var target = (await _unitOfWork.DeploymentTargets.ListAsync()).FirstOrDefault(t => t.IsActive);
                        if (target != null)
                        {
                            var site = new CustomerSite
                            {
                                UserId = order.UserId,
                                TemplateId = item.TemplateId.Value,
                                Name = $"{item.ItemName} for {order.UserEmail}",
                                Subdomain = $"site-{purchase.Id.ToString()[..8]}",
                                Status = CustomerSiteStatus.Provisioning,
                                DeploymentTargetId = target.Id
                            };
                            await _unitOfWork.CustomerSites.AddAsync(site);
                            await _unitOfWork.SaveChangesAsync();

                            var job = new DeploymentJob
                            {
                                SiteId = site.Id,
                                Type = DeploymentJobType.Deploy,
                                Status = DeploymentStatus.Queued,
                                CorrelationId = Guid.NewGuid().ToString()
                            };
                            await _unitOfWork.DeploymentJobs.AddAsync(job);
                        }
                    }
                }
            }

            var log = new Log
            {
                Type = LogType.Payment,
                Severity = LogSeverity.Info,
                Message = $"Order {id} status changed from {oldStatus} to {status}"
            };
            await _unitOfWork.Logs.AddAsync(log);

            await _unitOfWork.SaveChangesAsync();
        });
    }
    #endregion
}
