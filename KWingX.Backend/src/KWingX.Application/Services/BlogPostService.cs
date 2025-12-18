using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Blog;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using Mapster;

namespace KWingX.Application.Services;

public class BlogPostService : IBlogPostService
{
    private readonly IBlogRepository _repository;
    private const string GuidesCategory = "Hướng dẫn hệ sinh thái K-WingX";

    public BlogPostService(IBlogRepository repository)
    {
        _repository = repository;
    }

    #region Portal
    public async Task<PagedResponse<BlogPostListItemDto>> GetPublishedPostsAsync(int page, int pageSize, string? category = null, string? search = null, string? sort = null)
    {
        var result = await _repository.GetListAsync(page, pageSize, BlogPostStatus.Published, category, search, sort);
        return new PagedResponse<BlogPostListItemDto>
        {
            Items = result.Items.Adapt<List<BlogPostListItemDto>>(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<BlogPostDto?> GetPostBySlugAsync(string slug)
    {
        var post = await _repository.GetBySlugAsync(slug);
        if (post != null)
        {
            await _repository.IncrementViewsAsync(post.Id);
            return post.Adapt<BlogPostDto>();
        }
        return null;
    }

    public async Task<List<string>> GetCategoriesAsync()
    {
        return await _repository.GetCategoriesAsync();
    }

    public async Task<List<BlogPostListItemDto>> GetFeaturedPostsAsync(int count)
    {
        var posts = await _repository.GetFeaturedAsync(count);
        return posts.Adapt<List<BlogPostListItemDto>>();
    }

    public async Task<List<BlogPostListItemDto>> GetTrendingPostsAsync(int count)
    {
        var posts = await _repository.GetTrendingAsync(count);
        return posts.Adapt<List<BlogPostListItemDto>>();
    }

    public async Task<PagedResponse<BlogPostListItemDto>> GetGuidesAsync(int page, int pageSize)
    {
        var result = await _repository.GetListAsync(page, pageSize, BlogPostStatus.Published, GuidesCategory);
        return new PagedResponse<BlogPostListItemDto>
        {
            Items = result.Items.Adapt<List<BlogPostListItemDto>>(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }
    #endregion

    #region Admin
    public async Task<PagedResponse<BlogPostDto>> GetAdminPostsAsync(int page, int pageSize, string? search = null, string? category = null, BlogPostStatus? status = null)
    {
        var result = await _repository.GetListAsync(page, pageSize, status, category, search, includeDeleted: false);
        return new PagedResponse<BlogPostDto>
        {
            Items = result.Items.Adapt<List<BlogPostDto>>(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<BlogPostDto?> GetPostByIdAsync(Guid id)
    {
        var post = await _repository.GetByIdAsync(id);
        return post?.Adapt<BlogPostDto>();
    }

    public async Task<BlogPostDto> CreatePostAsync(CreateBlogPostRequest request)
    {
        var post = request.Adapt<BlogPost>();
        if (post.Status == BlogPostStatus.Published)
            post.PublishedAt = DateTime.UtcNow;

        await _repository.AddAsync(post);
        await _repository.SaveChangesAsync();
        return post.Adapt<BlogPostDto>();
    }

    public async Task UpdatePostAsync(Guid id, CreateBlogPostRequest request)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null) throw new KeyNotFoundException("Blog post not found");

        var oldStatus = post.Status;
        request.Adapt(post);

        if (oldStatus != BlogPostStatus.Published && post.Status == BlogPostStatus.Published)
            post.PublishedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(post);
        await _repository.SaveChangesAsync();
    }

    public async Task DeletePostAsync(Guid id)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null) return;

        await _repository.DeleteAsync(post);
        await _repository.SaveChangesAsync();
    }

    public async Task PublishPostAsync(Guid id)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null) throw new KeyNotFoundException("Blog post not found");

        post.Status = BlogPostStatus.Published;
        post.PublishedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(post);
        await _repository.SaveChangesAsync();
    }

    public async Task UnpublishPostAsync(Guid id)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null) throw new KeyNotFoundException("Blog post not found");

        post.Status = BlogPostStatus.Draft;

        await _repository.UpdateAsync(post);
        await _repository.SaveChangesAsync();
    }
    #endregion
}
