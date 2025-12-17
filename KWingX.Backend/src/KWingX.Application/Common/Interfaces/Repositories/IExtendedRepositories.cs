using KWingX.Application.Common.Models;
using KWingX.Domain.Entities;
using KWingX.Domain.Enums;

namespace KWingX.Application.Common.Interfaces.Repositories;

// Extended repository interfaces for new entities
public interface IOrderRepository
{
    Task<PagedResponse<Order>> GetListAsync(int page, int pageSize, OrderStatus? status, DateTime? dateFrom, DateTime? dateTo, string? search);
    Task<Order?> GetByIdAsync(Guid id);
    Task AddAsync(Order order);
    Task UpdateAsync(Order order);
}

public interface IPaymentRepository
{
    Task<PagedResponse<Payment>> GetListAsync(int page, int pageSize, PaymentStatus? status, string? provider, DateTime? dateFrom, DateTime? dateTo);
    Task<Payment?> GetByIdAsync(Guid id);
    Task<List<Payment>> GetFailuresLast24hAsync();
    Task AddAsync(Payment payment);
}

public interface IContactRequestRepository
{
    Task<PagedResponse<ContactRequest>> GetListAsync(int page, int pageSize, ContactRequestStatus? status, string? search);
    Task<ContactRequest?> GetByIdAsync(Guid id);
    Task AddAsync(ContactRequest contact);
    Task UpdateAsync(ContactRequest contact);
}

public interface ILogRepository
{
    Task<PagedResponse<Log>> GetListAsync(int page, int pageSize, LogType? type, LogSeverity? severity, DateTime? dateFrom, DateTime? dateTo, string? search);
    Task<Log?> GetByIdAsync(Guid id);
    Task AddAsync(Log log);
}

public interface IDeploymentRepository
{
    Task<List<Deployment>> GetListAsync();
    Task<Deployment?> GetByIdAsync(Guid id);
    Task AddAsync(Deployment deployment);
    Task UpdateAsync(Deployment deployment);
}

public interface ILandingSectionRepository
{
    Task<List<LandingSection>> GetListAsync();
    Task<LandingSection?> GetByIdAsync(Guid id);
    Task AddAsync(LandingSection section);
    Task UpdateAsync(LandingSection section);
    Task DeleteAsync(Guid id);
}

// Extended Template Repository for Admin
public interface ITemplateRepositoryExtended : ITemplateRepository
{
    Task<PagedResponse<Template>> GetAdminListAsync(int page, int pageSize, string? search, string? category, TemplateType? type, Audience? audience, TemplateStatus? status, bool includeDeleted = false);
    Task AddAsync(Template template);
    Task UpdateAsync(Template template);
    Task DeleteAsync(Guid id);
    Task RestoreAsync(Guid id);
}

// Extended Blog Repository for Admin
public interface IBlogRepositoryExtended : IBlogRepository
{
    Task<PagedResponse<BlogPost>> GetAdminListAsync(int page, int pageSize, string? search, string? category, BlogPostStatus? status, bool includeDeleted = false);
    Task AddAsync(BlogPost post);
    Task UpdateAsync(BlogPost post);
    Task DeleteAsync(Guid id);
    Task RestoreAsync(Guid id);
}

// Extended User Repository for Admin
public interface IUserRepositoryExtended : IUserRepository
{
    Task<PagedResponse<User>> GetAdminListAsync(int page, int pageSize, string? search, Domain.Enums.UserRole? role, bool? isActive);
    Task DeleteAsync(Guid id);
}

