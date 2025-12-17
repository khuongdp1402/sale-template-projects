using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Repositories;

public interface IBlogRepository : IRepository<BlogPost>
{
    Task<BlogPost?> GetBySlugAsync(string slug, bool includeDeleted = false);
    Task<PagedResponse<BlogPost>> GetListAsync(int page, int pageSize, BlogPostStatus? status = null, string? category = null, bool includeDeleted = false);
    Task<List<BlogPost>> GetFeaturedAsync(int count);
    Task<List<BlogPost>> GetTrendingAsync(int count);
}


