using KWingX.Application.Common.Interfaces;
using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Infrastructure.Persistence;
using KWingX.Infrastructure.Repositories;
using KWingX.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KWingX.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("Postgres") ?? "Host=localhost;Database=kwingx_db;Username=postgres;Password=postgres",
                b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITemplateRepository, TemplateRepository>();
        services.AddScoped<IPurchaseRepository, PurchaseRepository>();
        services.AddScoped<IBlogRepository, BlogRepository>();

        services.AddTransient<ITokenService, TokenService>();
        services.AddTransient<IKeyGeneratorService, KeyGeneratorService>();

        return services;
    }
}
