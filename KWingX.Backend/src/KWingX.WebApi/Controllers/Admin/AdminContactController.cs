using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Contacts;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Enums;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/contacts")]
[Authorize(Policy = AuthorizationPolicies.ContactsManage)]
[Tags("Admin - Contacts")]
public class AdminContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public AdminContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<ContactRequestDto>>> GetList(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] ContactRequestStatus? status = null,
        [FromQuery] string? search = null)
    {
        var result = await _contactService.GetAdminContactRequestsAsync(page, pageSize, status, search);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ContactRequestDto>> GetById(Guid id)
    {
        var result = await _contactService.GetContactRequestByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPut("{id}/status")]
    public async Task<ActionResult> UpdateStatus(Guid id, [FromBody] UpdateContactStatusRequest request)
    {
        await _contactService.UpdateContactStatusAsync(id, request.Status);
        return NoContent();
    }

    [HttpPut("{id}/notes")]
    public async Task<ActionResult> UpdateNotes(Guid id, [FromBody] UpdateContactNotesRequest request)
    {
        await _contactService.UpdateContactNotesAsync(id, request.Notes);
        return NoContent();
    }
}
