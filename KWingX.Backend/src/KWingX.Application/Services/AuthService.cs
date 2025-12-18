using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using KWingX.Application.Common.Interfaces;
using KWingX.Application.DTOs.Auth;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Application.Interfaces.Services;
using KWingX.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace KWingX.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ITenantContext _tenantContext;

    public AuthService(
        IUserRepository userRepository, 
        ITokenService tokenService, 
        IPasswordHasher passwordHasher,
        IHttpContextAccessor httpContextAccessor,
        ITenantContext tenantContext)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
        _httpContextAccessor = httpContextAccessor;
        _tenantContext = tenantContext;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByUsernameWithRolesAsync(request.Username)
                   ?? await _userRepository.GetByEmailWithRolesAsync(request.Username);

        if (user == null || !_passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials.");

        if (!user.IsActive)
            throw new UnauthorizedAccessException("User account is inactive.");

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var token = _tokenService.CreateToken(user.Id, user.Username, user.Email, roles);

        return new AuthResponse
        {
            Token = token,
            User = MapToDto(user)
        };
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _userRepository.GetByUsernameAsync(request.Username)
                           ?? await _userRepository.GetByEmailAsync(request.Email);
        
        if (existingUser != null)
            throw new InvalidOperationException("User already exists.");

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = _passwordHasher.HashPassword(request.Password),
            IsActive = true
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        // Refresh user to get roles (even if empty for now)
        var roles = new List<string>();
        var token = _tokenService.CreateToken(user.Id, user.Username, user.Email, roles);

        return new AuthResponse
        {
            Token = token,
            User = MapToDto(user)
        };
    }

    public async Task<UserDto> GetMeAsync()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userIdStr = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                        ?? user?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new UnauthorizedAccessException("User not authenticated.");

        var userEntity = await _userRepository.GetByIdWithRolesAsync(userId);
        if (userEntity == null)
            throw new UnauthorizedAccessException("User not found.");

        return MapToDto(userEntity);
    }

    public async Task UpdateProfileAsync(UpdateProfileRequest request)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userIdStr = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                        ?? user?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new UnauthorizedAccessException();

        var userEntity = await _userRepository.GetByIdAsync(userId);
        if (userEntity == null) throw new UnauthorizedAccessException();

        userEntity.Email = request.Email;
        userEntity.Phone = request.Phone;

        await _userRepository.UpdateAsync(userEntity);
        await _userRepository.SaveChangesAsync();
    }

    public async Task ChangePasswordAsync(ChangePasswordRequest request)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userIdStr = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                        ?? user?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new UnauthorizedAccessException();

        var userEntity = await _userRepository.GetByIdAsync(userId);
        if (userEntity == null) throw new UnauthorizedAccessException();

        if (!_passwordHasher.VerifyPassword(request.OldPassword, userEntity.PasswordHash))
            throw new InvalidOperationException("Invalid old password.");

        userEntity.PasswordHash = _passwordHasher.HashPassword(request.NewPassword);

        await _userRepository.UpdateAsync(userEntity);
        await _userRepository.SaveChangesAsync();
    }

    private UserDto MapToDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Roles = user.UserRoles?.Select(ur => ur.Role.Name).ToList() ?? new List<string>(),
            TenantId = _tenantContext.TenantId,
            TenantCode = _tenantContext.TenantCode
        };
    }
}
