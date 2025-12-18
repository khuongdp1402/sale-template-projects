using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class Log : AuditableEntity, IAggregateRoot
{
    public LogType Type { get; set; }
    public LogSeverity Severity { get; set; } = LogSeverity.Info;
    public string Message { get; set; } = string.Empty;
    public string? DataJson { get; set; } // Additional metadata as JSON
    public string? CorrelationId { get; set; } // For tracking related logs
}

