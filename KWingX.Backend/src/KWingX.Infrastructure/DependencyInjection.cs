using KWingX.Application.Common.Interfaces;
using KWingX.Application.Interfaces;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Infrastructure.Persistence;
using KWingX.Infrastructure.Repositories;
using KWingX.Infrastructure.Services;
using KWingX.Infrastructure.Identity;
using KWingX.Infrastructure.Services.Provisioning;
using KWingX.Infrastructure.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KWingX.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            var connectionString = configuration.GetConnectionString("Postgres");
            if (string.IsNullOrEmpty(connectionString))
            {
                // Fallback for local development if environment variable is not set
                connectionString = "Host=localhost;Port=5435;Database=kwingx_db;Username=postgres;Password=postgres";
            }

            options.UseNpgsql(
                connectionString,
                b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName))
                .AddInterceptors(new SoftDeleteSaveChangesInterceptor());
        });

        // Register generic repository
        services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));

        // Register Unit of Work
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // Register specific repositories (extend IRepository<T>)
        services.AddScoped<IBlogRepository, BlogRepository>();
        services.AddScoped<ITemplateRepository, TemplateRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPurchaseRepository, PurchaseRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IPaymentRepository, PaymentRepository>();
        services.AddScoped<IContactRequestRepository, ContactRequestRepository>();
        services.AddScoped<ILogRepository, LogRepository>();
        services.AddScoped<IDeploymentRepository, DeploymentRepository>();
        services.AddScoped<ILandingSectionRepository, LandingSectionRepository>();
        services.AddScoped<ITenantRepository, TenantRepository>();
        services.AddScoped<ITemplateCategoryRepository, TemplateCategoryRepository>();
        services.AddScoped<ITemplateTagRepository, TemplateTagRepository>();
        services.AddScoped<IServiceRepository, ServiceRepository>();
        
        services.AddTransient<ITokenService, TokenService>();
        services.AddTransient<IKeyGeneratorService, KeyGeneratorService>();
        services.AddScoped<ITenantResolver, TenantResolver>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();

        // File Storage (MinIO/S3)
        services.Configure<S3Options>(configuration.GetSection(S3Options.SectionName));
        services.AddScoped<IFileStorage, MinioS3FileStorage>();

        services.AddHostedService<DeploymentWorker>();

        return services;
    }
}
