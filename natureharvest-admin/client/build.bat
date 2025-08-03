@echo off
REM Build script for Nature Harvest Admin Dashboard (Windows)

echo 🔨 Starting build process...

REM Set environment variables for production build
set CI=false
set GENERATE_SOURCEMAP=false
set NODE_ENV=production

REM Install dependencies with legacy peer deps
echo 📦 Installing dependencies...
call npm install --legacy-peer-deps

REM Run the build
echo 🏗️  Building application...
call npm run build

REM Check if build was successful
if exist "build" (
    echo ✅ Build completed successfully!
    echo 📁 Build directory created
    
    REM Check for critical files
    if exist "build\index.html" (
        echo ✅ index.html found in build
    ) else (
        echo ❌ index.html missing from build
        exit /b 1
    )
    
    if exist "build\static" (
        echo ✅ static assets directory found
    ) else (
        echo ❌ static assets directory missing
        exit /b 1
    )
) else (
    echo ❌ Build failed - build directory not created
    exit /b 1
)

echo 🎉 Build process completed successfully! 