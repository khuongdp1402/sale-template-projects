using KWingX.Domain.Common;

namespace KWingX.Application.Interfaces.Repositories;

public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id, bool includeDeleted = false);
    Task<List<T>> ListAsync(bool includeDeleted = false);
    Task AddAsync(T entity, string? createdBy = null);
    Task DeleteAsync(T entity, string? deletedBy = null);
    Task UpdateAsync(T entity, string? modifiedBy = null);
    Task<int> SaveChangesAsync();
}

