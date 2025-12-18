using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Templates;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Services;

public interface ITemplateService
{
    // Portal
    Task<PagedResponse<TemplateListItemDto>> GetPublishedTemplatesAsync(
        int page, 
        int pageSize, 
        string? search = null,
        string? category = null, 
        TemplateType? type = null, 
        Audience? audience = null,
        decimal? priceMin = null,
        decimal? priceMax = null,
        bool? hot = null,
        bool? isNew = null,
        bool? popular = null,
        bool? discount = null,
        string? sort = null);
        
    Task<TemplateDto?> GetTemplateBySlugAsync(string slug);
    Task<List<TemplateMediaDto>> GetTemplateMediaAsync(string idOrSlug);
    Task<List<CustomerUseCaseDto>> GetTemplateCustomersAsync(string idOrSlug);
    Task<List<TemplateListItemDto>> GetSimilarTemplatesAsync(string idOrSlug);

    // Admin
    Task<PagedResponse<TemplateDto>> GetAdminTemplatesAsync(
        int page, 
        int pageSize, 
        string? search = null,
        string? category = null, 
        TemplateType? type = null, 
        Audience? audience = null,
        TemplateStatus? status = null);
        
    Task<TemplateDto?> GetTemplateByIdAsync(Guid id);
    Task<TemplateDto> CreateTemplateAsync(CreateTemplateRequest request);
    Task UpdateTemplateAsync(Guid id, CreateTemplateRequest request);
    Task DeleteTemplateAsync(Guid id);
    Task PublishTemplateAsync(Guid id);
    Task UnpublishTemplateAsync(Guid id);
    Task UpdateTemplateMediaAsync(Guid id, List<TemplateMediaDto> media);
    Task UpdateTemplateCustomersAsync(Guid id, List<CustomerUseCaseDto> customers);
    Task UpdateSimilarTemplatesAsync(Guid id, List<Guid> similarIds);
    Task RestoreTemplateAsync(Guid id);
}
