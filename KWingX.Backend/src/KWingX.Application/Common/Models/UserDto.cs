using KWingX.Domain.Enums;

namespace KWingX.Application.Common.Models;

public class UserDto
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public bool IsActive { get; set; }
    public List<UserRole> Roles { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

