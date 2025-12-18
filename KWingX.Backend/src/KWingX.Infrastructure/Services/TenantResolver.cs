using KWingX.Application.Common.Interfaces;
using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Services;

public class TenantResolver : ITenantResolver
{
    private readonly ITenantRepository _tenantRepository;
    private readonly ILogger<TenantResolver> _logger;

    public TenantResolver(ITenantRepository tenantRepository, ILogger<TenantResolver> logger)
    {
        _tenantRepository = tenantRepository;
        _logger = logger;
    }

    public async Task<TenantInfo?> ResolveAsync(HttpContext context)
    {
        var host = context.Request.Host.Host;
        
        // 1. Try by custom domain
        var tenant = await _tenantRepository.GetByCustomDomainAsync(host);
        if (tenant != null)
        {
            return new TenantInfo { Id = tenant.Id, Code = tenant.Code };
        }

        // 2. Try by subdomain (e.g., demo.kwingx.com or demo.localhost)
        // This is a simple logic: take the first part of the host
        var parts = host.Split('.');
        if (parts.Length > 1)
        {
            var subdomain = parts[0];
            tenant = await _tenantRepository.GetBySubdomainAsync(subdomain);
            if (tenant != null)
            {
                return new TenantInfo { Id = tenant.Id, Code = tenant.Code };
            }
        }

        _logger.LogWarning("Could not resolve tenant for host: {Host}", host);
        return null;
    }
}
