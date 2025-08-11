# GraphQL Troubleshooting Guide

## Common Issues and Solutions

### 1. 400 Bad Request Error

**Symptoms:**
- HTTP 400 status code when accessing `/graphql`
- "Bad Request" error message
- GraphQL playground not loading

**Possible Causes:**
- Malformed GraphQL query
- Schema validation errors
- CORS issues
- Authentication problems
- Database connection issues

**Solutions:**

#### A. Check Schema Validity
```bash
# Run the test script
npm run test:graphql

# Or manually test the health endpoint
curl https://juice-company-server.vercel.app/graphql-health
```

#### B. Test Basic GraphQL Query
```bash
curl -X POST https://juice-company-server.vercel.app/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { __schema { queryType { name } } }"
  }'
```

#### C. Check CORS Configuration
Make sure your frontend origin is in the allowed origins list in `config/env.js`:

```javascript
ALLOWED_ORIGINS: [
  'https://juice-company-dashboard.vercel.app',
  'https://juice-company-server.vercel.app',
  // ... other origins
]
```

### 2. Database Connection Issues

**Symptoms:**
- GraphQL queries returning errors
- "Database connection not ready" messages
- Timeout errors

**Solutions:**

#### A. Check MongoDB Connection
```bash
# Test the root endpoint
curl https://juice-company-server.vercel.app/

# Check MongoDB status in response
```

#### B. Verify Environment Variables
Ensure these environment variables are set in Vercel:
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV`

### 3. Authentication Issues

**Symptoms:**
- "Not authenticated" errors
- JWT token validation failures
- Authorization header problems

**Solutions:**

#### A. Check JWT Token
```javascript
// Make sure you're sending the token correctly
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  // or
  'x-auth-token': token
};
```

#### B. Test Without Authentication
Some queries don't require authentication. Test with a simple query first:
```graphql
query {
  products {
    _id
    name
  }
}
```

### 4. Schema Issues

**Symptoms:**
- "Cannot query field" errors
- Type mismatch errors
- Missing resolver errors

**Solutions:**

#### A. Check Schema Definition
Verify all types are properly defined in `schema/types/` directory.

#### B. Check Resolvers
Ensure all resolvers are properly exported and merged in `schema/index.js`.

### 5. Development vs Production Issues

**Symptoms:**
- Works locally but not in production
- Different error messages in different environments

**Solutions:**

#### A. Environment-Specific Debugging
```javascript
// Check environment in logs
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('IS_PRODUCTION:', ENV.IS_PRODUCTION);
```

#### B. Vercel-Specific Issues
- Check Vercel function logs
- Verify environment variables in Vercel dashboard
- Check function timeout settings

## Testing Commands

### 1. Local Testing
```bash
# Start the server
npm run dev

# Test GraphQL
npm run test:graphql

# Test specific endpoint
curl http://localhost:3002/graphql-health
```

### 2. Production Testing
```bash
# Test production GraphQL
curl -X POST https://juice-company-server.vercel.app/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { products { _id name } }"}'

# Test health endpoint
curl https://juice-company-server.vercel.app/graphql-health
```

### 3. Frontend Testing
```javascript
// Test from frontend
const response = await fetch('https://juice-company-server.vercel.app/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query {
        products {
          _id
          name
          description
        }
      }
    `
  })
});

const data = await response.json();
console.log(data);
```

## Debugging Tools

### 1. GraphQL Playground
- Development: `http://localhost:3002/graphql`
- Production: Not available (disabled for security)

### 2. Health Endpoints
- Root: `https://juice-company-server.vercel.app/`
- GraphQL Health: `https://juice-company-server.vercel.app/graphql-health`

### 3. Logs
Check server logs for detailed error information:
- GraphQL request/response logs
- Authentication errors
- Database connection issues

## Common GraphQL Queries

### 1. Test Products
```graphql
query {
  products {
    _id
    name
    slug
    description
    isActive
    categoryId {
      _id
      name
    }
    brandId {
      _id
      name
    }
  }
}
```

### 2. Test Categories
```graphql
query {
  categories {
    _id
    name
    slug
    description
    isActive
  }
}
```

### 3. Test Brands
```graphql
query {
  brands {
    _id
    name
    slug
    description
    isActive
  }
}
```

## Environment Variables Checklist

Make sure these are set in your Vercel environment:

```bash
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=3002
```

## Support

If you're still experiencing issues:

1. Check the server logs in Vercel dashboard
2. Run the test script: `npm run test:graphql`
3. Test the health endpoints
4. Verify all environment variables are set
5. Check CORS configuration
6. Ensure database is accessible

## Recent Fixes Applied

1. **Enhanced Error Handling**: Added comprehensive error handling in GraphQL resolvers
2. **Better CORS Configuration**: Improved CORS settings for GraphQL endpoint
3. **Schema Validation**: Added schema validation options
4. **Health Check Endpoints**: Added `/graphql-health` endpoint for debugging
5. **Request Logging**: Added detailed request/response logging
6. **Test Script**: Created `test-graphql.js` for automated testing 