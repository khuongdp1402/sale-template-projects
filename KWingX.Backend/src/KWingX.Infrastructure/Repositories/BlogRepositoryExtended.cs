using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KWingX.Infrastructure.Repositories;

public class BlogRepositoryExtended : BlogRepository, IBlogRepositoryExtended
{
    public BlogRepositoryExtended(AppDbContext context) : base(context) { }

    public async Task<PagedResponse<BlogPost>> GetAdminListAsync(int page, int pageSize, string? search, string? category, BlogPostStatus? status, bool includeDeleted = false)
    {
        var query = _context.BlogPosts.AsQueryable();

        // If includeDeleted is true, ignore query filters to show deleted items
        if (includeDeleted)
            query = query.IgnoreQueryFilters();

        if (!string.IsNullOrEmpty(search))
            query = query.Where(b => b.Title.Contains(search) || b.Excerpt.Contains(search));

        if (!string.IsNullOrEmpty(category))
            query = query.Where(b => b.Category == category);

        if (status.HasValue)
            query = query.Where(b => b.Status == status.Value);

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(b => b.PublishedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResponse<BlogPost>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }

    public async Task AddAsync(BlogPost post)
    {
        await _context.BlogPosts.AddAsync(post);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(BlogPost post)
    {
        _context.BlogPosts.Update(post);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post != null)
        {
            // Remove will be intercepted by SoftDeleteSaveChangesInterceptor
            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }

    public async Task RestoreAsync(Guid id)
    {
        var post = await _context.BlogPosts
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(b => b.Id == id && b.IsDeleted);
        
        if (post != null)
        {
            post.IsDeleted = false;
            _context.BlogPosts.Update(post);
            await _context.SaveChangesAsync();
        }
    }
}

