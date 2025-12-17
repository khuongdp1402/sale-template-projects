using KWingX.Application.Interfaces;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Services;

public class PurchaseService : IPurchaseService
{
    private readonly IUnitOfWork _unitOfWork;

    public PurchaseService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<Purchase>> GetByUserIdAsync(Guid userId)
    {
        // Query is handled in repository layer (Infrastructure)
        return await _unitOfWork.Purchases.GetByUserIdAsync(userId);
    }

    public async Task<Purchase?> GetByIdAsync(Guid id)
    {
        return await _unitOfWork.Purchases.GetByIdAsync(id);
    }

    public async Task<Purchase> CreateAsync(Purchase purchase, string? createdBy = null)
    {
        await _unitOfWork.Purchases.AddAsync(purchase, createdBy);
        await _unitOfWork.SaveChangesAsync();
        return purchase;
    }

    public async Task<LicenseKey> RotateLicenseKeyAsync(Guid purchaseId, string? modifiedBy = null)
    {
        // Use transaction to ensure atomicity
        LicenseKey? newKey = null;
        
        await _unitOfWork.ExecuteInTransactionAsync(async () =>
        {
            // Load purchase with keys
            var purchase = await _unitOfWork.Purchases.GetByIdAsync(purchaseId);
            if (purchase == null)
                throw new KeyNotFoundException($"Purchase with id {purchaseId} not found");

            // Load license keys for this purchase (query in repository)
            var allKeys = await _unitOfWork.LicenseKeys.ListAsync();
            var activeKeys = allKeys
                .Where(k => k.PurchaseId == purchaseId && k.Status == KeyStatus.Active)
                .ToList();
            
            // Revoke old active keys
            foreach (var oldKey in activeKeys)
            {
                oldKey.Status = KeyStatus.Revoked;
                oldKey.RevokedAt = DateTime.UtcNow;
                await _unitOfWork.LicenseKeys.UpdateAsync(oldKey, modifiedBy);
            }

            // Generate new key (simplified - in real app use IKeyGeneratorService)
            newKey = new LicenseKey
            {
                PurchaseId = purchaseId,
                Key = $"LIC_{Guid.NewGuid():N}",
                Status = KeyStatus.Active
            };

            await _unitOfWork.LicenseKeys.AddAsync(newKey, modifiedBy);
            await _unitOfWork.SaveChangesAsync();
        });

        return newKey!;
    }
}

