namespace KWingX.Application.Common.Interfaces;

public interface ITenantContext
{
    Guid? TenantId { get; }
    string? TenantCode { get; }
    string? Host { get; }
    void SetTenant(Guid id, string code);
    void SetHost(string host);
}
