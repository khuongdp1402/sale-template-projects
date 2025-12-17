using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class BlogController : ControllerBase
{
    private readonly IBlogPostService _blogPostService;

    public BlogController(IBlogPostService blogPostService)
    {
        _blogPostService = blogPostService;
    }

    [HttpGet("posts")]
    public async Task<ActionResult> GetPosts([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? category = null)
    {
        var result = await _blogPostService.GetListAsync(page, pageSize, status: Domain.Enums.BlogPostStatus.Published, category: category);
        return Ok(result);
    }

    [HttpGet("posts/{slug}")]
    public async Task<ActionResult> GetPost(string slug)
    {
        var post = await _blogPostService.GetBySlugAsync(slug);
        if (post == null) return NotFound();
        return Ok(post);
    }
}
