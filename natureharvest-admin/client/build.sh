#!/bin/bash

# Build script for Nature Harvest Admin Dashboard
echo "🔨 Starting build process..."

# Set environment variables for production build
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_ENV=production

# Install dependencies with legacy peer deps
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Run the build
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build directory created with $(ls -la build | wc -l) files"
    
    # Check for critical files
    if [ -f "build/index.html" ]; then
        echo "✅ index.html found in build"
    else
        echo "❌ index.html missing from build"
        exit 1
    fi
    
    if [ -d "build/static" ]; then
        echo "✅ static assets directory found"
    else
        echo "❌ static assets directory missing"
        exit 1
    fi
else
    echo "❌ Build failed - build directory not created"
    exit 1
fi

echo "🎉 Build process completed successfully!" 