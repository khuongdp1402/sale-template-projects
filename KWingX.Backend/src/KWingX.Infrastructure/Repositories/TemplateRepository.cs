using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class TemplateRepository : BaseRepository<Template>, ITemplateRepository
{
    public TemplateRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<Template?> GetBySlugAsync(string slug, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(t => t.Categories)
            .Include(t => t.Tags)
            .Include(t => t.Media)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(t => t.Slug == slug);
    }

    public override async Task<Template?> GetByIdAsync(Guid id, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(t => t.Categories)
            .Include(t => t.Tags)
            .Include(t => t.Media)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<PagedResponse<Template>> GetListAsync(int page, int pageSize, string? category = null, TemplateType? type = null, Audience? audience = null, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(t => t.Categories)
            .Include(t => t.Tags)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        else
            query = query.Where(t => t.Status == TemplateStatus.Published);
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(t => t.Categories.Any(c => c.Slug == category));
        
        if (type.HasValue)
            query = query.Where(t => t.TemplateType == type.Value);
        
        if (audience.HasValue)
            query = query.Where(t => t.Audience == audience.Value);
        
        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(t => t.PopularityScore)
            .ThenByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();
        
        return new PagedResponse<Template>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }

    public async Task<PagedResponse<Template>> GetAdminListAsync(int page, int pageSize, string? search = null, string? category = null, TemplateType? type = null, Audience? audience = null, TemplateStatus? status = null, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(t => t.Categories)
            .Include(t => t.Tags)
            .Include(t => t.Media)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        if (!string.IsNullOrEmpty(search))
            query = query.Where(t => t.Name.Contains(search) || t.ShortDescription.Contains(search));
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(t => t.Categories.Any(c => c.Slug == category));
        
        if (type.HasValue)
            query = query.Where(t => t.TemplateType == type.Value);
        
        if (audience.HasValue)
            query = query.Where(t => t.Audience == audience.Value);
        
        if (status.HasValue)
            query = query.Where(t => t.Status == status.Value);
        
        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(t => t.Id) // Sort by Id (newest first)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        
        return new PagedResponse<Template>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }

    public async Task<List<Template>> GetFeaturedAsync(int count)
    {
        return await _dbSet
            .Where(t => (t.IsHot || t.IsPopular) && t.Status == TemplateStatus.Published)
            .OrderByDescending(t => t.PopularityScore)
            .Take(count)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task RestoreAsync(Guid id)
    {
        var template = await _dbSet
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == id && t.IsDeleted);
        
        if (template != null)
        {
            template.IsDeleted = false;
            _dbSet.Update(template);
            await SaveChangesAsync();
        }
    }
}

