using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<User?> GetByUsernameWithRolesAsync(string username)
    {
        return await _dbSet
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<User?> GetByEmailWithRolesAsync(string email)
    {
        return await _dbSet
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetByIdWithRolesAsync(Guid id)
    {
        return await _dbSet
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User?> GetByUsernameAsync(string username, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<User?> GetByEmailAsync(string email, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<PagedResponse<User>> GetAdminListAsync(int page, int pageSize, string? search = null, KWingX.Domain.Enums.UserRole? role = null, bool? isActive = null, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        if (!string.IsNullOrEmpty(search))
            query = query.Where(u => u.Username.Contains(search) || u.Email.Contains(search));
        
        if (role.HasValue)
        {
            var roleName = role.Value.ToString();
            query = query.Where(u => u.UserRoles.Any(ur => ur.Role.Name == roleName));
        }
        
        if (isActive.HasValue)
            query = query.Where(u => u.IsActive == isActive.Value);
        
        var total = await query.CountAsync();
        var items = await query
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .OrderByDescending(u => u.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();
        
        return new PagedResponse<User>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }
}
