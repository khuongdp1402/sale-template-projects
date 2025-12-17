using KWingX.Application.Features.Templates.DTOs;

namespace KWingX.Application.Features.Templates.DTOs;

public class TemplateDetailDto : TemplateListItemDto
{
    public string LongDescription { get; set; } = string.Empty;
    public List<string> Features { get; set; } = new();
    public DemoVideoDto? DemoVideo { get; set; }
    public List<GalleryItemDto> Gallery { get; set; } = new();
    public List<string> SupportContacts { get; set; } = new();
    public List<Guid> SimilarTemplateIds { get; set; } = new();
}

public class DemoVideoDto
{
    public string Src { get; set; } = string.Empty;
    public string? Poster { get; set; }
    public string? Title { get; set; }
}

public class GalleryItemDto
{
    public string Type { get; set; } = string.Empty; // "image" or "video"
    public string Src { get; set; } = string.Empty;
    public string? Thumb { get; set; }
    public string? Title { get; set; }
}

