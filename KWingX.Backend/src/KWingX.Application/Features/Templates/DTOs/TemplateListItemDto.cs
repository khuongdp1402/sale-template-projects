using KWingX.Domain.Enums;

namespace KWingX.Application.Features.Templates.DTOs;

public class TemplateListItemDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public TemplateType TemplateType { get; set; }
    public Audience Audience { get; set; }
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public string Currency { get; set; } = "VND";
    public bool IsHot { get; set; }
    public bool IsNew { get; set; }
    public bool IsPopular { get; set; }
    public int PopularityScore { get; set; }
    public List<string> Tags { get; set; } = new();
    public List<string> Categories { get; set; } = new();
    public List<string> CardMedia { get; set; } = new(); // Thumbnail URLs
}

