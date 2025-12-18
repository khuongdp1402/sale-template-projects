namespace KWingX.Domain.Enums;

public enum TemplateType
{
    Service,
    Ecommerce,
    Landing
}

public enum Audience
{
    B2B,
    B2C,
    Both
}

public enum MediaType
{
    Image,
    Video
}

public enum PurchaseType
{
    Template,
    Service
}

public enum PurchaseStatus
{
    Active,
    Revoked,
    Expired
}

public enum KeyStatus
{
    Active,
    Revoked
}

public enum UserRole
{
    SuperAdmin,
    Admin,
    Editor,
    Support,
    Finance,
    Ops
}

public enum TemplateStatus
{
    Draft,
    Published,
    Archived
}

public enum BlogPostStatus
{
    Draft,
    Published
}

public enum OrderStatus
{
    Pending,
    Processing,
    Completed,
    Cancelled,
    Refunded
}

public enum PaymentStatus
{
    Pending,
    Success,
    Failed
}

public enum LogType
{
    Payment,
    Deploy,
    Infra,
    Provision,
    Webhook,
    Contact
}

public enum LogSeverity
{
    Info,
    Warn,
    Error
}

public enum ContactRequestStatus
{
    New,
    InProgress,
    Done
}

public enum TenantStatus
{
    Active,
    Suspended,
    Inactive
}

public enum DeploymentStatus
{
    Queued,
    Running,
    Success,
    Failed
}

public enum DeploymentEnvironment
{
    Dev,
    Staging,
    Prod
}