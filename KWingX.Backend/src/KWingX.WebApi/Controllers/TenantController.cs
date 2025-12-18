using KWingX.Application.Common.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class TenantController : ControllerBase
{
    private readonly ITenantContext _tenantContext;

    public TenantController(ITenantContext tenantContext)
    {
        _tenantContext = tenantContext;
    }

    [HttpGet("whoami")]
    [AllowAnonymous]
    public IActionResult WhoAmI()
    {
        return Ok(new
        {
            _tenantContext.TenantId,
            _tenantContext.TenantCode,
            _tenantContext.Host
        });
    }
}
