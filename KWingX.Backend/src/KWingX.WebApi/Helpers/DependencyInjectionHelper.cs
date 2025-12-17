using Microsoft.Extensions.DependencyInjection;

namespace KWingX.WebApi.Helpers;

/// <summary>
/// Static DI helper for legacy/static access.
/// Prefer constructor injection in new code.
/// </summary>
public static class DependencyInjectionHelper
{
    private static IServiceProvider? _serviceProvider;

    public static void Init(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
    }

    public static T GetRequiredService<T>() where T : notnull
    {
        if (_serviceProvider is null)
            throw new InvalidOperationException("DependencyInjectionHelper has not been initialized. Call DependencyInjectionHelper.Init(app.Services) in Program.cs after building the app.");

        return _serviceProvider.GetRequiredService<T>();
    }

    public static T? GetService<T>()
    {
        if (_serviceProvider is null)
            return default;

        return _serviceProvider.GetService<T>();
    }
}


