using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class LogRepository : BaseRepository<Log>, ILogRepository
{
    public LogRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<PagedResponse<Log>> GetListAsync(int page, int pageSize, LogType? type = null, LogSeverity? severity = null, DateTime? dateFrom = null, DateTime? dateTo = null, string? search = null, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        if (type.HasValue)
            query = query.Where(l => l.Type == type.Value);
        
        if (severity.HasValue)
            query = query.Where(l => l.Severity == severity.Value);
        
        // Note: If entities need date filtering, add CreatedAt to entity or use another date field
        // For now, date filtering is skipped as entities don't have CreatedAt
        
        if (!string.IsNullOrEmpty(search))
            query = query.Where(l => l.Message.Contains(search));
        
        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(l => l.Id) // Sort by Id (newest first)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();
        
        return new PagedResponse<Log>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }
}

