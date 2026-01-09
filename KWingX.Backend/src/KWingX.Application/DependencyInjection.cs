using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using KWingX.Application.Services;
using KWingX.Application.Interfaces.Services;
using KWingX.Application.Common.Interfaces;
using KWingX.Application.Common.Models;
using KWingX.Application.Validators;

namespace KWingX.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Tenant context
        services.AddScoped<ITenantContext, TenantContext>();

        // Register FluentValidation validators
        services.AddValidatorsFromAssemblyContaining<BlogPostCreateRequestValidator>();

        // Register services
        services.AddScoped<IBlogPostService, BlogPostService>();
        services.AddScoped<IPurchaseService, PurchaseService>();
        services.AddScoped<ITemplateService, TemplateService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IMasterDataService, MasterDataService>();
        services.AddScoped<IContactService, ContactService>();
        services.AddScoped<IDeploymentService, DeploymentService>();
        services.AddScoped<IMonitoringService, MonitoringService>();
        
        // TODO: Add more services as they are created:
        // services.AddScoped<IUserService, UserService>();
        // services.AddScoped<IOrderService, OrderService>();
        // services.AddScoped<IPaymentService, PaymentService>();
        // services.AddScoped<IContactService, ContactService>();
        // services.AddScoped<IMonitoringService, MonitoringService>();
        // services.AddScoped<IDeployService, DeployService>();
        // services.AddScoped<IApiKeyService, ApiKeyService>();
        // services.AddScoped<ILandingSectionService, LandingSectionService>();

        return services;
    }
}
