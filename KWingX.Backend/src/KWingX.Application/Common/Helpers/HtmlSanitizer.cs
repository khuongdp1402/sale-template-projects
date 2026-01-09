using System.Text.RegularExpressions;

namespace KWingX.Application.Common.Helpers;

public static class HtmlSanitizer
{
    // Minimal XSS protection: remove script tags and event handlers
    // For production, consider using a library like HtmlSanitizer (https://github.com/mganss/HtmlSanitizer)
    private static readonly Regex ScriptTagRegex = new(
        @"<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>",
        RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.Singleline);

    private static readonly Regex EventHandlerRegex = new(
        @"\s*on\w+\s*=\s*[""'][^""']*[""']",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    private static readonly Regex JavaScriptProtocolRegex = new(
        @"javascript\s*:",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    /// <summary>
    /// Sanitizes HTML content by removing potentially dangerous elements.
    /// This is a minimal implementation. For production, use a proper HTML sanitizer library.
    /// </summary>
    public static string Sanitize(string html)
    {
        if (string.IsNullOrWhiteSpace(html))
            return html;

        // Remove script tags
        html = ScriptTagRegex.Replace(html, string.Empty);

        // Remove event handlers (onclick, onerror, etc.)
        html = EventHandlerRegex.Replace(html, string.Empty);

        // Remove javascript: protocol
        html = JavaScriptProtocolRegex.Replace(html, string.Empty);

        return html;
    }
}

