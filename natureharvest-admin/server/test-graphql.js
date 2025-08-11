const axios = require('axios');

// Test GraphQL endpoint
async function testGraphQL() {
  const baseURL = process.env.GRAPHQL_URL || 'http://localhost:3002';
  
  console.log('Testing GraphQL endpoint:', `${baseURL}/graphql`);
  
  try {
    // Test 1: Simple introspection query
    console.log('\n1. Testing introspection...');
    const introspectionQuery = {
      query: `
        query IntrospectionQuery {
          __schema {
            queryType {
              name
            }
            mutationType {
              name
            }
            types {
              name
              kind
            }
          }
        }
      `
    };
    
    const response1 = await axios.post(`${baseURL}/graphql`, introspectionQuery, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('✅ Introspection successful');
    console.log('Available types:', response1.data.data.__schema.types.length);
    
    // Test 2: Simple products query
    console.log('\n2. Testing products query...');
    const productsQuery = {
      query: `
        query GetProducts {
          products {
            _id
            name
            slug
            description
            isActive
          }
        }
      `
    };
    
    const response2 = await axios.post(`${baseURL}/graphql`, productsQuery, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('✅ Products query successful');
    console.log('Products found:', response2.data.data.products.length);
    
    // Test 3: Health check
    console.log('\n3. Testing health check...');
    const healthResponse = await axios.get(`${baseURL}/graphql-health`);
    console.log('✅ Health check successful');
    console.log('Schema status:', healthResponse.data.status);
    
  } catch (error) {
    console.error('❌ GraphQL test failed');
    console.error('Error:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
  }
}

// Test REST endpoints
async function testREST() {
  const baseURL = process.env.GRAPHQL_URL || 'http://localhost:3002';
  
  console.log('\nTesting REST endpoints...');
  
  try {
    // Test root endpoint
    const rootResponse = await axios.get(baseURL);
    console.log('✅ Root endpoint working');
    console.log('Server status:', rootResponse.data.status);
    
    // Test health endpoint
    const healthResponse = await axios.get(`${baseURL}/graphql-health`);
    console.log('✅ GraphQL health endpoint working');
    console.log('GraphQL status:', healthResponse.data.status);
    
  } catch (error) {
    console.error('❌ REST test failed');
    console.error('Error:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting GraphQL and REST tests...\n');
  
  await testREST();
  await testGraphQL();
  
  console.log('\n✨ Tests completed!');
}

// Run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testGraphQL, testREST };