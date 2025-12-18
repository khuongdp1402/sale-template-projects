using KWingX.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace KWingX.WebApi.Middleware;

public class TenantMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<TenantMiddleware> _logger;

    public TenantMiddleware(RequestDelegate next, ILogger<TenantMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, ITenantResolver tenantResolver, ITenantContext tenantContext)
    {
        var path = context.Request.Path;
        tenantContext.SetHost(context.Request.Host.Host);

        // Skip tenant resolution for admin routes
        if (path.StartsWithSegments("/api/v1/admin"))
        {
            await _next(context);
            return;
        }

        var tenantInfo = await tenantResolver.ResolveAsync(context);
        if (tenantInfo != null)
        {
            tenantContext.SetTenant(tenantInfo.Id, tenantInfo.Code);
            
            // Add tenant info to response headers for debugging/traceability
            context.Response.Headers.Append("X-Tenant-Id", tenantInfo.Id.ToString());
            context.Response.Headers.Append("X-Tenant-Code", tenantInfo.Code);
        }
        else
        {
            // Optional: If tenant is required for non-admin routes, we could return 404 here.
            // But for now, we'll let it pass and see if services handle null TenantId.
            _logger.LogTrace("No tenant resolved for path: {Path}", path);
        }

        await _next(context);
    }
}
