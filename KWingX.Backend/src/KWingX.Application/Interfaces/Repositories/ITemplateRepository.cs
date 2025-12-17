using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Repositories;

public interface ITemplateRepository : IRepository<Template>
{
    Task<Template?> GetBySlugAsync(string slug, bool includeDeleted = false);
    Task<PagedResponse<Template>> GetListAsync(int page, int pageSize, string? category = null, TemplateType? type = null, Audience? audience = null, bool includeDeleted = false);
    Task<PagedResponse<Template>> GetAdminListAsync(int page, int pageSize, string? search = null, string? category = null, TemplateType? type = null, Audience? audience = null, TemplateStatus? status = null, bool includeDeleted = false);
    Task<List<Template>> GetFeaturedAsync(int count);
    Task RestoreAsync(Guid id);
}


