using KWingX.Domain.Enums;

namespace KWingX.Application.DTOs.Blog;

// Response DTOs
public class BlogPostResponse
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string ContentHtml { get; set; } = string.Empty;
    public string? ContentJson { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? ButtonLinkUrl { get; set; }
    public string? ButtonText { get; set; }
    public string ButtonColor { get; set; } = "#111111";
    public string ButtonTextColor { get; set; } = "#FFFFFF";
    public BlogPostStatus Status { get; set; }
    public DateTime? PublishedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public string? CreatedBy { get; set; }
}

public class BlogPostListItemDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string? CoverImageUrl { get; set; }
    public BlogPostStatus Status { get; set; }
    public DateTime? PublishedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
}

// Request DTOs
public class BlogPostCreateRequest
{
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string ContentHtml { get; set; } = string.Empty;
    public string? ContentJson { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? ButtonLinkUrl { get; set; }
    public string? ButtonText { get; set; }
    public string ButtonColor { get; set; } = "#111111";
    public string ButtonTextColor { get; set; } = "#FFFFFF";
    public BlogPostStatus Status { get; set; } = BlogPostStatus.Draft;
}

public class BlogPostUpdateRequest
{
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string ContentHtml { get; set; } = string.Empty;
    public string? ContentJson { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? ButtonLinkUrl { get; set; }
    public string? ButtonText { get; set; }
    public string ButtonColor { get; set; } = "#111111";
    public string ButtonTextColor { get; set; } = "#FFFFFF";
    public BlogPostStatus Status { get; set; } = BlogPostStatus.Draft;
}

// Legacy DTOs (for backward compatibility)
[Obsolete("Use BlogPostResponse instead")]
public class BlogPostDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string ContentMd { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? TagsCsv { get; set; }
    public string? CoverImage { get; set; }
    public DateTime PublishedAt { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsTrending { get; set; }
    public int Views { get; set; }
    public BlogPostStatus Status { get; set; }
}

[Obsolete("Use BlogPostCreateRequest instead")]
public class CreateBlogPostRequest
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string ContentMd { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? TagsCsv { get; set; }
    public string? CoverImage { get; set; }
    public bool IsFeatured { get; set; }
    public BlogPostStatus Status { get; set; } = BlogPostStatus.Draft;
}
