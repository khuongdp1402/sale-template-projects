namespace KWingX.Application.Interfaces.Services;

public interface IFileStorage
{
    Task<FileUploadResult> UploadAsync(Stream stream, string contentType, string objectKey, CancellationToken cancellationToken = default);
    Task DeleteAsync(string objectKey, CancellationToken cancellationToken = default);
    Task EnsureBucketExistsAsync(CancellationToken cancellationToken = default);
}

public class FileUploadResult
{
    public string Url { get; set; } = string.Empty;
    public string ObjectKey { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long Size { get; set; }
}

