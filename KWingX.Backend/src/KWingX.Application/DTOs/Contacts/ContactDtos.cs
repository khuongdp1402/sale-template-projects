using KWingX.Domain.Enums;

namespace KWingX.Application.DTOs.Contacts;

public class ContactRequestDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string EmailOrPhone { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string? Source { get; set; }
    public string? PageUrl { get; set; }
    public ContactRequestStatus Status { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateContactRequest
{
    public string Name { get; set; } = string.Empty;
    public string EmailOrPhone { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string? Source { get; set; }
    public string? PageUrl { get; set; }
}

public class UpdateContactStatusRequest
{
    public ContactRequestStatus Status { get; set; }
}

public class UpdateContactNotesRequest
{
    public string? Notes { get; set; }
}
