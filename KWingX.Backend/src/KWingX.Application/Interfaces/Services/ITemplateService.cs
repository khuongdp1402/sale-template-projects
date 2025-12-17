using KWingX.Application.Common.Models;
using KWingX.Application.Features.Templates.DTOs;

namespace KWingX.Application.Interfaces.Services;

public interface ITemplateService
{
    Task<PagedResponse<TemplateListItemDto>> GetListAsync(string? category, string? type, int page, int pageSize);
    Task<TemplateDetailDto?> GetDetailAsync(string idOrSlug);
}


