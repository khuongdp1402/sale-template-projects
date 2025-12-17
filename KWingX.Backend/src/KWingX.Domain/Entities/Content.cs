using KWingX.Domain.Common;

namespace KWingX.Domain.Entities;

public class BlogPost : BaseEntity, IAggregateRoot
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string ContentMd { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? TagsCsv { get; set; }
    public string? CoverImage { get; set; }
    public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
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
