using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Repositories;

public interface ILogRepository : IRepository<Log>
{
    Task<PagedResponse<Log>> GetListAsync(int page, int pageSize, LogType? type = null, LogSeverity? severity = null, DateTime? dateFrom = null, DateTime? dateTo = null, string? search = null, bool includeDeleted = false);
}


