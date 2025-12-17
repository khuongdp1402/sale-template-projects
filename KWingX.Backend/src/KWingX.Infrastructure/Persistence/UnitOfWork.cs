using KWingX.Application.Interfaces;
using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    private readonly ILoggerFactory _loggerFactory;
    private IDbContextTransaction? _transaction;

    // Repositories with specific interfaces
    private ITemplateRepository? _templates;
    private IBlogRepository? _blogPosts;
    private IUserRepository? _users;
    private IPurchaseRepository? _purchases;
    private IRepository<LicenseKey>? _licenseKeys;
    private IRepository<Service>? _services;
    private IRepository<ApiKey>? _apiKeys;
    private IContactRequestRepository? _contactRequests;
    private IPaymentRepository? _payments;
    private ILogRepository? _logs;
    private IDeploymentRepository? _deployments;
    private IOrderRepository? _orders;
    private ILandingSectionRepository? _landingSections;

    public UnitOfWork(AppDbContext context, ILoggerFactory loggerFactory)
    {
        _context = context;
        _loggerFactory = loggerFactory;
    }

    public ITemplateRepository Templates => 
        _templates ??= new TemplateRepository(_context, _loggerFactory);
    
    public IBlogRepository BlogPosts => 
        _blogPosts ??= new BlogRepository(_context, _loggerFactory);
    
    public IUserRepository Users => 
        _users ??= new UserRepository(_context, _loggerFactory);
    
    public IPurchaseRepository Purchases => 
        _purchases ??= new PurchaseRepository(_context, _loggerFactory);
    
    public IRepository<LicenseKey> LicenseKeys => 
        _licenseKeys ??= new BaseRepository<LicenseKey>(_context, _loggerFactory);
    
    public IRepository<Service> Services => 
        _services ??= new BaseRepository<Service>(_context, _loggerFactory);
    
    public IRepository<ApiKey> ApiKeys => 
        _apiKeys ??= new BaseRepository<ApiKey>(_context, _loggerFactory);
    
    public IContactRequestRepository ContactRequests => 
        _contactRequests ??= new ContactRequestRepository(_context, _loggerFactory);
    
    public IPaymentRepository Payments => 
        _payments ??= new PaymentRepository(_context, _loggerFactory);
    
    public ILogRepository Logs => 
        _logs ??= new LogRepository(_context, _loggerFactory);
    
    public IDeploymentRepository Deployments => 
        _deployments ??= new DeploymentRepository(_context, _loggerFactory);
    
    public IOrderRepository Orders => 
        _orders ??= new OrderRepository(_context, _loggerFactory);
    
    public ILandingSectionRepository LandingSections => 
        _landingSections ??= new LandingSectionRepository(_context, _loggerFactory);

    public async Task BeginTransactionAsync()
    {
        if (_transaction != null)
            throw new InvalidOperationException("Transaction already started");
        
        _transaction = await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitAsync()
    {
        if (_transaction == null)
            throw new InvalidOperationException("No transaction to commit");
        
        try
        {
            await _context.SaveChangesAsync();
            await _transaction.CommitAsync();
        }
        finally
        {
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public async Task RollbackAsync()
    {
        if (_transaction == null)
            throw new InvalidOperationException("No transaction to rollback");
        
        try
        {
            await _transaction.RollbackAsync();
        }
        finally
        {
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task ExecuteInTransactionAsync(Func<Task> action)
    {
        await BeginTransactionAsync();
        try
        {
            await action();
            await CommitAsync();
        }
        catch
        {
            await RollbackAsync();
            throw;
        }
    }

    public void Dispose()
    {
        _transaction?.Dispose();
    }
}

