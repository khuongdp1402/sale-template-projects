using FluentValidation;
using KWingX.Application.DTOs.Blog;

namespace KWingX.Application.Validators;

public class BlogPostUpdateRequestValidator : AbstractValidator<BlogPostUpdateRequest>
{
    public BlogPostUpdateRequestValidator()
    {
        // Reuse the same validation rules as Create
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MinimumLength(3).WithMessage("Title must be at least 3 characters")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters");

        RuleFor(x => x.ShortDescription)
            .NotEmpty().WithMessage("Short description is required")
            .MaximumLength(500).WithMessage("Short description must not exceed 500 characters");

        RuleFor(x => x.ContentHtml)
            .NotEmpty().WithMessage("Content is required");

        RuleFor(x => x.ButtonColor)
            .Must(color => !string.IsNullOrWhiteSpace(color) && 
                System.Text.RegularExpressions.Regex.IsMatch(color, @"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"))
            .WithMessage("Button color must be a valid hex color (e.g., #111111 or #111)");

        RuleFor(x => x.ButtonTextColor)
            .Must(color => !string.IsNullOrWhiteSpace(color) && 
                System.Text.RegularExpressions.Regex.IsMatch(color, @"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"))
            .WithMessage("Button text color must be a valid hex color (e.g., #FFFFFF or #FFF)");

        RuleFor(x => x.ButtonLinkUrl)
            .Must(url => string.IsNullOrWhiteSpace(url) || 
                System.Text.RegularExpressions.Regex.IsMatch(url, @"^https?://", 
                    System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            .WithMessage("Button link URL must be an absolute URL (http:// or https://)")
            .When(x => !string.IsNullOrWhiteSpace(x.ButtonLinkUrl));

        RuleFor(x => x.ButtonText)
            .MaximumLength(100).WithMessage("Button text must not exceed 100 characters")
            .NotEmpty().WithMessage("Button text is required when button link URL is provided")
            .When(x => !string.IsNullOrWhiteSpace(x.ButtonLinkUrl));

        RuleFor(x => x.ButtonLinkUrl)
            .NotEmpty().WithMessage("Button link URL is required when button text is provided")
            .When(x => !string.IsNullOrWhiteSpace(x.ButtonText));
    }
}

