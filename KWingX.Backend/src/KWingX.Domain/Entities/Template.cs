using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class Template : BaseEntity, IAggregateRoot
{
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

    public ICollection<TemplateCategory> Categories { get; set; } = new List<TemplateCategory>();
    public ICollection<TemplateTag> Tags { get; set; } = new List<TemplateTag>();
    public ICollection<TemplateMedia> Media { get; set; } = new List<TemplateMedia>();
    public ICollection<CustomerUseCase> CustomerUseCases { get; set; } = new List<CustomerUseCase>();
}

public class TemplateCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public ICollection<Template> Templates { get; set; } = new List<Template>();
}

public class TemplateTag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public ICollection<Template> Templates { get; set; } = new List<Template>();
}

public class TemplateMedia : BaseEntity
{
    public Guid TemplateId { get; set; }
    public TemplateType MediaType { get; set; } // Note: Using MediaType enum here would be better but keeping simple
    public string Src { get; set; } = string.Empty;
    public string? Thumb { get; set; }
    public string? Title { get; set; }
    public int SortOrder { get; set; }
}

public class CustomerUseCase : BaseEntity
{
    public Guid TemplateId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string? Logo { get; set; }
    public string? Quote { get; set; }
}
