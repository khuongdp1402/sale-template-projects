using KWingX.Application.Common.Interfaces;
using KWingX.Application.Interfaces;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Infrastructure.Persistence;
using KWingX.Infrastructure.Repositories;
using KWingX.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("Postgres") ?? "Host=localhost;Database=kwingx_db;Username=postgres;Password=postgres",
                b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName))
                .AddInterceptors(new SoftDeleteSaveChangesInterceptor()));

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
        
        // Register old repositories for backward compatibility (can be removed later)
        services.AddScoped<KWingX.Application.Common.Interfaces.Repositories.ITemplateRepositoryExtended, TemplateRepositoryExtended>();

        services.AddTransient<ITokenService, TokenService>();
        services.AddTransient<IKeyGeneratorService, KeyGeneratorService>();

        return services;
    }
}
