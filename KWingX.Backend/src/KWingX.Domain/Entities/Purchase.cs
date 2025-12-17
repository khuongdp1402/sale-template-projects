using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class Purchase : BaseEntity, IAggregateRoot
{
    public Guid UserId { get; set; }
    public PurchaseType PurchaseType { get; set; }
    public Guid? TemplateId { get; set; }
    public Guid? ServiceId { get; set; }
    public PurchaseStatus Status { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; } = "VND";
    public DateTime PurchasedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ExpiresAt { get; set; }
    
    public ICollection<LicenseKey> LicenseKeys { get; set; } = new List<LicenseKey>();
}

public class LicenseKey : BaseEntity
{
    public Guid PurchaseId { get; set; }
    public string Key { get; set; } = string.Empty;
    public KeyStatus Status { get; set; }
    public DateTime? RevokedAt { get; set; }
}
