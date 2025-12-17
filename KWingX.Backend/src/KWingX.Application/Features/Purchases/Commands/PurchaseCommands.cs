using KWingX.Application.Common.Interfaces;
using KWingX.Application.Common.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;
using MediatR;

namespace KWingX.Application.Features.Purchases.Commands;

// --- Commands ---
public record PurchaseTemplateCommand(Guid UserId, Guid TemplateId) : IRequest<Guid>;

// --- Handlers ---
public class PurchaseHandlers : IRequestHandler<PurchaseTemplateCommand, Guid>
{
    private readonly IPurchaseRepository _purchaseRepo;
    private readonly ITemplateRepository _templateRepo;
    private readonly IKeyGeneratorService _keyGen;

    public PurchaseHandlers(IPurchaseRepository purchaseRepo, ITemplateRepository templateRepo, IKeyGeneratorService keyGen)
    {
        _purchaseRepo = purchaseRepo;
        _templateRepo = templateRepo;
        _keyGen = keyGen;
    }

    public async Task<Guid> Handle(PurchaseTemplateCommand request, CancellationToken cancellationToken)
    {
        var template = await _templateRepo.GetByIdAsync(request.TemplateId);
        if (template == null) throw new Exception("Template not found");

        var purchase = new Purchase
        {
            UserId = request.UserId,
            PurchaseType = PurchaseType.Template,
            TemplateId = request.TemplateId,
            Status = PurchaseStatus.Active,
            Price = template.Price,
            Currency = template.Currency,
            PurchasedAt = DateTime.UtcNow
        };

        // Generate License Key
        purchase.LicenseKeys.Add(new LicenseKey
        {
            Key = _keyGen.GenerateLicenseKey(),
            Status = KeyStatus.Active
        });

        await _purchaseRepo.AddAsync(purchase);
        return purchase.Id;
    }
}
