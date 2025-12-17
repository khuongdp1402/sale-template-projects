using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class OrderRepository : BaseRepository<Order>, IOrderRepository
{
    public OrderRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<PagedResponse<Order>> GetListAsync(int page, int pageSize, OrderStatus? status = null, DateTime? dateFrom = null, DateTime? dateTo = null, string? search = null, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(o => o.Items)
            .Include(o => o.Payments)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        if (status.HasValue)
            query = query.Where(o => o.Status == status.Value);
        
        // Note: If entities need date filtering, add CreatedAt to entity or use another date field
        // For now, date filtering is skipped as entities don't have CreatedAt
        
        if (!string.IsNullOrEmpty(search))
            query = query.Where(o => o.UserEmail.Contains(search) || o.Id.ToString().Contains(search));
        
        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(o => o.Id) // Sort by Id (newest first)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();
        
        return new PagedResponse<Order>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }

    public override async Task<Order?> GetByIdAsync(Guid id, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(o => o.Items)
            .Include(o => o.Payments)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        return await query.FirstOrDefaultAsync(o => o.Id == id);
    }
}

