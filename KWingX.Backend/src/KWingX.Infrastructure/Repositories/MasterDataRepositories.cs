using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class TemplateCategoryRepository : BaseRepository<TemplateCategory>, ITemplateCategoryRepository
{
    public TemplateCategoryRepository(AppDbContext context, ILoggerFactory loggerFactory) : base(context, loggerFactory) { }
    
    public async Task<TemplateCategory?> GetBySlugAsync(string slug)
    {
        return await _dbSet.FirstOrDefaultAsync(c => c.Slug == slug);
    }
}

public class TemplateTagRepository : BaseRepository<TemplateTag>, ITemplateTagRepository
{
    public TemplateTagRepository(AppDbContext context, ILoggerFactory loggerFactory) : base(context, loggerFactory) { }
}

public class ServiceRepository : BaseRepository<Service>, IServiceRepository
{
    public ServiceRepository(AppDbContext context, ILoggerFactory loggerFactory) : base(context, loggerFactory) { }
    
    public async Task<Service?> GetBySlugAsync(string slug)
    {
        return await _dbSet.FirstOrDefaultAsync(s => s.Slug == slug);
    }
}
