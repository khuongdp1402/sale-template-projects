using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class BlogPost : AuditableEntity, IAggregateRoot
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string ContentHtml { get; set; } = string.Empty;
    public string? ContentJson { get; set; }
    public string? CoverImageUrl { get; set; }
    
    // CTA Button
    public string? ButtonLinkUrl { get; set; }
    public string? ButtonText { get; set; }
    public string ButtonColor { get; set; } = "#111111";
    public string ButtonTextColor { get; set; } = "#FFFFFF";
    
    public BlogPostStatus Status { get; set; } = BlogPostStatus.Draft;
    public DateTime? PublishedAt { get; set; }
    
    // Legacy fields (kept for backward compatibility, can be removed after migration)
    [Obsolete("Use ShortDescription instead")]
    public string Excerpt { get; set; } = string.Empty;
    
    [Obsolete("Use ContentHtml instead")]
    public string ContentMd { get; set; } = string.Empty;
    
    [Obsolete("Use CoverImageUrl instead")]
    public string? CoverImage { get; set; }
    
    public string Category { get; set; } = string.Empty;
    public string? TagsCsv { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsTrending { get; set; }
    public int Views { get; set; }
}

public class LandingSection : BaseEntity
{
    public string SectionType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ContentJson { get; set; } = string.Empty;
    public int Position { get; set; }
    public bool IsActive { get; set; } = true;
}
