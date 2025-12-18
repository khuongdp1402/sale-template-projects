namespace KWingX.Application.Common.Interfaces;

public interface ITokenService
{
    string CreateToken(Guid userId, string username, string email, List<string> roles);
}
