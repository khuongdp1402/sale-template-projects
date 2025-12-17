using KWingX.Application.DTOs.Templates;
using KWingX.Application.Features.Templates.DTOs;
using KWingX.Domain.Entities;
using Mapster;

namespace KWingX.Application.Mapping;

public static class MapsterConfig
{
    public static TypeAdapterConfig GetConfig()
    {
        var config = new TypeAdapterConfig();

        // Template mappings
        config.NewConfig<Template, TemplateListItemDto>()
            .Map(dest => dest.Tags, src => src.Tags.Select(t => t.Name))
            .Map(dest => dest.Categories, src => src.Categories.Select(c => c.Name))
            .Map(dest => dest.CardMedia, src => src.Media.Where(m => m.Thumb != null).Select(m => m.Thumb!));

        config.NewConfig<Template, TemplateDetailDto>()
            .Map(dest => dest.Features,
                src => string.IsNullOrEmpty(src.FeaturesCsv)
                    ? new List<string>()
                    : src.FeaturesCsv.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(f => f.Trim()))
            .Map(dest => dest.Gallery,
                src => src.Media.Select(m => new GalleryItemDto
                {
                    Type = m.MediaType.ToString().ToLower(),
                    Src = m.Src,
                    Thumb = m.Thumb,
                    Title = m.Title
                }))
            .Map(dest => dest.SimilarTemplateIds, src => src.SimilarTemplates.Select(t => t.Id));

        // TODO: Add mappings for Blog, Users, Orders, etc.

        // Compile for faster runtime and early failure
        config.Compile();

        return config;
    }
}


