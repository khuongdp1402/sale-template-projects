namespace KWingX.Application.Interfaces.Services;

public record AuthResponseDto(string Token, string Username, string Email);

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(string usernameOrEmail, string password);
    Task<AuthResponseDto> RegisterAsync(string username, string email, string password, string confirmPassword);
}


