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

    public async Task<PagedResponse<BlogPost>> GetListAsync(int page, int pageSize, BlogPostStatus? status = null, string? category = null, string? search = null, string? sort = null, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        if (status.HasValue)
            query = query.Where(b => b.Status == status.Value);
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(b => b.Category == category);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(b => b.Title.Contains(search) || b.Excerpt.Contains(search));

        // Sorting
        query = sort switch
        {
            "views" => query.OrderByDescending(b => b.Views),
            "trending" => query.OrderByDescending(b => b.Views).ThenByDescending(b => b.PublishedAt), // Simple trending logic
            _ => query.OrderByDescending(b => b.PublishedAt)
        };
        
        var total = await query.CountAsync();
        var items = await query
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
            .Where(b => b.Status == BlogPostStatus.Published)
            .OrderByDescending(b => b.Views)
            .Take(count)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<List<string>> GetCategoriesAsync()
    {
        return await _dbSet
            .Where(b => b.Status == BlogPostStatus.Published)
            .Select(b => b.Category)
            .Distinct()
            .ToListAsync();
    }

    public async Task IncrementViewsAsync(Guid id)
    {
        await _context.Database.ExecuteSqlRawAsync(
            "UPDATE \"BlogPosts\" SET \"Views\" = \"Views\" + 1 WHERE \"Id\" = {0}", id);
    }
}
