@echo off
echo Building Infrastructure project...
cd src\KWingX.Infrastructure
dotnet build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Applying migration...
dotnet ef database update --startup-project ..\KWingX.WebApi
if %ERRORLEVEL% NEQ 0 (
    echo Migration failed!
    pause
    exit /b 1
)

echo.
echo Migration completed successfully!
pause

