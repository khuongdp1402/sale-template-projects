#!/bin/bash
# Script to run Admin Panel in Development Mode
# Quick Login will be available at http://localhost:5173/admin/login

echo "=================================="
echo "  KWingX Admin - Development Mode "
echo "=================================="
echo ""
echo "Starting Admin Panel with Quick Login enabled..."
echo ""

# Navigate to admin folder
cd admin

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start dev server
echo ""
echo "Starting Vite dev server..."
echo ""
echo "Quick Login will be available at:"
echo "  http://localhost:5173/admin/login"
echo ""
echo "Click 'Quick Login (Test Mode)' button to login instantly!"
echo ""

npm run dev

