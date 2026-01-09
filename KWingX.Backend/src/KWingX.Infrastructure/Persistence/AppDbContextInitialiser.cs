using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using KWingX.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace KWingX.Infrastructure.Persistence;

public static class AppDbContextInitialiser
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        var hasher = new PasswordHasher();

        // Seed Roles
        if (!context.Roles.Any())
        {
            var roles = Enum.GetNames(typeof(KWingX.Domain.Enums.UserRole));
            foreach (var roleName in roles)
            {
                context.Roles.Add(new Role
                {
                    Name = roleName,
                    NormalizedName = roleName.ToUpperInvariant()
                });
            }
            await context.SaveChangesAsync();
        }

        // Seed Admin User
        if (!context.Users.Any())
        {
            var adminUser = new User
            {
                Username = "admin",
                Email = "admin@kwingx.com",
                PasswordHash = hasher.HashPassword("admin"),
                IsActive = true
            };
            context.Users.Add(adminUser);
            await context.SaveChangesAsync();

            var superAdminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "SuperAdmin");
            if (superAdminRole != null)
            {
                context.UserRoles.Add(new KWingX.Domain.Entities.UserRole
                {
                    UserId = adminUser.Id,
                    RoleId = superAdminRole.Id
                });
                await context.SaveChangesAsync();
            }
        }
        else
        {
            // Update existing admin user password if needed
            var existingAdmin = await context.Users.FirstOrDefaultAsync(u => u.Username == "admin");
            if (existingAdmin != null)
            {
                // Always ensure admin password is "admin" for development
                existingAdmin.PasswordHash = hasher.HashPassword("admin");
                await context.SaveChangesAsync();
            }
        }

        // Seed Tenants
        if (!context.Tenants.Any())
        {
            context.Tenants.Add(new Tenant
            {
                Code = "demo",
                Name = "Demo Tenant",
                Subdomain = "demo",
                Status = TenantStatus.Active
            });
            await context.SaveChangesAsync();
        }

        // Seed Categories
        if (!context.TemplateCategories.Any())
        {
            context.TemplateCategories.AddRange(
                new TemplateCategory { Name = "E-Commerce", Slug = "ecommerce", IsActive = true },
                new TemplateCategory { Name = "SaaS", Slug = "saas", IsActive = true },
                new TemplateCategory { Name = "Landing Page", Slug = "landing-page", IsActive = true }
            );
            await context.SaveChangesAsync();
        }

        // Seed Tags
        if (!context.TemplateTags.Any())
        {
            context.TemplateTags.AddRange(
                new TemplateTag { Name = "React", Color = "#61DAFB", IsActive = true },
                new TemplateTag { Name = "Tailwind", Color = "#38B2AC", IsActive = true },
                new TemplateTag { Name = "Next.js", Color = "#000000", IsActive = true }
            );
            await context.SaveChangesAsync();
        }

        // Seed Services
        if (!context.Services.Any())
        {
            context.Services.AddRange(
                new Service { Name = "Basic Deployment", Slug = "basic-deploy", Category = "DevOps", Price = 500000, Description = "Standard deployment service" },
                new Service { Name = "Custom Design", Slug = "custom-design", Category = "Design", Price = 2000000, Description = "Custom UI/UX design service" }
            );
            await context.SaveChangesAsync();
        }

        // Seed Templates
        if (!context.Templates.Any())
        {
            var categories = await context.TemplateCategories.ToListAsync();
            var tags = await context.TemplateTags.ToListAsync();

            for (int i = 1; i <= 12; i++)
            {
                var template = new Template
                {
                    Name = $"Template {i:D2}",
                    Slug = $"template-{i:D2}",
                    ShortDescription = $"Short description for Template {i:D2}",
                    LongDescription = $"Detailed long description for Template {i:D2}. This is a professional template for various business needs.",
                    TemplateType = (TemplateType)(i % 3),
                    Audience = (Audience)(i % 3),
                    Price = 1000000 + (i * 100000),
                    OriginalPrice = 1500000 + (i * 100000),
                    IsHot = i % 4 == 0,
                    IsNew = i % 3 == 0,
                    IsPopular = i % 5 == 0,
                    Status = TemplateStatus.Published,
                    PopularityScore = i * 10,
                    Categories = new List<TemplateCategory> { categories[i % categories.Count] },
                    Tags = new List<TemplateTag> { tags[i % tags.Count] },
                    Media = new List<TemplateMedia>
                    {
                        new TemplateMedia { 
                            MediaType = MediaType.Image, 
                            Src = $"/templates/covers/template-{i:D2}.svg", 
                            Thumb = $"/templates/thumbs/template-{i:D2}.svg",
                            SortOrder = 0,
                            Title = "Cover Image"
                        }
                    }
                };
                context.Templates.Add(template);
            }
            
            await context.SaveChangesAsync();
        }

        // Seed Blog Posts
        if (!context.BlogPosts.Any())
        {
            var guidesCategory = "Hướng dẫn hệ sinh thái K-WingX";
            var newsCategory = "Tin tức & Sự kiện";

            for (int i = 1; i <= 7; i++)
            {
                context.BlogPosts.Add(new BlogPost
                {
                    Title = $"Tin tức K-WingX số {i}",
                    Slug = $"tin-tuc-kwingx-{i}",
                    Excerpt = $"Bản tin cập nhật hệ sinh thái K-WingX số {i}.",
                    ContentMd = "# Chi tiết bản tin\nNội dung đang được cập nhật...",
                    Category = newsCategory,
                    Status = BlogPostStatus.Published,
                    PublishedAt = DateTime.UtcNow.AddDays(-i),
                    Views = i * 10,
                    IsTrending = i % 3 == 0
                });
            }

            for (int i = 1; i <= 3; i++)
            {
                context.BlogPosts.Add(new BlogPost
                {
                    Title = $"Hướng dẫn sử dụng K-WingX phần {i}",
                    Slug = $"huong-dan-kwingx-phan-{i}",
                    Excerpt = $"Tài liệu hướng dẫn chi tiết về các tính năng của K-WingX phần {i}.",
                    ContentMd = "# Tài liệu hướng dẫn\nCác bước thực hiện...",
                    Category = guidesCategory,
                    Status = BlogPostStatus.Published,
                    PublishedAt = DateTime.UtcNow.AddDays(-i - 7),
                    Views = i * 5,
                    IsFeatured = i == 1
                });
            }

            await context.SaveChangesAsync();
        }

        // Seed Contact Requests
        if (!context.ContactRequests.Any())
        {
            context.ContactRequests.AddRange(
                new ContactRequest
                {
                    Name = "Nguyễn Văn A",
                    EmailOrPhone = "0987654321",
                    Message = "Tôi quan tâm đến template Fashion Store Pro.",
                    Source = "landing",
                    Status = ContactRequestStatus.New,
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                },
                new ContactRequest
                {
                    Name = "Trần Thị B",
                    EmailOrPhone = "test@example.com",
                    Message = "Cần tư vấn về dịch vụ triển khai hệ thống.",
                    Source = "contact-page",
                    Status = ContactRequestStatus.InProgress,
                    Notes = "Đang chờ sếp phê duyệt báo giá.",
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new ContactRequest
                {
                    Name = "Lê Văn C",
                    EmailOrPhone = "0123456789",
                    Message = "Hỏi về giá template SaaS.",
                    Source = "blog",
                    Status = ContactRequestStatus.Done,
                    Notes = "Đã gọi điện tư vấn thành công.",
                    CreatedAt = DateTime.UtcNow.AddHours(-5)
                }
            );
            await context.SaveChangesAsync();
        }

        // Seed Deployment Targets
        if (!context.DeploymentTargets.Any())
        {
            context.DeploymentTargets.Add(new DeploymentTarget
            {
                Name = "Production Server 1",
                Host = "127.0.0.1",
                Username = "deploy",
                Password = "password", // Should be handled securely in real app
                BasePath = "/opt/kwingx/sites",
                IsActive = true
            });
            await context.SaveChangesAsync();
        }

        // Seed Orders and Purchases
        if (!context.Orders.Any())
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == "admin");
            var template = await context.Templates.FirstOrDefaultAsync();
            var service = await context.Services.FirstOrDefaultAsync();

            if (user != null && template != null && service != null)
            {
                // Completed Order -> Created Purchase
                var order1 = new Order
                {
                    UserId = user.Id,
                    UserEmail = user.Email,
                    Total = template.Price,
                    Status = OrderStatus.Completed,
                    PaymentStatus = PaymentStatus.Success,
                    CreatedAt = DateTime.UtcNow.AddDays(-5)
                };
                order1.Items.Add(new OrderItem { TemplateId = template.Id, ItemName = template.Name, Price = template.Price, Quantity = 1 });
                context.Orders.Add(order1);
                await context.SaveChangesAsync();

                var purchase1 = new Purchase
                {
                    UserId = user.Id,
                    PurchaseType = PurchaseType.Template,
                    TemplateId = template.Id,
                    Status = PurchaseStatus.Active,
                    Price = template.Price,
                    PurchasedAt = order1.CreatedAt
                };
                context.Purchases.Add(purchase1);
                await context.SaveChangesAsync();

                context.LicenseKeys.Add(new LicenseKey
                {
                    PurchaseId = purchase1.Id,
                    Key = "KWX-DEMO-KEY1-1234",
                    Status = KeyStatus.Active,
                    CreatedAt = purchase1.PurchasedAt
                });

                // Pending Order
                var order2 = new Order
                {
                    UserId = user.Id,
                    UserEmail = user.Email,
                    Total = service.Price,
                    Status = OrderStatus.Pending,
                    PaymentStatus = PaymentStatus.Pending,
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                };
                order2.Items.Add(new OrderItem { ServiceId = service.Id, ItemName = service.Name, Price = service.Price, Quantity = 1 });
                context.Orders.Add(order2);

                await context.SaveChangesAsync();
            }
        }
    }
}
