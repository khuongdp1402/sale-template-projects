using Microsoft.AspNetCore.Http;
using KWingX.Application.Common.Models;

namespace KWingX.Application.Common.Interfaces;

public interface ITenantResolver
{
    Task<TenantInfo?> ResolveAsync(HttpContext context);
}
