using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces.Repositories;

public interface ITemplateCategoryRepository : IRepository<TemplateCategory>
{
    Task<TemplateCategory?> GetBySlugAsync(string slug);
}

public interface ITemplateTagRepository : IRepository<TemplateTag>
{
}

public interface IServiceRepository : IRepository<Service>
{
    Task<Service?> GetBySlugAsync(string slug);
}
