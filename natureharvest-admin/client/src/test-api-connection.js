// Test API connection
import { healthApi } from './services/restApi';

async function testApiConnection() {
  console.log('🧪 Testing API Connection...');
  
  try {
    const health = await healthApi.check();
    console.log('✅ API Connection Successful!');
    console.log('📊 Server Status:', health.status);
    console.log('📋 API Title:', 'Nature Harvest Juice Company API');
    console.log('🔗 Available at: http://localhost:3000/api-docs');
    
    return true;
  } catch (error) {
    console.error('❌ API Connection Failed:', error.message);
    console.log('💡 Make sure your server is running on http://localhost:3000');
    return false;
  }
}

export default testApiConnection; 