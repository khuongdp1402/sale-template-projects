using KWingX.Domain.Common;
using KWingX.Domain.Enums;

namespace KWingX.Domain.Entities;

public class DeploymentTarget : AuditableEntity, IAggregateRoot
{
    public string Name { get; set; } = string.Empty;
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; } = 22;
    public string Username { get; set; } = string.Empty;
    public string? Password { get; set; }
    public string? SshKey { get; set; }
    public string BasePath { get; set; } = "/opt/kwingx/sites";
    public bool IsActive { get; set; } = true;
}

public class CustomerSite : AuditableEntity, IAggregateRoot
{
    public Guid? TenantId { get; set; }
    public Guid UserId { get; set; }
    public Guid TemplateId { get; set; }
    public Template Template { get; set; } = null!;
    
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public string? CustomDomain { get; set; }
    public CustomerSiteStatus Status { get; set; } = CustomerSiteStatus.Provisioning;
    
    public Guid DeploymentTargetId { get; set; }
    public DeploymentTarget DeploymentTarget { get; set; } = null!;
    
    public string? ContainerId { get; set; }
    public string? InternalPort { get; set; }
}

public enum CustomerSiteStatus
{
    Provisioning,
    Active,
    Stopped,
    Failed,
    Removed
}

public class DeploymentJob : AuditableEntity, IAggregateRoot
{
    public Guid SiteId { get; set; }
    public CustomerSite Site { get; set; } = null!;
    
    public DeploymentJobType Type { get; set; }
    public DeploymentStatus Status { get; set; } = DeploymentStatus.Queued;
    
    public string? CorrelationId { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public string? ErrorMessage { get; set; }
}

public enum DeploymentJobType
{
    Deploy,
    Redeploy,
    Stop,
    Start,
    Remove
}
