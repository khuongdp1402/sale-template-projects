using KWingX.Application;
using KWingX.Application.Mapping;
using KWingX.Application.Options;
using KWingX.Infrastructure;
using KWingX.Infrastructure.Persistence;
using KWingX.WebApi.Authorization;
using KWingX.WebApi.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// Bind strongly-typed options
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));
builder.Services.Configure<DatabaseSettings>(options =>
{
    // Bind from custom section if present
    builder.Configuration.GetSection("DatabaseSettings").Bind(options);

    // Always also bind ConnectionStrings:Postgres into DatabaseSettings.ConnectionStrings.Postgres
    var postgres = builder.Configuration.GetConnectionString("Postgres")
                   ?? builder.Configuration["ConnectionStrings:Postgres"];

    if (!string.IsNullOrWhiteSpace(postgres))
    {
        options.ConnectionStrings.Postgres = postgres;
    }
});
builder.Services.Configure<GoogleOptions>(builder.Configuration.GetSection("Google"));
builder.Services.Configure<PaymentOptions>(builder.Configuration.GetSection("Payments"));
builder.Services.Configure<TelegramOptions>(builder.Configuration.GetSection("Telegram"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// API Versioning
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader()
    );
});

builder.Services.AddVersionedApiExplorer(setup =>
{
    setup.GroupNameFormat = "'v'VVV";
    setup.SubstituteApiVersionInUrl = true;
});

builder.Services.AddExceptionHandler<KWingX.WebApi.Middleware.GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Development", builder =>
    {
        builder.WithOrigins("http://localhost:5173", "http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

// Health Checks
builder.Services.AddHealthChecks();

// Swagger with JWT and API Versioning
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "K-WingX API",
        Version = "v1",
        Description = "K-WingX API Documentation"
    });
    
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Authorization Policies
builder.Services.AddAuthorizationPolicies();

// JWT Auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Use strongly-typed JwtOptions via IOptions
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = AppSettingHelper.Jwt.Issuer,
            ValidAudience = AppSettingHelper.Jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(string.IsNullOrWhiteSpace(AppSettingHelper.Jwt.Key)
                    ? throw new InvalidOperationException("Jwt:Key is not configured. Set Jwt:Key or environment variable Jwt__Key.")
                    : AppSettingHelper.Jwt.Key))
        };
    });

var app = builder.Build();

// Initialize static DI helper for legacy/static usage
DependencyInjectionHelper.Init(app.Services);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "K-WingX API v1");
    });
}

// Auto-migrate on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        logger.LogInformation("Migrating database...");

        // This will create the DB if it doesn't exist and apply all migrations
        await Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync(context.Database);

        logger.LogInformation("Database migration completed successfully.");

        // Seed data
        await AppDbContextInitialiser.SeedAsync(context);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
        // We don't rethrow here to allow the app to start even if DB is down, 
        // but for a strict requirement we could. 
        // The prompt says "Fail loudly if connection is invalid", so let's rethrow.
        throw;
    }
}

app.UseExceptionHandler();
app.UseHttpsRedirection();

app.UseCors("Development");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();