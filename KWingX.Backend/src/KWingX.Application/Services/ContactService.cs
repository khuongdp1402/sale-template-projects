using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Contacts;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using Mapster;

namespace KWingX.Application.Services;

public class ContactService : IContactService
{
    private readonly IContactRequestRepository _contactRepository;
    private readonly ILogRepository _logRepository;

    public ContactService(IContactRequestRepository contactRepository, ILogRepository logRepository)
    {
        _contactRepository = contactRepository;
        _logRepository = logRepository;
    }

    public async Task CreateContactRequestAsync(CreateContactRequest request)
    {
        var contact = request.Adapt<ContactRequest>();
        contact.Status = ContactRequestStatus.New;

        await _contactRepository.AddAsync(contact);
        await _contactRepository.SaveChangesAsync();

        // Log the contact request
        var log = new Log
        {
            Type = LogType.Contact,
            Severity = LogSeverity.Info,
            Message = $"New contact request from {contact.Name} ({contact.EmailOrPhone})",
            DataJson = System.Text.Json.JsonSerializer.Serialize(new { 
                contact.Id, 
                contact.Source, 
                contact.PageUrl 
            })
        };

        await _logRepository.AddAsync(log);
        await _logRepository.SaveChangesAsync();
    }

    public async Task<PagedResponse<ContactRequestDto>> GetAdminContactRequestsAsync(int page, int pageSize, ContactRequestStatus? status = null, string? search = null)
    {
        var result = await _contactRepository.GetListAsync(page, pageSize, status, search);
        return new PagedResponse<ContactRequestDto>
        {
            Items = result.Items.Adapt<List<ContactRequestDto>>(),
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<ContactRequestDto?> GetContactRequestByIdAsync(Guid id)
    {
        var contact = await _contactRepository.GetByIdAsync(id);
        return contact?.Adapt<ContactRequestDto>();
    }

    public async Task UpdateContactStatusAsync(Guid id, ContactRequestStatus status)
    {
        var contact = await _contactRepository.GetByIdAsync(id);
        if (contact == null) throw new KeyNotFoundException("Contact request not found");

        contact.Status = status;
        await _contactRepository.UpdateAsync(contact);
        await _contactRepository.SaveChangesAsync();
    }

    public async Task UpdateContactNotesAsync(Guid id, string? notes)
    {
        var contact = await _contactRepository.GetByIdAsync(id);
        if (contact == null) throw new KeyNotFoundException("Contact request not found");

        contact.Notes = notes;
        await _contactRepository.UpdateAsync(contact);
        await _contactRepository.SaveChangesAsync();
    }
}
