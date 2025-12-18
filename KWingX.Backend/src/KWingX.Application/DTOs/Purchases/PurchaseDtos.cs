using KWingX.Domain.Enums;

namespace KWingX.Application.DTOs.Purchases;

public class PurchaseDto
{
    public Guid Id { get; set; }
    public PurchaseType PurchaseType { get; set; }
    public Guid? TemplateId { get; set; }
    public string? TemplateName { get; set; }
    public Guid? ServiceId { get; set; }
    public string? ServiceName { get; set; }
    public PurchaseStatus Status { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; } = "VND";
    public DateTime PurchasedAt { get; set; }
    public DateTime? ExpiresAt { get; set; }
}

public class LicenseKeyDto
{
    public Guid Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public KeyStatus Status { get; set; }
    public DateTime? RevokedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}
