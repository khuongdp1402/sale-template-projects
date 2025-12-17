using KWingX.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace KWingX.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    
    // Marketplace
    public DbSet<Template> Templates => Set<Template>();
    public DbSet<TemplateCategory> TemplateCategories => Set<TemplateCategory>();
    public DbSet<TemplateTag> TemplateTags => Set<TemplateTag>();
    public DbSet<TemplateMedia> TemplateMedia => Set<TemplateMedia>();
    public DbSet<CustomerUseCase> CustomerUseCases => Set<CustomerUseCase>();
    
    // Sales
    public DbSet<Purchase> Purchases => Set<Purchase>();
    public DbSet<LicenseKey> LicenseKeys => Set<LicenseKey>();
    
    // Services
    public DbSet<Service> Services => Set<Service>();
    public DbSet<ApiKey> ApiKeys => Set<ApiKey>();
    
    // Content
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<LandingSection> LandingSections => Set<LandingSection>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        // Basic configurations if not using separate files
        builder.Entity<User>().HasIndex(u => u.Username).IsUnique();
        builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        
        builder.Entity<Template>().HasIndex(t => t.Slug).IsUnique();
        builder.Entity<TemplateCategory>().HasIndex(c => c.Slug).IsUnique();
        
        builder.Entity<Service>().HasIndex(s => s.Slug).IsUnique();
        builder.Entity<BlogPost>().HasIndex(b => b.Slug).IsUnique();
    }
}
