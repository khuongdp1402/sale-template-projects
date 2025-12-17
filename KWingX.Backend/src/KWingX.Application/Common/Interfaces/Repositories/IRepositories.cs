using KWingX.Domain.Entities;

namespace KWingX.Application.Common.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id);
    Task<User?> GetByUsernameAsync(string username);
    Task<User?> GetByEmailAsync(string email);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
}

public interface ITemplateRepository
{
    Task<Template?> GetByIdAsync(Guid id);
    Task<Template?> GetBySlugAsync(string slug);
    Task<List<Template>> GetListAsync(string? category, string? type, int page, int pageSize);
    Task<List<Template>> GetFeaturedAsync(int count);
}

public interface IPurchaseRepository
{
    Task<List<Purchase>> GetByUserIdAsync(Guid userId);
    Task<Purchase?> GetByIdAsync(Guid id);
    Task AddAsync(Purchase purchase);
    Task UpdateAsync(Purchase purchase);
}

public interface IBlogRepository
{
    Task<List<BlogPost>> GetListAsync(int page, int pageSize);
    Task<BlogPost?> GetBySlugAsync(string slug);
}
