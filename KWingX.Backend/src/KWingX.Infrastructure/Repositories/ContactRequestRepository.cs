using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class ContactRequestRepository : BaseRepository<ContactRequest>, IContactRequestRepository
{
    public ContactRequestRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<PagedResponse<ContactRequest>> GetListAsync(int page, int pageSize, ContactRequestStatus? status = null, string? search = null, bool includeDeleted = false)
    {
        var query = _dbSet.AsQueryable();
        
        if (includeDeleted)
            query = query.IgnoreQueryFilters();
        
        if (status.HasValue)
            query = query.Where(c => c.Status == status.Value);
        
        if (!string.IsNullOrEmpty(search))
            query = query.Where(c => c.Name.Contains(search) || c.EmailOrPhone.Contains(search) || c.Message.Contains(search));
        
        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(c => c.Id) // Sort by Id (newest first)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();
        
        return new PagedResponse<ContactRequest>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            Total = total
        };
    }
}

