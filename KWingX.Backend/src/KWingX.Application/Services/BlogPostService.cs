using KWingX.Application.Common.Models;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Services;

public class BlogPostService : IBlogPostService
{
    private readonly IBlogRepository _repository;

    public BlogPostService(IBlogRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResponse<BlogPost>> GetListAsync(int page, int pageSize, BlogPostStatus? status = null, string? category = null, bool includeDeleted = false)
    {
        // Query is handled in repository layer (Infrastructure)
        return await _repository.GetListAsync(page, pageSize, status, category, includeDeleted);
    }

    public async Task<BlogPost?> GetByIdAsync(Guid id, bool includeDeleted = false)
    {
        return await _repository.GetByIdAsync(id, includeDeleted);
    }

    public async Task<BlogPost?> GetBySlugAsync(string slug, bool includeDeleted = false)
    {
        // Query is handled in repository layer (Infrastructure)
        return await _repository.GetBySlugAsync(slug, includeDeleted);
    }

    public async Task<BlogPost> CreateAsync(BlogPost post, string? createdBy = null)
    {
        await _repository.AddAsync(post, createdBy);
        await _repository.SaveChangesAsync();
        return post;
    }

    public async Task<BlogPost> UpdateAsync(BlogPost post, string? modifiedBy = null)
    {
        await _repository.UpdateAsync(post, modifiedBy);
        await _repository.SaveChangesAsync();
        return post;
    }

    public async Task DeleteAsync(Guid id, string? deletedBy = null)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null)
            throw new KeyNotFoundException($"BlogPost with id {id} not found");
        
        await _repository.DeleteAsync(post, deletedBy);
        await _repository.SaveChangesAsync();
    }

    public async Task RestoreAsync(Guid id)
    {
        var post = await _repository.GetByIdAsync(id, includeDeleted: true);
        if (post == null || !post.IsDeleted)
            throw new InvalidOperationException($"BlogPost with id {id} not found or not deleted");
        
        post.IsDeleted = false;
        await _repository.UpdateAsync(post);
        await _repository.SaveChangesAsync();
    }
}

