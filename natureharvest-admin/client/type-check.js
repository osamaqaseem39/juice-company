const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 TypeScript Type Check');
console.log('========================\n');

// Check if TypeScript is available
try {
  const tscVersion = execSync('npx tsc --version', { encoding: 'utf8' }).trim();
  console.log(`✅ TypeScript version: ${tscVersion}`);
} catch (error) {
  console.log('❌ TypeScript not found or not accessible');
  console.log('💡 Try: npm install typescript --save-dev');
  process.exit(1);
}

// Check for tsconfig.json
if (!fs.existsSync('tsconfig.json')) {
  console.log('❌ tsconfig.json not found');
  process.exit(1);
}

console.log('✅ tsconfig.json found');

// Run type check
console.log('\n🔍 Running TypeScript type check...');
try {
  const typeCheckOutput = execSync('npx tsc --noEmit', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ TypeScript type check passed!');
  console.log('No type errors found.');
} catch (error) {
  console.log('❌ TypeScript type check failed:');
  console.log(error.stdout || error.message);
  
  if (error.stderr) {
    console.log('\n🔍 Detailed type errors:');
    console.log(error.stderr);
  }
}

console.log('\n🎯 Type check complete!'); 