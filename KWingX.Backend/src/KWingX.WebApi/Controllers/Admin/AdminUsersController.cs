using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/users")]
[Authorize(Policy = AuthorizationPolicies.UsersManage)]
[Tags("Admin - Users")]
public class AdminUsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public AdminUsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<User>>> GetList(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] KWingX.Domain.Enums.UserRole? role = null,
        [FromQuery] bool? isActive = null)
    {
        var result = await _userRepository.GetAdminListAsync(page, pageSize, search, role, isActive);
        return Ok(result);
    }
}
