using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces.Repositories;

public interface IPurchaseRepository : IRepository<Purchase>
{
    Task<List<Purchase>> GetByUserIdAsync(Guid userId, bool includeDeleted = false);
    Task<Purchase?> GetByIdWithLicenseKeysAsync(Guid id);
}


