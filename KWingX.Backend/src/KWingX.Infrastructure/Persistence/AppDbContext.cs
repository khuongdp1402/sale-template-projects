using KWingX.Domain.Common;
using KWingX.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace KWingX.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    
    // Marketplace
    public DbSet<Template> Templates => Set<Template>();
    public DbSet<TemplateCategory> TemplateCategories => Set<TemplateCategory>();
    public DbSet<TemplateTag> TemplateTags => Set<TemplateTag>();
    public DbSet<TemplateMedia> TemplateMedia => Set<TemplateMedia>();
    public DbSet<CustomerUseCase> CustomerUseCases => Set<CustomerUseCase>();
    
    // Sales
    public DbSet<Purchase> Purchases => Set<Purchase>();
    public DbSet<LicenseKey> LicenseKeys => Set<LicenseKey>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Payment> Payments => Set<Payment>();
    
    // Services
    public DbSet<Service> Services => Set<Service>();
    public DbSet<ApiKey> ApiKeys => Set<ApiKey>();
    
    // Content
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<LandingSection> LandingSections => Set<LandingSection>();
    
    // Admin
    public DbSet<ContactRequest> ContactRequests => Set<ContactRequest>();
    public DbSet<Log> Logs => Set<Log>();
    public DbSet<Deployment> Deployments => Set<Deployment>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        // Apply global query filter for soft delete
        ApplySoftDeleteQueryFilters(builder);
        
        // Basic configurations if not using separate files
        builder.Entity<User>().HasIndex(u => u.Username).IsUnique();
        builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        
        builder.Entity<Template>().HasIndex(t => t.Slug).IsUnique();
        builder.Entity<TemplateCategory>().HasIndex(c => c.Slug).IsUnique();
        
        builder.Entity<Service>().HasIndex(s => s.Slug).IsUnique();
        builder.Entity<BlogPost>().HasIndex(b => b.Slug).IsUnique();
        
        // Indexes for performance
        builder.Entity<Log>().HasIndex(l => new { l.Type, l.CreatedAt });
        builder.Entity<Log>().HasIndex(l => l.Severity);
        builder.Entity<ContactRequest>().HasIndex(c => new { c.Status, c.CreatedAt });
        builder.Entity<Payment>().HasIndex(p => new { p.Status, p.CreatedAt });
        builder.Entity<Order>().HasIndex(o => new { o.Status, o.CreatedAt });
        
        // Many-to-many for Template similar templates
        builder.Entity<Template>()
            .HasMany(t => t.SimilarTemplates)
            .WithMany()
            .UsingEntity<Dictionary<string, object>>(
                "TemplateSimilar",
                j => j.HasOne<Template>().WithMany().HasForeignKey("SimilarTemplateId"),
                j => j.HasOne<Template>().WithMany().HasForeignKey("TemplateId"),
                j => j.HasKey("TemplateId", "SimilarTemplateId")
            );
    }

    private static void ApplySoftDeleteQueryFilters(ModelBuilder builder)
    {
        // Get all entity types that inherit from BaseEntity
        var entityTypes = builder.Model.GetEntityTypes()
            .Where(e => typeof(BaseEntity).IsAssignableFrom(e.ClrType));

        foreach (var entityType in entityTypes)
        {
            // Create expression: e => !e.IsDeleted
            var parameter = Expression.Parameter(entityType.ClrType, "e");
            var property = Expression.Property(parameter, nameof(BaseEntity.IsDeleted));
            var constant = Expression.Constant(false);
            var expression = Expression.Equal(property, constant);
            var lambda = Expression.Lambda(expression, parameter);

            // Apply the query filter
            builder.Entity(entityType.ClrType).HasQueryFilter(lambda);
        }
    }
}
