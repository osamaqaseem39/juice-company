// Test API connection
const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

async function testConnection() {
  console.log('🔗 Testing API Connection...');
  console.log('================================');

  try {
    // Test health check
    const healthResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Server is running and healthy');
    console.log('🔗 Available at: http://localhost:3002/api-docs');

    // Test Swagger documentation
    const swaggerResponse = await axios.get(`${BASE_URL}/api-docs/swagger.json`);
    console.log('✅ Swagger documentation accessible');
    console.log('📊 Total endpoints:', Object.keys(swaggerResponse.data.paths).length);

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('💡 Make sure your server is running on http://localhost:3002');
  }
}

testConnection(); 