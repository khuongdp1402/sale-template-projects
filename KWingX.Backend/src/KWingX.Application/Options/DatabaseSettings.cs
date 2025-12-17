namespace KWingX.Application.Options;

public class DatabaseSettings
{
    /// <summary>
    /// Optional environment flag (1 = Local, 2 = Beta, 3 = Live).
    /// You can also rely purely on standard ConnectionStrings configuration.
    /// </summary>
    public int Environment { get; set; } = 1;

    public DatabaseConnectionStrings ConnectionStrings { get; set; } = new();
}

public class DatabaseConnectionStrings
{
    /// <summary>
    /// Standard Postgres connection string. This is also bound from ConnectionStrings:Postgres.
    /// </summary>
    public string Postgres { get; set; } = string.Empty;

    // Optional environment-specific variants if needed later
    public string? Postgres_LOCAL { get; set; }
    public string? Postgres_BETA { get; set; }
    public string? Postgres_LIVE { get; set; }
}


