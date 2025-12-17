using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class Service : BaseEntity, IAggregateRoot
{
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Currency { get; set; } = "VND";
    public bool IsActive { get; set; } = true;
}

public class ApiKey : BaseEntity
{
    public Guid UserId { get; set; }
    public string Key { get; set; } = string.Empty;
    public KeyStatus Status { get; set; }
    public DateTime? RevokedAt { get; set; }
    public DateTime? LastUsedAt { get; set; }
}
