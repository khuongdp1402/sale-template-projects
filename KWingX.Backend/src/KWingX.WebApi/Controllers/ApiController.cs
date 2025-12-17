//using KWingX.Application.Features.ApiAccess.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KWingX.WebApi.Controllers;

[Authorize]
[ApiController]
[Route("api/me/api-key")]
public class ApiController : ControllerBase
{
    private readonly IMediator _mediator;

    public ApiController(IMediator mediator)
    {
        _mediator = mediator;
    }
¬
    [HttpGet]
    public async Task<ActionResult<string>> GetApiKey()
    {
        // Simplified: In real app use a Query
        return Ok("kwx_live_mock_key_12345");
    }

    [HttpPost("rotate")]
    public async Task<ActionResult<string>> RotateApiKey()
    {
        // Simplified: In real app use a Command
        return Ok("kwx_live_new_mock_key_67890");
    }
}
