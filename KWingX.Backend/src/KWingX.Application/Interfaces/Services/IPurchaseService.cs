using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces.Services;

public interface IPurchaseService
{
    Task<List<Purchase>> GetByUserIdAsync(Guid userId);
    Task<Purchase?> GetByIdAsync(Guid id);
    Task<Purchase> CreateAsync(Purchase purchase, string? createdBy = null);
    Task<LicenseKey> RotateLicenseKeyAsync(Guid purchaseId, string? modifiedBy = null);
}

