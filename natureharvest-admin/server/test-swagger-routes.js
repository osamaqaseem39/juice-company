const axios = require('axios');

async function testSwaggerRoutes() {
  console.log('🧪 Testing Swagger Routes...');
  console.log('================================');

  try {
    // Test 1: Check if server is running
    console.log('\n1. Testing server health...');
    const healthResponse = await axios.get('http://localhost:3002/');
    console.log('✅ Server is running');

    // Test 2: Test Swagger UI endpoint
    console.log('\n2. Testing Swagger UI endpoint...');
    const swaggerUIResponse = await axios.get('http://localhost:3002/api-docs');
    console.log('✅ Swagger UI accessible');
    console.log('Content-Type:', swaggerUIResponse.headers['content-type']);

    // Test 3: Test Swagger JSON endpoint
    console.log('\n3. Testing Swagger JSON endpoint...');
    const swaggerJSONResponse = await axios.get('http://localhost:3002/api-docs/swagger.json');
    console.log('✅ Swagger JSON accessible');
    console.log('Content-Type:', swaggerJSONResponse.headers['content-type']);
    
    if (swaggerJSONResponse.headers['content-type'].includes('application/json')) {
      console.log('✅ Correct JSON content type');
      console.log('📊 Total endpoints:', Object.keys(swaggerJSONResponse.data.paths || {}).length);
      
      // List all endpoints
      const endpoints = Object.keys(swaggerJSONResponse.data.paths || {});
      console.log('\n📋 Available endpoints:');
      endpoints.forEach(endpoint => {
        const methods = Object.keys(swaggerJSONResponse.data.paths[endpoint]);
        console.log(`   ${endpoint} (${methods.join(', ')})`);
      });
    } else {
      console.log('❌ Wrong content type - got HTML instead of JSON');
      console.log('First 200 chars of response:', swaggerJSONResponse.data.substring(0, 200));
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    }
  }
}

testSwaggerRoutes(); 