const swaggerSpecs = require('./swagger');

console.log('Testing Swagger Configuration...');
console.log('==============================');

// Check if specs exist
if (!swaggerSpecs) {
  console.error('❌ No swagger specs found');
  process.exit(1);
}

console.log('✅ Swagger specs loaded');

// Check if paths exist
if (!swaggerSpecs.paths) {
  console.error('❌ No paths found in swagger specs');
  console.log('Specs object:', swaggerSpecs);
  process.exit(1);
}

console.log('✅ Swagger paths found');

// List available paths
const paths = Object.keys(swaggerSpecs.paths);
console.log(`📋 Found ${paths.length} API endpoints:`);
paths.forEach(path => {
  const methods = Object.keys(swaggerSpecs.paths[path]);
  console.log(`  ${path} (${methods.join(', ')})`);
});

// Check if info exists
if (!swaggerSpecs.info) {
  console.error('❌ No info found in swagger specs');
} else {
  console.log('✅ Swagger info found:', swaggerSpecs.info.title);
}

console.log('✅ Swagger configuration test completed successfully'); 