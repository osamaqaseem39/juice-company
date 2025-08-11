const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

async function testAPI() {
  console.log('🧪 Testing Nature Harvest Juice Company API...');
  console.log('=============================================');

  try {
    // Test 1: Health check
    console.log('\n1. Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Health check passed:', healthResponse.data.status);

    // Test 2: Swagger JSON
    console.log('\n2. Testing Swagger JSON...');
    const swaggerResponse = await axios.get(`${BASE_URL}/api-docs/swagger.json`);
    console.log('✅ Swagger JSON accessible');
    console.log('📋 API Title:', swaggerResponse.data.info.title);
    console.log('📊 Total endpoints:', Object.keys(swaggerResponse.data.paths).length);

    // Test 3: List all endpoints
    console.log('\n3. Available endpoints:');
    const endpoints = Object.keys(swaggerResponse.data.paths);
    endpoints.forEach(endpoint => {
      const methods = Object.keys(swaggerResponse.data.paths[endpoint]);
      console.log(`   ${endpoint} (${methods.join(', ')})`);
    });

    // Test 4: Check for Petstore references
    console.log('\n4. Checking for Petstore references...');
    const swaggerContent = JSON.stringify(swaggerResponse.data);
    if (swaggerContent.includes('petstore') || swaggerContent.includes('Pet')) {
      console.log('❌ Found Petstore references - this is wrong!');
    } else {
      console.log('✅ No Petstore references found - this is correct!');
    }

    console.log('\n🎉 API test completed successfully!');
    console.log('\n📚 Your API documentation should be available at:');
    console.log(`   http://localhost:3002/api-docs`);

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your server is running with: npm start');
    }
  }
}

testAPI(); 