using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class BlogRepository : BaseRepository<BlogPost>, IBlogRepository
{
    public BlogRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<BlogPost?> GetBySlugAsync(string slug, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(b => b.Slug == slug);
    }

    public async Task<PagedResponse<BlogPost>> GetListAsync(int page, int pageSize, BlogPostStatus? status = null, string? category = null, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        // Only published posts for portal (unless includeDeleted)
        if (!includeDeleted)
            query = query.Where(b => b.Status == BlogPostStatus.Published);
        else if (status.HasValue)
            query = query.Where(b => b.Status == status.Value);
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(b => b.Category == category);
        
        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(b => b.PublishedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();
        
        return new PagedResponse<BlogPost>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }

    public async Task<List<BlogPost>> GetFeaturedAsync(int count)
    {
        return await _dbSet
            .Where(b => b.IsFeatured && b.Status == BlogPostStatus.Published)
            .OrderByDescending(b => b.PublishedAt)
            .Take(count)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<List<BlogPost>> GetTrendingAsync(int count)
    {
        return await _dbSet
            .Where(b => b.IsTrending && b.Status == BlogPostStatus.Published)
            .OrderByDescending(b => b.Views)
            .Take(count)
            .AsNoTracking()
            .ToListAsync();
    }
}


