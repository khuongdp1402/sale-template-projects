using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class Payment : AuditableEntity, IAggregateRoot
{
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "VND";
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public string Provider { get; set; } = string.Empty; // e.g., "VNPay", "Stripe", "PayPal"
    public string? ProviderReference { get; set; }
    public string? ErrorCode { get; set; }
    public string? ErrorMessage { get; set; }
}

