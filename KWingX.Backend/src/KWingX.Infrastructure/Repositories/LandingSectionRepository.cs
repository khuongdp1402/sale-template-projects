using KWingX.Application.Interfaces.Repositories;
using KWingX.Domain.Entities;
using KWingX.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KWingX.Infrastructure.Repositories;

public class LandingSectionRepository : BaseRepository<LandingSection>, ILandingSectionRepository
{
    public LandingSectionRepository(AppDbContext context, ILoggerFactory loggerFactory) 
        : base(context, loggerFactory) { }

    public async Task<List<LandingSection>> GetActiveSectionsAsync()
    {
        return await _dbSet
            .Where(s => s.IsActive)
            .OrderBy(s => s.Position)
            .AsNoTracking()
            .ToListAsync();
    }
}


