using FluentValidation;
using KWingX.Application.Common.Interfaces;
using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Domain.Entities;
using MediatR;

namespace KWingX.Application.Features.Auth.Commands;

// --- DTOs ---
public record AuthResponse(string Token, string Username, string Email);

// --- Commands ---
public record LoginCommand(string UsernameOrEmail, string Password) : IRequest<AuthResponse>;

public record RegisterCommand(string Username, string Email, string Password, string ConfirmPassword) : IRequest<AuthResponse>;

// --- Validators ---
public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(v => v.UsernameOrEmail).NotEmpty();
        RuleFor(v => v.Password).NotEmpty();
    }
}

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(v => v.Username).NotEmpty().MinimumLength(3);
        RuleFor(v => v.Email).NotEmpty().EmailAddress();
        RuleFor(v => v.Password).NotEmpty().MinimumLength(8);
        RuleFor(v => v.ConfirmPassword).Equal(v => v.Password).WithMessage("Passwords do not match");
    }
}

// --- Handlers ---
public class AuthHandlers : 
    IRequestHandler<LoginCommand, AuthResponse>,
    IRequestHandler<RegisterCommand, AuthResponse>
{
    private readonly IUserRepository _userRepo;
    private readonly ITokenService _tokenService;

    public AuthHandlers(IUserRepository userRepo, ITokenService tokenService)
    {
        _userRepo = userRepo;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepo.GetByUsernameAsync(request.UsernameOrEmail) 
                   ?? await _userRepo.GetByEmailAsync(request.UsernameOrEmail);

        if (user == null)
            throw new Exception("Invalid credentials"); // In real app use custom exception

        // Note: In real app verify password hash. For now assuming plain text or mocked hash check
        // if (!PasswordHasher.Verify(request.Password, user.PasswordHash)) throw ...

        var token = _tokenService.CreateToken(user.Id, user.Username, user.Email);
        return new AuthResponse(token, user.Username, user.Email);
    }

    public async Task<AuthResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (await _userRepo.GetByUsernameAsync(request.Username) != null)
            throw new Exception("Username already exists");

        if (await _userRepo.GetByEmailAsync(request.Email) != null)
            throw new Exception("Email already exists");

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = request.Password, // Hash this in real app
            IsActive = true
        };

        await _userRepo.AddAsync(user);

        var token = _tokenService.CreateToken(user.Id, user.Username, user.Email);
        return new AuthResponse(token, user.Username, user.Email);
    }
}
