using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Blog;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Services;

public interface IBlogPostService
{
    // Portal
    Task<PagedResponse<BlogPostListItemDto>> GetPublishedPostsAsync(int page, int pageSize, string? category = null, string? search = null, string? sort = null);
    Task<BlogPostDto?> GetPostBySlugAsync(string slug);
    Task<List<string>> GetCategoriesAsync();
    Task<List<BlogPostListItemDto>> GetFeaturedPostsAsync(int count);
    Task<List<BlogPostListItemDto>> GetTrendingPostsAsync(int count);
    Task<PagedResponse<BlogPostListItemDto>> GetGuidesAsync(int page, int pageSize);

    // Admin
    Task<PagedResponse<BlogPostListItemDto>> GetAdminPostsAsync(int page, int pageSize, string? search = null, BlogPostStatus? status = null);
    Task<BlogPostResponse?> GetPostByIdAsync(Guid id);
    Task<BlogPostResponse> CreatePostAsync(BlogPostCreateRequest request, Guid? createdBy = null);
    Task<BlogPostResponse> UpdatePostAsync(Guid id, BlogPostUpdateRequest request, Guid? modifiedBy = null);
    Task DeletePostAsync(Guid id);
    Task PublishPostAsync(Guid id);
    Task UnpublishPostAsync(Guid id);

    // Legacy methods (for backward compatibility)
    [Obsolete("Use GetAdminPostsAsync without category parameter")]
    Task<PagedResponse<BlogPostDto>> GetAdminPostsAsync(int page, int pageSize, string? search = null, string? category = null, BlogPostStatus? status = null);
    
    [Obsolete("Use CreatePostAsync with BlogPostCreateRequest")]
    Task<BlogPostDto> CreatePostAsync(CreateBlogPostRequest request);
    
    [Obsolete("Use UpdatePostAsync with BlogPostUpdateRequest")]
    Task UpdatePostAsync(Guid id, CreateBlogPostRequest request);
}
