using KWingX.Domain.Common;

namespace KWingX.Domain.Entities;

public class User : BaseEntity, IAggregateRoot
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public string? GoogleSubjectId { get; set; }
    public string? Phone { get; set; }
}
