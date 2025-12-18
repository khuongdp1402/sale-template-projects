using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Repositories;

public interface ITemplateRepository : IRepository<Template>
{
    Task<Template?> GetByIdOrSlugAsync(string idOrSlug, bool includeDeleted = false);
    Task<PagedResponse<Template>> GetListAsync(
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
        string? sort = null,
        bool includeDeleted = false);

    Task<List<TemplateMedia>> GetMediaAsync(Guid templateId);
    Task<List<CustomerUseCase>> GetCustomersAsync(Guid templateId);
    Task<List<Template>> GetSimilarAsync(Guid templateId);
    
    Task UpdateMediaAsync(Guid templateId, List<TemplateMedia> media);
    Task UpdateCustomersAsync(Guid templateId, List<CustomerUseCase> customers);
    Task UpdateSimilarAsync(Guid templateId, List<Guid> similarIds);
    
    Task RestoreAsync(Guid id);
}
