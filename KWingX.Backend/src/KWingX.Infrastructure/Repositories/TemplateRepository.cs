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

    public async Task<Template?> GetByIdOrSlugAsync(string idOrSlug, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(t => t.Categories)
            .Include(t => t.Tags)
            .Include(t => t.Media)
            .Include(t => t.CustomerUseCases)
            .Include(t => t.SimilarTemplates)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();

        if (Guid.TryParse(idOrSlug, out var id))
            return await query.FirstOrDefaultAsync(t => t.Id == id);
        
        return await query.FirstOrDefaultAsync(t => t.Slug == idOrSlug);
    }

    public async Task<PagedResponse<Template>> GetListAsync(
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
        string? sort = null,
        bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(t => t.Categories)
            .Include(t => t.Media)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        else
            query = query.Where(t => t.Status == TemplateStatus.Published);
        
        if (!string.IsNullOrEmpty(search))
            query = query.Where(t => t.Name.Contains(search) || t.ShortDescription.Contains(search));

        if (!string.IsNullOrEmpty(category))
            query = query.Where(t => t.Categories.Any(c => c.Slug == category));
        
        if (type.HasValue)
            query = query.Where(t => t.TemplateType == type.Value);
        
        if (audience.HasValue)
            query = query.Where(t => t.Audience == audience.Value);

        if (priceMin.HasValue)
            query = query.Where(t => t.Price >= priceMin.Value);

        if (priceMax.HasValue)
            query = query.Where(t => t.Price <= priceMax.Value);

        if (hot.HasValue && hot.Value)
            query = query.Where(t => t.IsHot);

        if (isNew.HasValue && isNew.Value)
            query = query.Where(t => t.IsNew);

        if (popular.HasValue && popular.Value)
            query = query.Where(t => t.IsPopular);

        if (discount.HasValue && discount.Value)
            query = query.Where(t => t.OriginalPrice.HasValue && t.OriginalPrice > t.Price);

        // Sorting
        query = sort switch
        {
            "price_asc" => query.OrderBy(t => t.Price),
            "price_desc" => query.OrderByDescending(t => t.Price),
            "popularity" => query.OrderByDescending(t => t.PopularityScore),
            "newest" => query.OrderByDescending(t => t.CreatedAt),
            _ => query.OrderByDescending(t => t.PopularityScore).ThenByDescending(t => t.CreatedAt)
        };
        
        var total = await query.CountAsync();
        var items = await query
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

    public async Task<List<TemplateMedia>> GetMediaAsync(Guid templateId)
    {
        return await _context.TemplateMedia
            .Where(m => m.TemplateId == templateId)
            .OrderBy(m => m.SortOrder)
            .ToListAsync();
    }

    public async Task<List<CustomerUseCase>> GetCustomersAsync(Guid templateId)
    {
        return await _context.CustomerUseCases
            .Where(c => c.TemplateId == templateId)
            .ToListAsync();
    }

    public async Task<List<Template>> GetSimilarAsync(Guid templateId)
    {
        var template = await _dbSet
            .Include(t => t.SimilarTemplates)
            .FirstOrDefaultAsync(t => t.Id == templateId);

        return template?.SimilarTemplates.ToList() ?? new List<Template>();
    }

    public async Task UpdateMediaAsync(Guid templateId, List<TemplateMedia> media)
    {
        var existing = await _context.TemplateMedia.Where(m => m.TemplateId == templateId).ToListAsync();
        _context.TemplateMedia.RemoveRange(existing);
        
        foreach (var m in media)
        {
            m.TemplateId = templateId;
        }
        await _context.TemplateMedia.AddRangeAsync(media);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateCustomersAsync(Guid templateId, List<CustomerUseCase> customers)
    {
        var existing = await _context.CustomerUseCases.Where(c => c.TemplateId == templateId).ToListAsync();
        _context.CustomerUseCases.RemoveRange(existing);
        
        foreach (var c in customers)
        {
            c.TemplateId = templateId;
        }
        await _context.CustomerUseCases.AddRangeAsync(customers);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateSimilarAsync(Guid templateId, List<Guid> similarIds)
    {
        var template = await _dbSet
            .Include(t => t.SimilarTemplates)
            .FirstOrDefaultAsync(t => t.Id == templateId);

        if (template != null)
        {
            template.SimilarTemplates.Clear();
            var similar = await _dbSet.Where(t => similarIds.Contains(t.Id)).ToListAsync();
            foreach (var s in similar)
            {
                template.SimilarTemplates.Add(s);
            }
            await _context.SaveChangesAsync();
        }
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
