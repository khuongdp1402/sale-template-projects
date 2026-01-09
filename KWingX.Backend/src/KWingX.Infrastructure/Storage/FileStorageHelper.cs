namespace KWingX.Infrastructure.Storage;

public static class FileStorageHelper
{
    public static string GenerateObjectKey(string prefix, string fileName)
    {
        var now = DateTime.UtcNow;
        var sanitizedFileName = SanitizeFileName(fileName);
        var guid = Guid.NewGuid().ToString("N");
        var extension = Path.GetExtension(sanitizedFileName);
        var nameWithoutExt = Path.GetFileNameWithoutExtension(sanitizedFileName);
        
        // Format: prefix/yyyy/MM/dd/guid-sanitizedFileName
        return $"{prefix}/{now:yyyy}/{now:MM}/{now:dd}/{guid}-{nameWithoutExt}{extension}";
    }

    private static string SanitizeFileName(string fileName)
    {
        var invalidChars = Path.GetInvalidFileNameChars();
        var sanitized = string.Join("_", fileName.Split(invalidChars, StringSplitOptions.RemoveEmptyEntries));
        return sanitized.Length > 100 ? sanitized.Substring(0, 100) : sanitized;
    }
}

