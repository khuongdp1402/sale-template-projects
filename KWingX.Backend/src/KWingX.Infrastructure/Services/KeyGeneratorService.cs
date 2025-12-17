using System.Security.Cryptography;
using System.Text;
using KWingX.Application.Common.Interfaces;

namespace KWingX.Infrastructure.Services;

public class KeyGeneratorService : IKeyGeneratorService
{
    public string GenerateLicenseKey()
    {
        // Format: KWX-XXXX-XXXX-XXXX-XXXX
        var segments = new string[4];
        for (int i = 0; i < 4; i++)
        {
            segments[i] = GenerateRandomSegment(4);
        }
        return $"KWX-{string.Join("-", segments)}";
    }

    public string GenerateApiKey()
    {
        // Format: kwx_live_XXXXXXXXXXXXXXXXXXXX
        return $"kwx_live_{GenerateRandomSegment(32).ToLower()}";
    }

    private string GenerateRandomSegment(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var result = new StringBuilder(length);
        using (var rng = RandomNumberGenerator.Create())
        {
            byte[] data = new byte[length];
            rng.GetBytes(data);
            foreach (byte b in data)
            {
                result.Append(chars[b % chars.Length]);
            }
        }
        return result.ToString();
    }
}
