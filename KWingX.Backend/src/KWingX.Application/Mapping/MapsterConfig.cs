using KWingX.Application.DTOs.Templates;
using KWingX.Application.DTOs.Orders;
using KWingX.Application.DTOs.Purchases;
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
            .Map(dest => dest.MainImage, src => src.Media != null && src.Media.Any() 
                ? src.Media.OrderBy(m => m.SortOrder).FirstOrDefault().Src 
                : string.Empty);

        config.NewConfig<Template, TemplateDto>()
            .Map(dest => dest.Media, src => src.Media)
            .Map(dest => dest.CustomerUseCases, src => src.CustomerUseCases)
            .Map(dest => dest.Categories, src => src.Categories)
            .Map(dest => dest.Tags, src => src.Tags);

        // Order mappings
        config.NewConfig<Order, OrderDto>()
            .Map(dest => dest.Items, src => src.Items);

        config.NewConfig<OrderItem, OrderItemDto>()
            .Map(dest => dest.ItemName, src => src.ItemName);

        // Purchase mappings
        config.NewConfig<Purchase, PurchaseDto>()
            .Map(dest => dest.TemplateName, src => src.TemplateId.HasValue ? "Template" : null) // Placeholder
            .Map(dest => dest.ServiceName, src => src.ServiceId.HasValue ? "Service" : null); // Placeholder

        // Compile for faster runtime and early failure
        config.Compile();

        return config;
    }
}
