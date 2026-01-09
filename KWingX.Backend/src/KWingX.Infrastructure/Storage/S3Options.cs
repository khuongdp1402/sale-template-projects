namespace KWingX.Infrastructure.Storage;

public class S3Options
{
    public const string SectionName = "S3";

    public string ServiceUrl { get; set; } = string.Empty;
    public string AccessKey { get; set; } = string.Empty;
    public string SecretKey { get; set; } = string.Empty;
    public string BucketName { get; set; } = string.Empty;
    public string PublicBaseUrl { get; set; } = string.Empty;
    public string? Region { get; set; }
    public bool UseSSL { get; set; } = false;
}

