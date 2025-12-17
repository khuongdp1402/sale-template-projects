using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces;

public interface IUnitOfWork : IDisposable
{
    // Repositories with specific interfaces
    ITemplateRepository Templates { get; }
    IBlogRepository BlogPosts { get; }
    IUserRepository Users { get; }
    IPurchaseRepository Purchases { get; }
    IRepository<LicenseKey> LicenseKeys { get; }
    IRepository<Service> Services { get; }
    IRepository<ApiKey> ApiKeys { get; }
    IContactRequestRepository ContactRequests { get; }
    IPaymentRepository Payments { get; }
    ILogRepository Logs { get; }
    IDeploymentRepository Deployments { get; }
    IOrderRepository Orders { get; }
    ILandingSectionRepository LandingSections { get; }
    
    // Transaction methods
    Task BeginTransactionAsync();
    Task CommitAsync();
    Task RollbackAsync();
    
    // Save changes
    Task<int> SaveChangesAsync();
    
    // Helper for transaction execution
    Task ExecuteInTransactionAsync(Func<Task> action);
}

