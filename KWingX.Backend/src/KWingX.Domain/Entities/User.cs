using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class User : BaseEntity, IAggregateRoot
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public string? GoogleSubjectId { get; set; }
    public string? Phone { get; set; }
    
    // Roles: Store as CSV string for simplicity (MVP approach)
    // Format: "SuperAdmin,Admin" or single role
    public string RolesCsv { get; set; } = string.Empty;
    
    public ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
}

public class UserRole : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Enums.UserRole Role { get; set; }
}
