using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class PaymentRepository : BaseRepository<Payment>, IPaymentRepository
{
    public PaymentRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<PagedResponse<Payment>> GetListAsync(int page, int pageSize, PaymentStatus? status = null, string? provider = null, DateTime? dateFrom = null, DateTime? dateTo = null, bool includeDeleted = false)
    {
        var query = _dbSet
            .Include(p => p.Order)
            .AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        if (status.HasValue)
            query = query.Where(p => p.Status == status.Value);
        
        if (!string.IsNullOrEmpty(provider))
            query = query.Where(p => p.Provider == provider);
        
        // Note: If entities need date filtering, add CreatedAt to entity or use another date field
        // For now, date filtering is skipped as entities don't have CreatedAt
        
        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.Id) // Sort by Id (newest first)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();
        
        return new PagedResponse<Payment>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }

    public async Task<List<Payment>> GetFailuresLast24hAsync()
    {
        // Note: This requires CreatedAt field on Payment entity or use another date field
        // For now, return all failed payments
        return await _dbSet
            .Where(p => p.Status == PaymentStatus.Failed)
            .OrderByDescending(p => p.Id)
            .AsNoTracking()
            .ToListAsync();
    }
}

