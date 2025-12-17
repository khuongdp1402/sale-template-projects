using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] string usernameOrEmail, [FromBody] string password)
    {
        try
        {
            var result = await _authService.LoginAsync(usernameOrEmail, password);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(string username, string email, string password, string confirmPassword)
    {
        try
        {
            var result = await _authService.RegisterAsync(username, email, password, confirmPassword);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
