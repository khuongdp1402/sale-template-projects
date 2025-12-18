using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.MasterData;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using Mapster;

namespace KWingX.Application.Services;

public class MasterDataService : IMasterDataService
{
    private readonly ITemplateCategoryRepository _categoryRepository;
    private readonly ITemplateTagRepository _tagRepository;
    private readonly IServiceRepository _serviceRepository;

    public MasterDataService(
        ITemplateCategoryRepository categoryRepository,
        ITemplateTagRepository tagRepository,
        IServiceRepository serviceRepository)
    {
        _categoryRepository = categoryRepository;
        _tagRepository = tagRepository;
        _serviceRepository = serviceRepository;
    }

    #region Categories
    public async Task<PagedResponse<CategoryDto>> GetCategoriesAsync(int page, int pageSize, bool onlyActive = true)
    {
        var query = await _categoryRepository.ListAsync();
        var items = query.AsQueryable();

        if (onlyActive)
            items = items.Where(x => x.IsActive);

        var total = items.Count();
        var pagedItems = items
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Adapt<List<CategoryDto>>();

        return new PagedResponse<CategoryDto> { Items = pagedItems, Total = total, Page = page, PageSize = pageSize };
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(Guid id)
    {
        var entity = await _categoryRepository.GetByIdAsync(id);
        return entity?.Adapt<CategoryDto>();
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryRequest request)
    {
        var entity = request.Adapt<TemplateCategory>();
        await _categoryRepository.AddAsync(entity);
        await _categoryRepository.SaveChangesAsync();
        return entity.Adapt<CategoryDto>();
    }

    public async Task UpdateCategoryAsync(Guid id, CreateCategoryRequest request)
    {
        var entity = await _categoryRepository.GetByIdAsync(id);
        if (entity == null) throw new KeyNotFoundException("Category not found");

        request.Adapt(entity);
        await _categoryRepository.UpdateAsync(entity);
        await _categoryRepository.SaveChangesAsync();
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        var entity = await _categoryRepository.GetByIdAsync(id);
        if (entity == null) return;

        await _categoryRepository.DeleteAsync(entity);
        await _categoryRepository.SaveChangesAsync();
    }
    #endregion

    #region Tags
    public async Task<PagedResponse<TagDto>> GetTagsAsync(int page, int pageSize, bool onlyActive = true)
    {
        var query = await _tagRepository.ListAsync();
        var items = query.AsQueryable();

        if (onlyActive)
            items = items.Where(x => x.IsActive);

        var total = items.Count();
        var pagedItems = items
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Adapt<List<TagDto>>();

        return new PagedResponse<TagDto> { Items = pagedItems, Total = total, Page = page, PageSize = pageSize };
    }

    public async Task<TagDto?> GetTagByIdAsync(Guid id)
    {
        var entity = await _tagRepository.GetByIdAsync(id);
        return entity?.Adapt<TagDto>();
    }

    public async Task<TagDto> CreateTagAsync(CreateTagRequest request)
    {
        var entity = request.Adapt<TemplateTag>();
        await _tagRepository.AddAsync(entity);
        await _tagRepository.SaveChangesAsync();
        return entity.Adapt<TagDto>();
    }

    public async Task UpdateTagAsync(Guid id, CreateTagRequest request)
    {
        var entity = await _tagRepository.GetByIdAsync(id);
        if (entity == null) throw new KeyNotFoundException("Tag not found");

        request.Adapt(entity);
        await _tagRepository.UpdateAsync(entity);
        await _tagRepository.SaveChangesAsync();
    }

    public async Task DeleteTagAsync(Guid id)
    {
        var entity = await _tagRepository.GetByIdAsync(id);
        if (entity == null) return;

        await _tagRepository.DeleteAsync(entity);
        await _tagRepository.SaveChangesAsync();
    }
    #endregion

    #region Services
    public async Task<PagedResponse<ServiceDto>> GetServicesAsync(int page, int pageSize, string? category = null, bool onlyActive = true)
    {
        var query = await _serviceRepository.ListAsync();
        var items = query.AsQueryable();

        if (onlyActive)
            items = items.Where(x => x.IsActive);

        if (!string.IsNullOrEmpty(category))
            items = items.Where(x => x.Category == category);

        var total = items.Count();
        var pagedItems = items
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Adapt<List<ServiceDto>>();

        return new PagedResponse<ServiceDto> { Items = pagedItems, Total = total, Page = page, PageSize = pageSize };
    }

    public async Task<ServiceDto?> GetServiceByIdAsync(Guid id)
    {
        var entity = await _serviceRepository.GetByIdAsync(id);
        return entity?.Adapt<ServiceDto>();
    }

    public async Task<ServiceDto?> GetServiceBySlugAsync(string slug)
    {
        var entity = await _serviceRepository.GetBySlugAsync(slug);
        return entity?.Adapt<ServiceDto>();
    }

    public async Task<ServiceDto> CreateServiceAsync(CreateServiceRequest request)
    {
        var entity = request.Adapt<Service>();
        await _serviceRepository.AddAsync(entity);
        await _serviceRepository.SaveChangesAsync();
        return entity.Adapt<ServiceDto>();
    }

    public async Task UpdateServiceAsync(Guid id, CreateServiceRequest request)
    {
        var entity = await _serviceRepository.GetByIdAsync(id);
        if (entity == null) throw new KeyNotFoundException("Service not found");

        request.Adapt(entity);
        await _serviceRepository.UpdateAsync(entity);
        await _serviceRepository.SaveChangesAsync();
    }

    public async Task DeleteServiceAsync(Guid id)
    {
        var entity = await _serviceRepository.GetByIdAsync(id);
        if (entity == null) return;

        await _serviceRepository.DeleteAsync(entity);
        await _serviceRepository.SaveChangesAsync();
    }
    #endregion
}
