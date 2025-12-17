using KWingX.Application.Common.Interfaces;
using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;

namespace KWingX.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;

    public AuthService(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto> LoginAsync(string usernameOrEmail, string password)
    {
        if (string.IsNullOrWhiteSpace(usernameOrEmail))
            throw new ArgumentException("Username or email is required.", nameof(usernameOrEmail));
        if (string.IsNullOrWhiteSpace(password))
            throw new ArgumentException("Password is required.", nameof(password));

        var user = await _userRepository.GetByUsernameAsync(usernameOrEmail)
                   ?? await _userRepository.GetByEmailAsync(usernameOrEmail);

        // NOTE: Password hashing/verification should be handled via a dedicated service in Infrastructure.
        // For now, we use plain text comparison as a placeholder.
        if (user == null || user.PasswordHash != password)
            throw new UnauthorizedAccessException("Invalid credentials.");

        var token = _tokenService.CreateToken(user.Id, user.Username, user.Email);
        return new AuthResponseDto(token, user.Username, user.Email);
    }

    public async Task<AuthResponseDto> RegisterAsync(string username, string email, string password, string confirmPassword)
    {
        if (string.IsNullOrWhiteSpace(username))
            throw new ArgumentException("Username is required.", nameof(username));
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email is required.", nameof(email));
        if (string.IsNullOrWhiteSpace(password))
            throw new ArgumentException("Password is required.", nameof(password));
        if (password != confirmPassword)
            throw new ArgumentException("Passwords do not match.", nameof(confirmPassword));

        var existingUser = await _userRepository.GetByUsernameAsync(username)
                           ?? await _userRepository.GetByEmailAsync(email);
        if (existingUser != null)
            throw new InvalidOperationException("User already exists.");

        var user = new User
        {
            Username = username,
            Email = email,
            // TODO: replace with proper password hashing in Infrastructure
            PasswordHash = password,
            IsActive = true
        };

        await _userRepository.AddAsync(user);

        var token = _tokenService.CreateToken(user.Id, user.Username, user.Email);
        return new AuthResponseDto(token, user.Username, user.Email);
    }
}


