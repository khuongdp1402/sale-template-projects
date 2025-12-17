using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Repositories;

public interface IContactRequestRepository : IRepository<ContactRequest>
{
    Task<PagedResponse<ContactRequest>> GetListAsync(int page, int pageSize, ContactRequestStatus? status = null, string? search = null, bool includeDeleted = false);
}


