using KWingX.Application.DTOs.Contacts;
using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/contacts")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult> Create([FromBody] CreateContactRequest request)
    {
        await _contactService.CreateContactRequestAsync(request);
        return Ok(new { message = "Contact request received successfully." });
    }
}
