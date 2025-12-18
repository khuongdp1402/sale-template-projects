using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Contacts;
using KWingX.Domain.Enums;

namespace KWingX.Application.Interfaces.Services;

public interface IContactService
{
    // Portal
    Task CreateContactRequestAsync(CreateContactRequest request);

    // Admin
    Task<PagedResponse<ContactRequestDto>> GetAdminContactRequestsAsync(int page, int pageSize, ContactRequestStatus? status = null, string? search = null);
    Task<ContactRequestDto?> GetContactRequestByIdAsync(Guid id);
    Task UpdateContactStatusAsync(Guid id, ContactRequestStatus status);
    Task UpdateContactNotesAsync(Guid id, string? notes);
}
