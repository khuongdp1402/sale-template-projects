using KWingX.Application.Common.Interfaces;

namespace KWingX.Application.Common.Models;

public class TenantContext : ITenantContext
{
    public Guid? TenantId { get; private set; }
    public string? TenantCode { get; private set; }
    public string? Host { get; private set; }

    public void SetTenant(Guid id, string code)
    {
        TenantId = id;
        TenantCode = code;
    }

    public void SetHost(string host)
    {
        Host = host;
    }
}
