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
    Task<PagedResponse<BlogPostDto>> GetAdminPostsAsync(int page, int pageSize, string? search = null, string? category = null, BlogPostStatus? status = null);
    Task<BlogPostDto?> GetPostByIdAsync(Guid id);
    Task<BlogPostDto> CreatePostAsync(CreateBlogPostRequest request);
    Task UpdatePostAsync(Guid id, CreateBlogPostRequest request);
    Task DeletePostAsync(Guid id);
    Task PublishPostAsync(Guid id);
    Task UnpublishPostAsync(Guid id);
}
