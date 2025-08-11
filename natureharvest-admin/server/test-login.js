const axios = require('axios');

// Test login functionality
async function testLogin() {
  const baseURL = process.env.GRAPHQL_URL || 'https://juice-company-server.vercel.app';
  
  console.log('Testing login functionality...');
  
  try {
    // Test 1: Login with valid credentials
    console.log('\n1. Testing login with valid credentials...');
    const loginQuery = {
      query: `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            user {
              _id
              fullName
              email
              roles
              isActive
            }
          }
        }
      `,
      variables: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    
    const response = await axios.post(`${baseURL}/graphql`, loginQuery, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.data.errors) {
      console.log('❌ Login failed with errors:', response.data.errors);
    } else {
      console.log('✅ Login successful');
      console.log('User:', response.data.data.login.user.fullName);
      console.log('Token received:', !!response.data.data.login.token);
    }
    
  } catch (error) {
    console.error('❌ Login test failed');
    console.error('Error:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }
}

// Test user queries
async function testUserQueries() {
  const baseURL = process.env.GRAPHQL_URL || 'https://juice-company-server.vercel.app';
  
  console.log('\nTesting user queries...');
  
  try {
    // Test 1: Get users
    console.log('\n1. Testing get users...');
    const usersQuery = {
      query: `
        query GetUsers {
          users {
            _id
            fullName
            email
            roles
            isActive
          }
        }
      `
    };
    
    const response = await axios.post(`${baseURL}/graphql`, usersQuery, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.data.errors) {
      console.log('❌ Get users failed with errors:', response.data.errors);
    } else {
      console.log('✅ Get users successful');
      console.log('Users found:', response.data.data.users.length);
      response.data.data.users.forEach(user => {
        console.log(`- ${user.fullName} (${user.email})`);
      });
    }
    
  } catch (error) {
    console.error('❌ User queries test failed');
    console.error('Error:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting login and user tests...\n');
  
  await testLogin();
  await testUserQueries();
  
  console.log('\n✨ Tests completed!');
}

// Run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testLogin, testUserQueries }; 