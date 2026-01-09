using FluentValidation;
using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Blog;
using KWingX.Application.Interfaces.Services;
using KWingX.Application.Validators;
using KWingX.Domain.Enums;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/blog-posts")]
[Authorize(Policy = AuthorizationPolicies.BlogWrite)]
[Tags("Admin - Blog Posts")]
public class BlogPostsController : ControllerBase
{
    private readonly IBlogPostService _blogPostService;
    private readonly IValidator<BlogPostCreateRequest> _createValidator;
    private readonly IValidator<BlogPostUpdateRequest> _updateValidator;

    public BlogPostsController(
        IBlogPostService blogPostService,
        IValidator<BlogPostCreateRequest> createValidator,
        IValidator<BlogPostUpdateRequest> updateValidator)
    {
        _blogPostService = blogPostService;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<BlogPostListItemDto>>> GetPosts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] BlogPostStatus? status = null)
    {
        var result = await _blogPostService.GetAdminPostsAsync(page, pageSize, search, status);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BlogPostResponse>> GetById(Guid id)
    {
        var result = await _blogPostService.GetPostByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<BlogPostResponse>> Create([FromBody] BlogPostCreateRequest request)
    {
        var validationResult = await _createValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var userId = GetCurrentUserId();
        var result = await _blogPostService.CreatePostAsync(request, userId);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BlogPostResponse>> Update(Guid id, [FromBody] BlogPostUpdateRequest request)
    {
        var validationResult = await _updateValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var userId = GetCurrentUserId();
        var result = await _blogPostService.UpdatePostAsync(id, request, userId);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _blogPostService.DeletePostAsync(id);
        return NoContent();
    }

    private Guid? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
            ?? User.FindFirst("sub")?.Value;
        return Guid.TryParse(userIdClaim, out var userId) ? userId : null;
    }
}

