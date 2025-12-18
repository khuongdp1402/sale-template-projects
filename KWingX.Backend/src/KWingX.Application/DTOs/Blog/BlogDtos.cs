using KWingX.Domain.Enums;

namespace KWingX.Application.DTOs.Blog;

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

public class BlogPostListItemDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? CoverImage { get; set; }
    public DateTime PublishedAt { get; set; }
    public int Views { get; set; }
    public BlogPostStatus Status { get; set; }
}
