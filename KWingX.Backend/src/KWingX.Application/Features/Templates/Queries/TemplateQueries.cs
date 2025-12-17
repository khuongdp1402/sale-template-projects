using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Domain.Entities;
using MediatR;

namespace KWingX.Application.Features.Templates.Queries;

// --- DTOs ---
public record TemplateDto(Guid Id, string Slug, string Name, string ShortDescription, decimal Price, string Currency, bool IsHot, string Category);

// --- Queries ---
public record GetTemplatesQuery(string? Category, string? Type, int Page = 1, int PageSize = 12) : IRequest<List<TemplateDto>>;

public record GetTemplateDetailQuery(string IdOrSlug) : IRequest<Template?>;

// --- Handlers ---
public class TemplateHandlers : 
    IRequestHandler<GetTemplatesQuery, List<TemplateDto>>,
    IRequestHandler<GetTemplateDetailQuery, Template?>
{
    private readonly ITemplateRepository _repo;

    public TemplateHandlers(ITemplateRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<TemplateDto>> Handle(GetTemplatesQuery request, CancellationToken cancellationToken)
    {
        var templates = await _repo.GetListAsync(request.Category, request.Type, request.Page, request.PageSize);
        
        return templates.Select(t => new TemplateDto(
            t.Id, 
            t.Slug, 
            t.Name, 
            t.ShortDescription, 
            t.Price, 
            t.Currency, 
            t.IsHot,
            t.Categories.FirstOrDefault()?.Name ?? ""
        )).ToList();
    }

    public async Task<Template?> Handle(GetTemplateDetailQuery request, CancellationToken cancellationToken)
    {
        if (Guid.TryParse(request.IdOrSlug, out var id))
        {
            return await _repo.GetByIdAsync(id);
        }
        return await _repo.GetBySlugAsync(request.IdOrSlug);
    }
}
