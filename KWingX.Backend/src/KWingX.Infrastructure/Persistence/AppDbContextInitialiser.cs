using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Identity;

namespace KWingX.Infrastructure.Persistence;

public static class AppDbContextInitialiser
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        if (!context.Users.Any())
        {
            context.Users.Add(new User
            {
                Username = "admin",
                Email = "admin@kwingx.com",
                PasswordHash = PasswordHasher.HashPassword("Admin@123"),
                IsActive = true
            });
            await context.SaveChangesAsync();
        }

        if (!context.Templates.Any())
        {
            var category = new TemplateCategory { Name = "E-Commerce", Slug = "ecommerce" };
            context.TemplateCategories.Add(category);

            context.Templates.Add(new Template
            {
                Name = "Fashion Store Pro",
                Slug = "fashion-store-pro",
                ShortDescription = "Modern fashion store template",
                LongDescription = "Full featured fashion store template with cart, checkout, and more.",
                TemplateType = TemplateType.Ecommerce,
                Audience = Audience.B2C,
                Price = 1990000,
                Categories = new List<TemplateCategory> { category },
                IsHot = true
            });
            
            await context.SaveChangesAsync();
        }
        
        // Add more seed data as needed
    }
}
