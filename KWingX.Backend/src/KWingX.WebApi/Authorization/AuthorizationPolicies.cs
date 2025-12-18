using KWingX.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace KWingX.WebApi.Authorization;

public static class AuthorizationPolicies
{
    public const string TemplatesWrite = "TemplatesWrite";
    public const string BlogWrite = "BlogWrite";
    public const string LandingWrite = "LandingWrite";
    public const string UsersManage = "UsersManage";
    public const string OrdersManage = "OrdersManage";
    public const string PaymentsView = "PaymentsView";
    public const string DeployOps = "DeployOps";
    public const string LogsView = "LogsView";
    public const string MonitoringView = "MonitoringView";
    public const string ContactsManage = "ContactsManage";

    public static void AddAuthorizationPolicies(this IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            // ContactsManage: SuperAdmin, Admin, Support
            options.AddPolicy(ContactsManage, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Support)));

            // TemplatesWrite: SuperAdmin, Admin, Editor
            options.AddPolicy(TemplatesWrite, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Editor)));

            // BlogWrite: SuperAdmin, Admin, Editor
            options.AddPolicy(BlogWrite, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Editor)));

            // LandingWrite: SuperAdmin, Admin, Editor
            options.AddPolicy(LandingWrite, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Editor)));

            // UsersManage: SuperAdmin, Admin
            options.AddPolicy(UsersManage, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin)));

            // OrdersManage: SuperAdmin, Admin, Support
            options.AddPolicy(OrdersManage, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Support)));

            // PaymentsView: SuperAdmin, Admin, Finance
            options.AddPolicy(PaymentsView, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Finance)));

            // DeployOps: SuperAdmin, Admin, Ops
            options.AddPolicy(DeployOps, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Ops)));

            // LogsView: SuperAdmin, Admin, Ops, Finance, Support
            options.AddPolicy(LogsView, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Ops) ||
                    HasRole(context, UserRole.Finance) ||
                    HasRole(context, UserRole.Support)));

            // MonitoringView: SuperAdmin, Admin, Ops
            options.AddPolicy(MonitoringView, policy =>
                policy.RequireAssertion(context =>
                    HasRole(context, UserRole.SuperAdmin) ||
                    HasRole(context, UserRole.Admin) ||
                    HasRole(context, UserRole.Ops)));
        });
    }

    private static bool HasRole(AuthorizationHandlerContext context, UserRole role)
    {
        // TODO: Implement role checking from JWT claims or user context
        // For now, this is a placeholder
        // In real implementation, extract roles from claims or fetch from DB
        return context.User.IsInRole(role.ToString());
    }
}

