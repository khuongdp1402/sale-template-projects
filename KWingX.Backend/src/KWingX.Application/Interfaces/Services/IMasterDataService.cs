using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.MasterData;

namespace KWingX.Application.Interfaces.Services;

public interface IMasterDataService
{
    // Categories
    Task<PagedResponse<CategoryDto>> GetCategoriesAsync(int page, int pageSize, bool onlyActive = true);
    Task<CategoryDto?> GetCategoryByIdAsync(Guid id);
    Task<CategoryDto> CreateCategoryAsync(CreateCategoryRequest request);
    Task UpdateCategoryAsync(Guid id, CreateCategoryRequest request);
    Task DeleteCategoryAsync(Guid id);

    // Tags
    Task<PagedResponse<TagDto>> GetTagsAsync(int page, int pageSize, bool onlyActive = true);
    Task<TagDto?> GetTagByIdAsync(Guid id);
    Task<TagDto> CreateTagAsync(CreateTagRequest request);
    Task UpdateTagAsync(Guid id, CreateTagRequest request);
    Task DeleteTagAsync(Guid id);

    // Services
    Task<PagedResponse<ServiceDto>> GetServicesAsync(int page, int pageSize, string? category = null, bool onlyActive = true);
    Task<ServiceDto?> GetServiceByIdAsync(Guid id);
    Task<ServiceDto?> GetServiceBySlugAsync(string slug);
    Task<ServiceDto> CreateServiceAsync(CreateServiceRequest request);
    Task UpdateServiceAsync(Guid id, CreateServiceRequest request);
    Task DeleteServiceAsync(Guid id);
}
