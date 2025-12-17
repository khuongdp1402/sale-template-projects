using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Repositories;

public interface IOrderRepository : IRepository<Order>
{
    Task<PagedResponse<Order>> GetListAsync(int page, int pageSize, OrderStatus? status = null, DateTime? dateFrom = null, DateTime? dateTo = null, string? search = null, bool includeDeleted = false);
}


