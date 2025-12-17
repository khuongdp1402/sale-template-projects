using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Domain.Entities;
using MediatR;

namespace KWingX.Application.Features.Blog.Queries;

// --- DTOs ---
public record BlogPostDto(string Slug, string Title, string Excerpt, string Category, DateTime PublishedAt, int Views, string CoverImage);

// --- Queries ---
public record GetBlogPostsQuery(int Page = 1, int PageSize = 10) : IRequest<List<BlogPostDto>>;
public record GetBlogPostDetailQuery(string Slug) : IRequest<BlogPost?>;

// --- Handlers ---
public class BlogHandlers : 
    IRequestHandler<GetBlogPostsQuery, List<BlogPostDto>>,
    IRequestHandler<GetBlogPostDetailQuery, BlogPost?>
{
    private readonly IBlogRepository _repo;

    public BlogHandlers(IBlogRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<BlogPostDto>> Handle(GetBlogPostsQuery request, CancellationToken cancellationToken)
    {
        var posts = await _repo.GetListAsync(request.Page, request.PageSize);
        return posts.Select(p => new BlogPostDto(
            p.Slug, p.Title, p.Excerpt, p.Category, p.PublishedAt, p.Views, p.CoverImage ?? ""
        )).ToList();
    }

    public async Task<BlogPost?> Handle(GetBlogPostDetailQuery request, CancellationToken cancellationToken)
    {
        return await _repo.GetBySlugAsync(request.Slug);
    }
}
