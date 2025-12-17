using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KWingX.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context) => _context = context;

    public async Task<User?> GetByIdAsync(Guid id) => await _context.Users.FindAsync(id);
    public async Task<User?> GetByUsernameAsync(string username) => await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
    public async Task<User?> GetByEmailAsync(string email) => await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    
    public async Task AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
    
    public async Task UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
}

public class TemplateRepository : ITemplateRepository
{
    private readonly AppDbContext _context;
    public TemplateRepository(AppDbContext context) => _context = context;

    public async Task<Template?> GetByIdAsync(Guid id) => 
        await _context.Templates
            .Include(t => t.Categories)
            .Include(t => t.Media)
            .FirstOrDefaultAsync(t => t.Id == id);

    public async Task<Template?> GetBySlugAsync(string slug) => 
        await _context.Templates
            .Include(t => t.Categories)
            .Include(t => t.Media)
            .FirstOrDefaultAsync(t => t.Slug == slug);

    public async Task<List<Template>> GetListAsync(string? category, string? type, int page, int pageSize)
    {
        var query = _context.Templates.AsQueryable();
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(t => t.Categories.Any(c => c.Slug == category));
            
        // Add more filters as needed
        
        return await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<List<Template>> GetFeaturedAsync(int count) =>
        await _context.Templates
            .Where(t => t.IsHot || t.IsPopular)
            .OrderByDescending(t => t.PopularityScore)
            .Take(count)
            .ToListAsync();
}

public class PurchaseRepository : IPurchaseRepository
{
    private readonly AppDbContext _context;
    public PurchaseRepository(AppDbContext context) => _context = context;

    public async Task<List<Purchase>> GetByUserIdAsync(Guid userId) =>
        await _context.Purchases
            .Include(p => p.LicenseKeys)
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.PurchasedAt)
            .ToListAsync();

    public async Task<Purchase?> GetByIdAsync(Guid id) =>
        await _context.Purchases
            .Include(p => p.LicenseKeys)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddAsync(Purchase purchase)
    {
        await _context.Purchases.AddAsync(purchase);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Purchase purchase)
    {
        _context.Purchases.Update(purchase);
        await _context.SaveChangesAsync();
    }
}

public class BlogRepository : IBlogRepository
{
    private readonly AppDbContext _context;
    public BlogRepository(AppDbContext context) => _context = context;

    public async Task<List<BlogPost>> GetListAsync(int page, int pageSize) =>
        await _context.BlogPosts
            .OrderByDescending(b => b.PublishedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

    public async Task<BlogPost?> GetBySlugAsync(string slug) =>
        await _context.BlogPosts.FirstOrDefaultAsync(b => b.Slug == slug);
}
