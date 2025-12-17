using KWingX.Application.Options;
using Microsoft.Extensions.Options;

namespace KWingX.WebApi.Helpers;

/// <summary>
/// Static accessor for strongly-typed configuration.
/// Prefer injecting IOptions&lt;T&gt; into services/controllers where possible.
/// </summary>
public static class AppSettingHelper
{
    private static T GetOptions<T>() where T : class, new()
    {
        var options = DependencyInjectionHelper
            .GetRequiredService<IOptions<T>>()
            .Value;

        if (options == null)
            throw new InvalidOperationException($"Configuration for '{typeof(T).Name}' is not bound. Check appsettings and Program.cs configuration binding.");

        return options;
    }

    public static JwtOptions Jwt => GetOptions<JwtOptions>();
    public static DatabaseSettings Database => GetOptions<DatabaseSettings>();
    public static GoogleOptions Google => GetOptions<GoogleOptions>();
    public static PaymentOptions Payment => GetOptions<PaymentOptions>();
    public static TelegramOptions Telegram => GetOptions<TelegramOptions>();

    /// <summary>
    /// Returns the Postgres connection string.
    /// Environment variables like ConnectionStrings__Postgres override appsettings.json.
    /// </summary>
    public static string GetPostgresConnectionString()
    {
        var db = Database;

        // Environment-based selection if specific values are provided
        string? byEnv = db.Environment switch
        {
            2 => db.ConnectionStrings.Postgres_BETA,
            3 => db.ConnectionStrings.Postgres_LIVE,
            _ => db.ConnectionStrings.Postgres_LOCAL
        };

        // Fallback to generic Postgres
        var conn = !string.IsNullOrWhiteSpace(byEnv)
            ? byEnv
            : db.ConnectionStrings.Postgres;

        if (string.IsNullOrWhiteSpace(conn))
        {
            throw new InvalidOperationException(
                "Postgres connection string is not configured. " +
                "Please set ConnectionStrings:Postgres (or environment variable ConnectionStrings__Postgres) " +
                "or DatabaseSettings:ConnectionStrings:Postgres(_LOCAL/_BETA/_LIVE).");
        }

        return conn;
    }
}


