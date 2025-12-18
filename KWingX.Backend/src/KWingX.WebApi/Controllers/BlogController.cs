using KWingX.Application.Common.Models;
using KWingX.Application.DTOs.Blog;
using KWingX.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
    public async Task<ActionResult<PagedResponse<BlogPostListItemDto>>> GetPosts(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10, 
        [FromQuery] string? category = null,
        [FromQuery] string? search = null,
        [FromQuery] string? sort = "newest")
    {
        var result = await _blogPostService.GetPublishedPostsAsync(page, pageSize, category, search, sort);
        return Ok(result);
    }

    [HttpGet("posts/{slug}")]
    [AllowAnonymous]
    public async Task<ActionResult<BlogPostDto>> GetPost(string slug)
    {
        var post = await _blogPostService.GetPostBySlugAsync(slug);
        if (post == null) return NotFound();
        return Ok(post);
    }

    [HttpGet("categories")]
    [AllowAnonymous]
    public async Task<ActionResult<List<string>>> GetCategories()
    {
        var result = await _blogPostService.GetCategoriesAsync();
        return Ok(result);
    }

    [HttpGet("featured")]
    [AllowAnonymous]
    public async Task<ActionResult<List<BlogPostListItemDto>>> GetFeatured([FromQuery] int limit = 3)
    {
        var result = await _blogPostService.GetFeaturedPostsAsync(limit);
        return Ok(result);
    }

    [HttpGet("trending")]
    [AllowAnonymous]
    public async Task<ActionResult<List<BlogPostListItemDto>>> GetTrending([FromQuery] int limit = 5)
    {
        var result = await _blogPostService.GetTrendingPostsAsync(limit);
        return Ok(result);
    }

    [HttpGet("guides")]
    [AllowAnonymous]
    public async Task<ActionResult<PagedResponse<BlogPostListItemDto>>> GetGuides([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _blogPostService.GetGuidesAsync(page, pageSize);
        return Ok(result);
    }
}
