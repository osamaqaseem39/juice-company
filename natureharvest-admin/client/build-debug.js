#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Nature Harvest Admin - Build Debug Script');
console.log('============================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.log('❌ Error: package.json not found. Please run this script from the client directory.');
  process.exit(1);
}

// Check Node.js version
const nodeVersion = process.version;
console.log(`📦 Node.js version: ${nodeVersion}`);

// Check npm version
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`📦 npm version: ${npmVersion}`);
} catch (error) {
  console.log('❌ Error checking npm version:', error.message);
}

// Check if src directory exists
if (!fs.existsSync('src')) {
  console.log('❌ Error: src directory not found');
  process.exit(1);
}

// Check if public directory exists
if (!fs.existsSync('public')) {
  console.log('❌ Error: public directory not found');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync('public/index.html')) {
  console.log('❌ Error: public/index.html not found');
  process.exit(1);
}

console.log('✅ Basic file structure check passed\n');

// Check for common build issues
console.log('🔍 Checking for common build issues...');

// Check TypeScript configuration
if (fs.existsSync('tsconfig.json')) {
  console.log('✅ TypeScript configuration found');
} else {
  console.log('⚠️  TypeScript configuration not found');
}

// Check for missing dependencies
console.log('\n📦 Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  console.log(`✅ Dependencies: ${dependencies.length}`);
  console.log(`✅ Dev Dependencies: ${devDependencies.length}`);
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Try to install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm ci --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.log('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Try to build
console.log('\n🔨 Attempting build...');
try {
  execSync('CI=false GENERATE_SOURCEMAP=false npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.log('❌ Build failed:', error.message);
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Check for TypeScript errors in your source files');
  console.log('2. Ensure all imports are correct');
  console.log('3. Check for missing dependencies');
  console.log('4. Verify that all required files exist');
  process.exit(1);
}

console.log('\n🎉 Build debug completed successfully!'); 