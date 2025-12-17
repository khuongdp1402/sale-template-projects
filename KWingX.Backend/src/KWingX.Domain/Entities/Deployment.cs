using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class Deployment : BaseEntity, IAggregateRoot
{
    public DeploymentEnvironment Environment { get; set; }
    public DeploymentStatus Status { get; set; } = DeploymentStatus.Queued;
    public string? CommitHash { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public Guid? TriggeredByUserId { get; set; }
    public string? Logs { get; set; } // Deployment logs/output
}

