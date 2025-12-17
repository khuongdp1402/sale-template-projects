using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class ContactRequest : BaseEntity, IAggregateRoot
{
    public string Name { get; set; } = string.Empty;
    public string EmailOrPhone { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string? Source { get; set; } // e.g., "landing", "contact-page", "blog"
    public string? PageUrl { get; set; }
    public ContactRequestStatus Status { get; set; } = ContactRequestStatus.New;
    public string? Notes { get; set; } // Internal notes for admin
}

