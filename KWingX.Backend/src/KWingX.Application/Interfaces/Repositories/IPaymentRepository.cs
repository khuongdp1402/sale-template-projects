using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Repositories;

public interface IPaymentRepository : IRepository<Payment>
{
    Task<PagedResponse<Payment>> GetListAsync(int page, int pageSize, PaymentStatus? status = null, string? provider = null, DateTime? dateFrom = null, DateTime? dateTo = null, bool includeDeleted = false);
    Task<List<Payment>> GetFailuresLast24hAsync();
}


