using KWingX.Application.Common.Models;
using KWingX.Application.Features.Templates.DTOs;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Enums;
using Mapster;

namespace KWingX.Application.Services;

public class TemplateService : ITemplateService
{
    private readonly ITemplateRepository _repository;

    public TemplateService(ITemplateRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResponse<TemplateListItemDto>> GetListAsync(string? category, string? type, int page, int pageSize)
    {
        TemplateType? parsedType = null;
        if (!string.IsNullOrWhiteSpace(type) && Enum.TryParse<TemplateType>(type, true, out var t))
        {
            parsedType = t;
        }

        var pagedTemplates = await _repository.GetListAsync(page, pageSize, category, parsedType, audience: null);

        return new PagedResponse<TemplateListItemDto>
        {
            Page = pagedTe
            mplates.Page,
            PageSize = pagedTemplates.PageSize,
            Total = pagedTemplates.Total,
            Items = pagedTemplates.Items.Adapt<List<TemplateListItemDto>>()
        };
    }

    public async Task<TemplateDetailDto?> GetDetailAsync(string idOrSlug)
    {
        var template = Guid.TryParse(idOrSlug, out var id)
            ? await _repository.GetByIdAsync(id)
            : await _repository.GetBySlugAsync(idOrSlug);

        if (template == null || template.Status != TemplateStatus.Published)
            return null;

        return template.Adapt<TemplateDetailDto>();
    }
}


