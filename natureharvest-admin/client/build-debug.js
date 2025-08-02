#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 React Build Debug Script');
console.log('============================\n');

// Check Node.js and npm versions
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
  console.log(`✅ npm version: ${npmVersion}\n`);
} catch (error) {
  console.log('❌ Error checking Node.js/npm versions:', error.message);
}

// Check if we're in the right directory
const currentDir = process.cwd();
console.log(`📁 Current directory: ${currentDir}`);

// Check for critical files
const criticalFiles = [
  'package.json',
  'src',
  'public',
  'public/index.html',
  'src/index.tsx',
  'src/App.tsx'
];

console.log('\n📋 Checking critical files:');
criticalFiles.forEach(file => {
  const filePath = path.join(currentDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING!`);
  }
});

// Check package.json
console.log('\n📦 Checking package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ Name: ${packageJson.name}`);
  console.log(`✅ Version: ${packageJson.version}`);
  console.log(`✅ Build script: ${packageJson.scripts?.build || 'NOT FOUND'}`);
  
  if (packageJson.dependencies) {
    console.log(`✅ Dependencies count: ${Object.keys(packageJson.dependencies).length}`);
  }
  
  if (packageJson.devDependencies) {
    console.log(`✅ Dev dependencies count: ${Object.keys(packageJson.devDependencies).length}`);
  }
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}`);
}

// Check for node_modules
console.log('\n📦 Checking node_modules:');
const nodeModulesPath = path.join(currentDir, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules exists');
  
  // Check for react-scripts
  const reactScriptsPath = path.join(nodeModulesPath, 'react-scripts');
  if (fs.existsSync(reactScriptsPath)) {
    console.log('✅ react-scripts found');
  } else {
    console.log('❌ react-scripts NOT FOUND - this will cause build failure');
  }
} else {
  console.log('❌ node_modules does not exist - dependencies not installed');
}

// Try to install dependencies
console.log('\n🔧 Attempting to install dependencies...');
try {
  console.log('Running: npm ci --legacy-peer-deps');
  const installOutput = execSync('npm ci --legacy-peer-deps', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.log('❌ Failed to install dependencies:');
  console.log(error.stdout || error.message);
  console.log('\n💡 Try running: npm install --legacy-peer-deps');
}

// Try the build
console.log('\n🏗️  Attempting build...');
try {
  console.log('Running: CI=false GENERATE_SOURCEMAP=false npm run build');
  const buildOutput = execSync('CI=false GENERATE_SOURCEMAP=false npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ Build completed successfully!');
  console.log('\n📊 Build output summary:');
  console.log(buildOutput.slice(-500)); // Show last 500 characters
} catch (error) {
  console.log('❌ Build failed:');
  console.log(error.stdout || error.message);
  
  // Try to get more detailed error info
  if (error.stderr) {
    console.log('\n🔍 Detailed error output:');
    console.log(error.stderr);
  }
}

// Check if build directory was created
console.log('\n📁 Checking build output:');
const buildPath = path.join(currentDir, 'build');
if (fs.existsSync(buildPath)) {
  console.log('✅ Build directory exists');
  const buildFiles = fs.readdirSync(buildPath);
  console.log(`✅ Build files count: ${buildFiles.length}`);
  
  if (buildFiles.includes('index.html')) {
    console.log('✅ index.html found in build');
  } else {
    console.log('❌ index.html NOT found in build');
  }
} else {
  console.log('❌ Build directory does not exist');
}

console.log('\n🎯 Debug complete!');
console.log('If build failed, check the error messages above for specific issues.'); 