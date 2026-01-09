using System.Text;
using System.Text.RegularExpressions;

namespace KWingX.Application.Common.Helpers;

public static class SlugHelper
{
    private static readonly Regex NonAsciiRegex = new(@"[^\w\s-]", RegexOptions.Compiled);
    private static readonly Regex WhitespaceRegex = new(@"\s+", RegexOptions.Compiled);
    private static readonly Regex HyphenRegex = new(@"-+", RegexOptions.Compiled);

    public static string GenerateSlug(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            return string.Empty;

        // Convert to lowercase
        var slug = title.ToLowerInvariant();

        // Remove non-ASCII characters (keep only word chars, spaces, hyphens)
        slug = NonAsciiRegex.Replace(slug, string.Empty);

        // Replace whitespace with hyphens
        slug = WhitespaceRegex.Replace(slug, "-");

        // Remove multiple consecutive hyphens
        slug = HyphenRegex.Replace(slug, "-");

        // Trim hyphens from start and end
        slug = slug.Trim('-');

        return slug;
    }

    public static string EnsureUniqueSlug(string baseSlug, Func<string, Task<bool>> slugExistsAsync)
    {
        return EnsureUniqueSlugAsync(baseSlug, slugExistsAsync).GetAwaiter().GetResult();
    }

    public static async Task<string> EnsureUniqueSlugAsync(string baseSlug, Func<string, Task<bool>> slugExistsAsync)
    {
        if (string.IsNullOrWhiteSpace(baseSlug))
            return string.Empty;

        var slug = baseSlug;
        var counter = 1;

        while (await slugExistsAsync(slug))
        {
            slug = $"{baseSlug}-{counter}";
            counter++;
        }

        return slug;
    }
}

