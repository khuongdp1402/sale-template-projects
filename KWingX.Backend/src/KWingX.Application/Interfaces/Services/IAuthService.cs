using KWingX.Application.DTOs.Auth;

namespace KWingX.Application.Interfaces.Services;

public interface IAuthService
{
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<UserDto> GetMeAsync();
    Task UpdateProfileAsync(UpdateProfileRequest request);
    Task ChangePasswordAsync(ChangePasswordRequest request);
}
