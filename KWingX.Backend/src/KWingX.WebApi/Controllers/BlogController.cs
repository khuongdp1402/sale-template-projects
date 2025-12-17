using KWingX.Application.Features.Blog.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly IMediator _mediator;

    public BlogController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("posts")]
    public async Task<ActionResult<List<BlogPostDto>>> GetPosts([FromQuery] GetBlogPostsQuery query)
    {
        return Ok(await _mediator.Send(query));
    }

    [HttpGet("posts/{slug}")]
    public async Task<ActionResult<BlogPostDto>> GetPost(string slug)
    {
        var result = await _mediator.Send(new GetBlogPostDetailQuery(slug));
        if (result == null) return NotFound();
        // Map to DTO if needed, or return entity directly for now (simplified)
        return Ok(result);
    }
}
