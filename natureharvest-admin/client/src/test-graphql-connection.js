const axios = require('axios');

const GRAPHQL_URL = 'http://localhost:3002/graphql';

async function testGraphQLConnection() {
  console.log('🔗 Testing GraphQL Connection...');
  console.log('================================');

  try {
    // Test GraphQL introspection query
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
            subscriptionType {
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

    const response = await axios.post(GRAPHQL_URL, introspectionQuery, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('✅ GraphQL server is accessible');
    console.log('📊 Query Types:', response.data.data.__schema.queryType?.name || 'None');
    console.log('📊 Mutation Types:', response.data.data.__schema.mutationType?.name || 'None');
    console.log('📊 Total Types:', response.data.data.__schema.types.length);

    // List some available types
    const types = response.data.data.__schema.types
      .filter(type => type.kind === 'OBJECT' && !type.name.startsWith('__'))
      .slice(0, 10);
    
    console.log('\n📋 Available GraphQL Types (first 10):');
    types.forEach(type => {
      console.log(`   - ${type.name}`);
    });

  } catch (error) {
    console.error('❌ GraphQL connection failed:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testGraphQLConnection(); 