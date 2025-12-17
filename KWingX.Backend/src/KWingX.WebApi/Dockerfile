# Use the official .NET 8 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["src/KWingX.WebApi/KWingX.WebApi.csproj", "src/KWingX.WebApi/"]
COPY ["src/KWingX.Application/KWingX.Application.csproj", "src/KWingX.Application/"]
COPY ["src/KWingX.Domain/KWingX.Domain.csproj", "src/KWingX.Domain/"]
COPY ["src/KWingX.Infrastructure/KWingX.Infrastructure.csproj", "src/KWingX.Infrastructure/"]
RUN dotnet restore "src/KWingX.WebApi/KWingX.WebApi.csproj"

# Copy the rest of the source code
COPY . .
WORKDIR "/src/src/KWingX.WebApi"
RUN dotnet build "KWingX.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KWingX.WebApi.csproj" -c Release -o /app/publish

# Use the official ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KWingX.WebApi.dll"]
