const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const schema = require('./schema');

// Test the schema
async function testSchema() {
  try {
    console.log('Testing GraphQL schema...');
    
    // Create a test server
    const server = new ApolloServer({
      schema,
      formatError: (error) => {
        console.error('GraphQL Error:', error);
        return error;
      }
    });

    // Test introspection query
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          types {
            name
            kind
          }
        }
      }
    `;

    const result = await server.executeOperation({
      query: introspectionQuery
    });

    if (result.body.singleResult.errors) {
      console.error('Schema validation failed:', result.body.singleResult.errors);
      return false;
    }

    console.log('✅ GraphQL schema is valid!');
    console.log('Available types:', result.body.singleResult.data.__schema.types.length);
    
    return true;
  } catch (error) {
    console.error('❌ Schema test failed:', error);
    return false;
  }
}

// Run the test
testSchema().then(success => {
  if (success) {
    console.log('🎉 Apollo Server setup is working correctly!');
  } else {
    console.log('💥 Apollo Server setup has issues.');
  }
  process.exit(success ? 0 : 1);
}); 