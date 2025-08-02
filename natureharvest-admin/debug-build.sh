#!/bin/bash

echo "🔍 Nature Harvest Admin - Build Debug"
echo "====================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the root directory."
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo ""

# Navigate to client directory
echo "📂 Navigating to client directory..."
cd client

if [ ! -f "package.json" ]; then
    echo "❌ Error: client/package.json not found."
    exit 1
fi

echo "✅ Found client/package.json"
echo ""

# Run the debug script
echo "🔧 Running build debug script..."
node build-debug.js

echo ""
echo "🎯 Debug complete! Check the output above for any issues." 