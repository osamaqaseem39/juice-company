const axios = require('axios');

const GRAPHQL_URL = 'http://localhost:3002/graphql';

async function testGraphQLSimple() {
  console.log('🔗 Testing GraphQL Connection (Simple)...');
  console.log('========================================');

  try {
    // Test a simple query (assuming there's a health check or simple query available)
    const simpleQuery = {
      query: `
        query {
          __typename
        }
      `
    };

    const response = await axios.post(GRAPHQL_URL, simpleQuery, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('✅ GraphQL server is accessible');
    console.log('📊 Response:', response.data);

  } catch (error) {
    console.error('❌ GraphQL connection failed:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testGraphQLSimple(); 