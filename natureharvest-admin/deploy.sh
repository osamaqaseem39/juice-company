#!/bin/bash

# Nature Harvest Admin - Deployment Script
echo "🚀 Starting Nature Harvest Admin deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Build client
echo "🔨 Building client application..."
cd client && npm run build && cd ..

# Check if build was successful
if [ ! -d "client/build" ]; then
    echo "❌ Error: Client build failed. Check the build logs above."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "🌐 Ready for deployment to Vercel"
echo ""
echo "Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Fix package name conflicts'"
echo "2. Push to repository: git push origin main"
echo "3. Deploy to Vercel: vercel --prod" 