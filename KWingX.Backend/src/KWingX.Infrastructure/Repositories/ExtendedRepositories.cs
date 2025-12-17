using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

// Extended Template Repository (for backward compatibility)
public class TemplateRepositoryExtended : TemplateRepository, ITemplateRepositoryExtended
{
    public TemplateRepositoryExtended(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public new async Task<PagedResponse<Template>> GetAdminListAsync(int page, int pageSize, string? search, string? category, TemplateType? type, Audience? audience, TemplateStatus? status, bool includeDeleted = false)
    {
        var query = _context.Templates
            .Include(t => t.Categories)
            .Include(t => t.Tags)
            .Include(t => t.Media)
            .AsQueryable();

        // If includeDeleted is true, ignore query filters to show deleted items
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

    public async Task AddAsync(Template template)
    {
        await _context.Templates.AddAsync(template);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Template template)
    {
        _context.Templates.Update(template);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var template = await _context.Templates.FindAsync(id);
        if (template != null)
        {
            _context.Templates.Remove(template);
            await _context.SaveChangesAsync();
        }
    }
}

