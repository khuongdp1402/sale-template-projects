using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Persistence;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class DeploymentRepository : BaseRepository<Deployment>, IDeploymentRepository
{
    public DeploymentRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }
}


