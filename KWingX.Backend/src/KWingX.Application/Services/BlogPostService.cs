using KWingX.Application.Common.Helpers;
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
    public async Task<PagedResponse<BlogPostListItemDto>> GetAdminPostsAsync(int page, int pageSize, string? search = null, BlogPostStatus? status = null)
    {
        var result = await _repository.GetListAsync(page, pageSize, status, category: null, search, includeDeleted: false);
        return new PagedResponse<BlogPostListItemDto>
        {
            Items = result.Items.Adapt<List<BlogPostListItemDto>>(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<BlogPostResponse?> GetPostByIdAsync(Guid id)
    {
        var post = await _repository.GetByIdAsync(id);
        return post?.Adapt<BlogPostResponse>();
    }

    public async Task<BlogPostResponse> CreatePostAsync(BlogPostCreateRequest request, Guid? createdBy = null)
    {
        // Generate slug from title
        var baseSlug = SlugHelper.GenerateSlug(request.Title);
        var slug = await SlugHelper.EnsureUniqueSlugAsync(baseSlug, async s => 
        {
            var existing = await _repository.GetBySlugAsync(s);
            return existing != null;
        });

        // Sanitize HTML content
        var sanitizedHtml = HtmlSanitizer.Sanitize(request.ContentHtml);

        var post = new BlogPost
        {
            Title = request.Title,
            Slug = slug,
            ShortDescription = request.ShortDescription,
            ContentHtml = sanitizedHtml,
            ContentJson = request.ContentJson,
            CoverImageUrl = request.CoverImageUrl,
            ButtonLinkUrl = request.ButtonLinkUrl,
            ButtonText = request.ButtonText,
            ButtonColor = request.ButtonColor,
            ButtonTextColor = request.ButtonTextColor,
            Status = request.Status,
            CreatedBy = createdBy?.ToString()
        };

        // Business rules: PublishedAt handling
        if (post.Status == BlogPostStatus.Published && post.PublishedAt == null)
        {
            post.PublishedAt = DateTime.UtcNow;
        }
        else if (post.Status == BlogPostStatus.Draft)
        {
            post.PublishedAt = null;
        }

        await _repository.AddAsync(post);
        await _repository.SaveChangesAsync();
        return post.Adapt<BlogPostResponse>();
    }

    public async Task<BlogPostResponse> UpdatePostAsync(Guid id, BlogPostUpdateRequest request, Guid? modifiedBy = null)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null) throw new KeyNotFoundException("Blog post not found");

        var oldStatus = post.Status;

        // Update fields
        post.Title = request.Title;
        post.ShortDescription = request.ShortDescription;
        post.ContentHtml = HtmlSanitizer.Sanitize(request.ContentHtml);
        post.ContentJson = request.ContentJson;
        post.CoverImageUrl = request.CoverImageUrl;
        post.ButtonLinkUrl = request.ButtonLinkUrl;
        post.ButtonText = request.ButtonText;
        post.ButtonColor = request.ButtonColor;
        post.ButtonTextColor = request.ButtonTextColor;
        post.Status = request.Status;
        post.ModifiedBy = modifiedBy?.ToString();
        post.ModifiedAt = DateTime.UtcNow;

        // Regenerate slug if title changed (optional - you might want to keep old slug for SEO)
        // For now, we'll keep the existing slug unless it's a new post

        // Business rules: PublishedAt handling
        if (oldStatus != BlogPostStatus.Published && post.Status == BlogPostStatus.Published)
        {
            post.PublishedAt = DateTime.UtcNow;
        }
        else if (post.Status == BlogPostStatus.Draft)
        {
            post.PublishedAt = null;
        }

        await _repository.UpdateAsync(post);
        await _repository.SaveChangesAsync();
        return post.Adapt<BlogPostResponse>();
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

    // Legacy methods (for backward compatibility)
    [Obsolete("Use GetAdminPostsAsync without category parameter")]
    async Task<PagedResponse<BlogPostDto>> IBlogPostService.GetAdminPostsAsync(int page, int pageSize, string? search = null, string? category = null, BlogPostStatus? status = null)
    {
        var result = await _repository.GetListAsync(page, pageSize, status, category, search, includeDeleted: false);
        return new PagedResponse<BlogPostDto>
        {
            Items = result.Items.Select(p => new BlogPostDto
            {
                Id = p.Id,
                Slug = p.Slug,
                Title = p.Title,
                Excerpt = p.ShortDescription,
                ContentMd = p.ContentHtml,
                Category = p.Category,
                TagsCsv = p.TagsCsv,
                CoverImage = p.CoverImageUrl,
                PublishedAt = p.PublishedAt ?? DateTime.UtcNow,
                IsFeatured = p.IsFeatured,
                IsTrending = p.IsTrending,
                Views = p.Views,
                Status = p.Status
            }).ToList(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    [Obsolete("Use CreatePostAsync with BlogPostCreateRequest")]
    async Task<BlogPostDto> IBlogPostService.CreatePostAsync(CreateBlogPostRequest request)
    {
        // Convert legacy request to new request
        var newRequest = new BlogPostCreateRequest
        {
            Title = request.Title,
            ShortDescription = request.Excerpt,
            ContentHtml = request.ContentMd,
            CoverImageUrl = request.CoverImage,
            Status = request.Status
        };

        var response = await CreatePostAsync(newRequest);
        
        // Convert to legacy DTO
        var post = await _repository.GetByIdAsync(response.Id);
        if (post == null) throw new InvalidOperationException("Post was created but not found");
        
        // Update legacy fields
        post.Category = request.Category;
        post.TagsCsv = request.TagsCsv;
        post.IsFeatured = request.IsFeatured;
        await _repository.UpdateAsync(post);
        await _repository.SaveChangesAsync();

        return new BlogPostDto
        {
            Id = response.Id,
            Slug = response.Slug,
            Title = response.Title,
            Excerpt = response.ShortDescription,
            ContentMd = response.ContentHtml,
            Category = post.Category,
            TagsCsv = post.TagsCsv,
            CoverImage = response.CoverImageUrl,
            PublishedAt = response.PublishedAt ?? DateTime.UtcNow,
            IsFeatured = post.IsFeatured,
            IsTrending = post.IsTrending,
            Views = post.Views,
            Status = response.Status
        };
    }

    [Obsolete("Use UpdatePostAsync with BlogPostUpdateRequest")]
    async Task IBlogPostService.UpdatePostAsync(Guid id, CreateBlogPostRequest request)
    {
        // Convert legacy request to new request
        var newRequest = new BlogPostUpdateRequest
        {
            Title = request.Title,
            ShortDescription = request.Excerpt,
            ContentHtml = request.ContentMd,
            CoverImageUrl = request.CoverImage,
            Status = request.Status
        };

        var response = await UpdatePostAsync(id, newRequest);
        
        // Update legacy fields
        var post = await _repository.GetByIdAsync(id);
        if (post != null)
        {
            post.Category = request.Category;
            post.TagsCsv = request.TagsCsv;
            post.IsFeatured = request.IsFeatured;
            await _repository.UpdateAsync(post);
            await _repository.SaveChangesAsync();
        }
    }
    #endregion
}
