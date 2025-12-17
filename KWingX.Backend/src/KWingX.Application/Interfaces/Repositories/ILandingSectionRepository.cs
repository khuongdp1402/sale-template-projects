using KWingX.Domain.Entities;

namespace KWingX.Application.Interfaces.Repositories;

public interface ILandingSectionRepository : IRepository<LandingSection>
{
    Task<List<LandingSection>> GetActiveSectionsAsync();
}


