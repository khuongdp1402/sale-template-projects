using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Services;

public interface IBlogPostService
{
    Task<PagedResponse<BlogPost>> GetListAsync(int page, int pageSize, BlogPostStatus? status = null, string? category = null, bool includeDeleted = false);
    Task<BlogPost?> GetByIdAsync(Guid id, bool includeDeleted = false);
    Task<BlogPost?> GetBySlugAsync(string slug, bool includeDeleted = false);
    Task<BlogPost> CreateAsync(BlogPost post, string? createdBy = null);
    Task<BlogPost> UpdateAsync(BlogPost post, string? modifiedBy = null);
    Task DeleteAsync(Guid id, string? deletedBy = null);
    Task RestoreAsync(Guid id);
}

