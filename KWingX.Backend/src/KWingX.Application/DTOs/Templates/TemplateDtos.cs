using KWingX.Domain.Enums;
using KWingX.Application.DTOs.MasterData;

namespace KWingX.Application.DTOs.Templates;

public class TemplateDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string LongDescription { get; set; } = string.Empty;
    public TemplateType TemplateType { get; set; }
    public Audience Audience { get; set; }
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public string Currency { get; set; } = "VND";
    public bool IsHot { get; set; }
    public bool IsNew { get; set; }
    public bool IsPopular { get; set; }
    public int PopularityScore { get; set; }
    public TemplateStatus Status { get; set; }
    public string? FeaturesCsv { get; set; }
    public List<CategoryDto> Categories { get; set; } = new();
    public List<TagDto> Tags { get; set; } = new();
    public List<TemplateMediaDto> Media { get; set; } = new();
    public List<CustomerUseCaseDto> CustomerUseCases { get; set; } = new();
}

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
    public TemplateStatus Status { get; set; }
    public List<CategoryDto> Categories { get; set; } = new();
    public string? MainImage { get; set; }
}

public class CreateTemplateRequest
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string LongDescription { get; set; } = string.Empty;
    public TemplateType TemplateType { get; set; }
    public Audience Audience { get; set; }
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public bool IsHot { get; set; }
    public bool IsNew { get; set; }
    public bool IsPopular { get; set; }
    public TemplateStatus Status { get; set; } = TemplateStatus.Draft;
    public string? FeaturesCsv { get; set; }
    public List<Guid> CategoryIds { get; set; } = new();
    public List<Guid> TagIds { get; set; } = new();
}

public class TemplateMediaDto
{
    public Guid Id { get; set; }
    public MediaType MediaType { get; set; }
    public string Src { get; set; } = string.Empty;
    public string? Thumb { get; set; }
    public string? Title { get; set; }
    public int SortOrder { get; set; }
}

public class CustomerUseCaseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string? Logo { get; set; }
    public string? Quote { get; set; }
}
