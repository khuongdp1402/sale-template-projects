using KWingX.Application.Interfaces.Services;
using KWingX.Infrastructure.Storage;
using KWingX.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers.Admin;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/uploads")]
[Authorize(Policy = AuthorizationPolicies.BlogWrite)]
[Tags("Admin - Uploads")]
public class UploadsController : ControllerBase
{
    private readonly IFileStorage _fileStorage;
    private readonly ILogger<UploadsController> _logger;
    private const long MaxFileSize = 5 * 1024 * 1024; // 5MB

    public UploadsController(IFileStorage fileStorage, ILogger<UploadsController> logger)
    {
        _fileStorage = fileStorage;
        _logger = logger;
    }

    /// <summary>
    /// Upload image with optional prefix for categorization
    /// </summary>
    /// <param name="file">Image file to upload</param>
    /// <param name="prefix">Storage prefix (e.g., "blog", "template", "landing"). Defaults to "general"</param>
    /// <param name="cancellationToken">Cancellation token</param>
    [HttpPost("images")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<FileUploadResponse>> UploadImage(
        IFormFile file, 
        [FromQuery] string? prefix = "general",
        CancellationToken cancellationToken = default)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { error = "No file provided" });
        }

        // Validate file size
        if (file.Length > MaxFileSize)
        {
            return BadRequest(new { error = $"File size exceeds maximum allowed size of {MaxFileSize / 1024 / 1024}MB" });
        }

        // Validate content type
        if (!file.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new { error = "File must be an image" });
        }

        // Sanitize prefix
        var safePrefix = string.IsNullOrWhiteSpace(prefix) ? "general" : prefix.Trim().ToLowerInvariant();
        var allowedPrefixes = new[] { "blog", "template", "landing", "general", "avatar", "product" };
        if (!allowedPrefixes.Contains(safePrefix))
        {
            safePrefix = "general";
        }

        try
        {
            // Generate object key with prefix
            var objectKey = FileStorageHelper.GenerateObjectKey(safePrefix, file.FileName);

            // Upload to MinIO
            using var stream = file.OpenReadStream();
            var result = await _fileStorage.UploadAsync(stream, file.ContentType, objectKey, cancellationToken);

            _logger.LogInformation("Uploaded image: {ObjectKey} ({Size} bytes)", result.ObjectKey, result.Size);

            return Ok(new FileUploadResponse
            {
                Url = result.Url,
                ObjectKey = result.ObjectKey,
                FileName = result.FileName,
                ContentType = result.ContentType,
                Size = result.Size
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading image: {FileName}", file.FileName);
            return StatusCode(500, new { error = "Failed to upload image" });
        }
    }

    /// <summary>
    /// Delete an uploaded file by object key
    /// </summary>
    [HttpDelete("{objectKey}")]
    public async Task<ActionResult> DeleteFile(string objectKey, CancellationToken cancellationToken)
    {
        try
        {
            // Decode object key (in case it's URL encoded)
            var decodedKey = Uri.UnescapeDataString(objectKey);
            
            await _fileStorage.DeleteAsync(decodedKey, cancellationToken);
            _logger.LogInformation("Deleted file: {ObjectKey}", decodedKey);
            
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file: {ObjectKey}", objectKey);
            return StatusCode(500, new { error = "Failed to delete file" });
        }
    }
}

public class FileUploadResponse
{
    public string Url { get; set; } = string.Empty;
    public string ObjectKey { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long Size { get; set; }
}

