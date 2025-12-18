using KWingX.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KWingX.WebApi.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ServicesController : ControllerBase
{
    // Simplified: In real app use Mediator Queries
    // For now returning mock data or empty list to complete the API surface
    
    [HttpGet]
    public ActionResult<List<Service>> GetList()
    {
        return Ok(new List<Service>
        {
            new Service { Name = "Payment API", Slug = "payment-api", Price = 500000, Category = "API" },
            new Service { Name = "Chatbot AI", Slug = "chatbot-ai", Price = 1200000, Category = "Automation" }
        });
    }

    [HttpGet("{slug}")]
    public ActionResult<Service> GetDetail(string slug)
    {
        return Ok(new Service { Name = "Payment API", Slug = slug, Price = 500000, Category = "API" });
    }
}
