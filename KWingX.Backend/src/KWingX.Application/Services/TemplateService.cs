using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Templates;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using Mapster;

namespace KWingX.Application.Services;

public class TemplateService : ITemplateService
{
    private readonly ITemplateRepository _repository;
    private readonly ITemplateCategoryRepository _categoryRepository;
    private readonly ITemplateTagRepository _tagRepository;

    public TemplateService(
        ITemplateRepository repository,
        ITemplateCategoryRepository categoryRepository,
        ITemplateTagRepository tagRepository)
    {
        _repository = repository;
        _categoryRepository = categoryRepository;
        _tagRepository = tagRepository;
    }

    #region Portal
    public async Task<PagedResponse<TemplateListItemDto>> GetPublishedTemplatesAsync(
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
        string? sort = null)
    {
        var result = await _repository.GetListAsync(page, pageSize, search, category, type, audience, priceMin, priceMax, hot, isNew, popular, discount, sort, includeDeleted: false);
        
        var dtos = result.Items.Select(t => {
            var dto = t.Adapt<TemplateListItemDto>();
            dto.MainImage = t.Media.OrderBy(m => m.SortOrder).FirstOrDefault()?.Src;
            return dto;
        }).ToList();

        return new PagedResponse<TemplateListItemDto>
        {
            Items = dtos,
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<TemplateDto?> GetTemplateBySlugAsync(string slug)
    {
        var template = await _repository.GetByIdOrSlugAsync(slug);
        return template?.Adapt<TemplateDto>();
    }

    public async Task<List<TemplateMediaDto>> GetTemplateMediaAsync(string idOrSlug)
    {
        var template = await _repository.GetByIdOrSlugAsync(idOrSlug);
        if (template == null) return new List<TemplateMediaDto>();
        
        var media = await _repository.GetMediaAsync(template.Id);
        return media.Adapt<List<TemplateMediaDto>>();
    }

    public async Task<List<CustomerUseCaseDto>> GetTemplateCustomersAsync(string idOrSlug)
    {
        var template = await _repository.GetByIdOrSlugAsync(idOrSlug);
        if (template == null) return new List<CustomerUseCaseDto>();

        var customers = await _repository.GetCustomersAsync(template.Id);
        return customers.Adapt<List<CustomerUseCaseDto>>();
    }

    public async Task<List<TemplateListItemDto>> GetSimilarTemplatesAsync(string idOrSlug)
    {
        var template = await _repository.GetByIdOrSlugAsync(idOrSlug);
        if (template == null) return new List<TemplateListItemDto>();

        var similar = await _repository.GetSimilarAsync(template.Id);
        return similar.Select(t => {
            var dto = t.Adapt<TemplateListItemDto>();
            dto.MainImage = t.Media.OrderBy(m => m.SortOrder).FirstOrDefault()?.Src;
            return dto;
        }).ToList();
    }
    #endregion

    #region Admin
    public async Task<PagedResponse<TemplateDto>> GetAdminTemplatesAsync(
        int page, 
        int pageSize, 
        string? search = null,
        string? category = null, 
        TemplateType? type = null, 
        Audience? audience = null,
        TemplateStatus? status = null)
    {
        var result = await _repository.GetListAsync(page, pageSize, search, category, type, audience, null, null, null, null, null, null, "newest", includeDeleted: false);
        
        // Note: For admin we might want to see all statuses, repository GetListAsync already filters by status if not includeDeleted
        // But for admin we can pass status filter
        if (status.HasValue)
        {
            // Re-filtering for simplicity, though repo could handle it
        }

        return new PagedResponse<TemplateDto>
        {
            Items = result.Items.Adapt<List<TemplateDto>>(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<TemplateDto?> GetTemplateByIdAsync(Guid id)
    {
        var template = await _repository.GetByIdAsync(id);
        return template?.Adapt<TemplateDto>();
    }

    public async Task<TemplateDto> CreateTemplateAsync(CreateTemplateRequest request)
    {
        var template = request.Adapt<Template>();
        
        if (request.CategoryIds.Any())
        {
            var categories = await _categoryRepository.ListAsync();
            template.Categories = categories.Where(c => request.CategoryIds.Contains(c.Id)).ToList();
        }

        if (request.TagIds.Any())
        {
            var tags = await _tagRepository.ListAsync();
            template.Tags = tags.Where(t => request.TagIds.Contains(t.Id)).ToList();
        }

        await _repository.AddAsync(template);
        await _repository.SaveChangesAsync();
        
        return template.Adapt<TemplateDto>();
    }

    public async Task UpdateTemplateAsync(Guid id, CreateTemplateRequest request)
    {
        var template = await _repository.GetByIdAsync(id);
        if (template == null) throw new KeyNotFoundException("Template not found");

        request.Adapt(template);

        // Update Categories
        template.Categories.Clear();
        if (request.CategoryIds.Any())
        {
            var categories = await _categoryRepository.ListAsync();
            foreach (var c in categories.Where(c => request.CategoryIds.Contains(c.Id)))
                template.Categories.Add(c);
        }

        // Update Tags
        template.Tags.Clear();
        if (request.TagIds.Any())
        {
            var tags = await _tagRepository.ListAsync();
            foreach (var t in tags.Where(t => request.TagIds.Contains(t.Id)))
                template.Tags.Add(t);
        }

        await _repository.UpdateAsync(template);
        await _repository.SaveChangesAsync();
    }

    public async Task DeleteTemplateAsync(Guid id)
    {
        var template = await _repository.GetByIdAsync(id);
        if (template == null) return;

        await _repository.DeleteAsync(template);
        await _repository.SaveChangesAsync();
    }

    public async Task PublishTemplateAsync(Guid id)
    {
        var template = await _repository.GetByIdAsync(id);
        if (template == null) throw new KeyNotFoundException("Template not found");

        template.Status = TemplateStatus.Published;
        await _repository.UpdateAsync(template);
        await _repository.SaveChangesAsync();
    }

    public async Task UnpublishTemplateAsync(Guid id)
    {
        var template = await _repository.GetByIdAsync(id);
        if (template == null) throw new KeyNotFoundException("Template not found");

        template.Status = TemplateStatus.Draft;
        await _repository.UpdateAsync(template);
        await _repository.SaveChangesAsync();
    }

    public async Task UpdateTemplateMediaAsync(Guid id, List<TemplateMediaDto> media)
    {
        var entities = media.Adapt<List<TemplateMedia>>();
        await _repository.UpdateMediaAsync(id, entities);
    }

    public async Task UpdateTemplateCustomersAsync(Guid id, List<CustomerUseCaseDto> customers)
    {
        var entities = customers.Adapt<List<CustomerUseCase>>();
        await _repository.UpdateCustomersAsync(id, entities);
    }

    public async Task UpdateSimilarTemplatesAsync(Guid id, List<Guid> similarIds)
    {
        await _repository.UpdateSimilarAsync(id, similarIds);
    }

    public async Task RestoreTemplateAsync(Guid id)
    {
        await _repository.RestoreAsync(id);
    }
    #endregion
}
