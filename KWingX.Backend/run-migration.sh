#!/bin/bash
# Script to run EF Core migration
# Run this from the project root

echo "Running EF Core migration..."
echo ""

INFRA_PATH="src/KWingX.Infrastructure"
WEBAPI_PATH="src/KWingX.WebApi"

if [ ! -d "$INFRA_PATH" ]; then
    echo "Error: Infrastructure project not found at $INFRA_PATH"
    exit 1
fi

if [ ! -d "$WEBAPI_PATH" ]; then
    echo "Error: WebApi project not found at $WEBAPI_PATH"
    exit 1
fi

echo "Applying migration: UpdateBlogPostForHtmlContent"
echo ""

dotnet ef database update --project "$INFRA_PATH" --startup-project "$WEBAPI_PATH"

if [ $? -eq 0 ]; then
    echo ""
    echo "Migration completed successfully!"
else
    echo ""
    echo "Migration failed. Please check the error messages above."
    exit 1
fi

