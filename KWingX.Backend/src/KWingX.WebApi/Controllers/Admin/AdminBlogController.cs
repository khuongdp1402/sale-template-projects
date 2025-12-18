using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Blog;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Enums;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/blog")]
[Authorize(Policy = AuthorizationPolicies.BlogWrite)]
[Tags("Admin - Blog")]
public class AdminBlogController : ControllerBase
{
    private readonly IBlogPostService _blogPostService;

    public AdminBlogController(IBlogPostService blogPostService)
    {
        _blogPostService = blogPostService;
    }

    [HttpGet("posts")]
    public async Task<ActionResult<PagedResponse<BlogPostDto>>> GetPosts(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10, 
        [FromQuery] string? search = null, 
        [FromQuery] string? category = null, 
        [FromQuery] BlogPostStatus? status = null)
    {
        var result = await _blogPostService.GetAdminPostsAsync(page, pageSize, search, category, status);
        return Ok(result);
    }

    [HttpGet("posts/{id}")]
    public async Task<ActionResult<BlogPostDto>> GetById(Guid id)
    {
        var result = await _blogPostService.GetPostByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost("posts")]
    public async Task<ActionResult<BlogPostDto>> Create([FromBody] CreateBlogPostRequest request)
    {
        var result = await _blogPostService.CreatePostAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("posts/{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] CreateBlogPostRequest request)
    {
        await _blogPostService.UpdatePostAsync(id, request);
        return NoContent();
    }

    [HttpDelete("posts/{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _blogPostService.DeletePostAsync(id);
        return NoContent();
    }

    [HttpPost("posts/{id}/publish")]
    public async Task<ActionResult> Publish(Guid id)
    {
        await _blogPostService.PublishPostAsync(id);
        return NoContent();
    }

    [HttpPost("posts/{id}/unpublish")]
    public async Task<ActionResult> Unpublish(Guid id)
    {
        await _blogPostService.UnpublishPostAsync(id);
        return NoContent();
    }
}
