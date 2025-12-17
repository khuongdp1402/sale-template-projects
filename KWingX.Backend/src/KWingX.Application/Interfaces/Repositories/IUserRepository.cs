using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByUsernameAsync(string username, bool includeDeleted = false);
    Task<User?> GetByEmailAsync(string email, bool includeDeleted = false);
    Task<PagedResponse<User>> GetAdminListAsync(
        int page,
        int pageSize,
        string? search = null,
        KWingX.Domain.Enums.UserRole? role = null,
        bool? isActive = null,
        bool includeDeleted = false);
}


