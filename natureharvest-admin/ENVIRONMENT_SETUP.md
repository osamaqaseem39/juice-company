# Environment Configuration Setup

This document explains how to set up and use the universal environment configuration for the Nature Harvest Juice Company application.

## Overview

The application now uses centralized environment configuration files to manage all environment variables and configuration settings. This makes it easier to:

- Manage different environments (development, staging, production)
- Share configuration between client and server
- Avoid hardcoded values
- Ensure consistency across the application

## File Structure

```
natureharvest-admin/
├── client/
│   ├── src/
│   │   └── config/
│   │       └── env.ts          # Client environment configuration
│   └── env.example             # Example client environment variables
├── server/
│   ├── config/
│   │   └── env.js              # Server environment configuration
│   └── .env.example            # Example server environment variables
└── ENVIRONMENT_SETUP.md        # This file
```

## Client Configuration

### Environment Variables

Create a `.env` file in the `client` directory with the following variables:

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3002

# Environment
NODE_ENV=development

# Logging
REACT_APP_LOG_LEVEL=info

# External Services (optional)
REACT_APP_GA_ID=your-google-analytics-id
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Usage in Code

```typescript
import { API_BASE_URL, GRAPHQL_URL, ENV } from '../config/env';

// Use the centralized configuration
const response = await fetch(`${API_BASE_URL}/api/blogs`);
const graphqlClient = new ApolloClient({ uri: GRAPHQL_URL });

// Check environment
if (ENV.IS_PRODUCTION) {
  // Production-specific code
}

// Use feature flags
if (ENV.ENABLE_GRAPHQL) {
  // GraphQL-specific code
}
```

## Server Configuration

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```bash
# Server Configuration
PORT=3002
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/natureharvest

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=info

# External Services (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Usage in Code

```javascript
const ENV = require('./config/env');

// Use the centralized configuration
const PORT = ENV.PORT;
const mongoURI = ENV.MONGODB_URI;

// Check environment
if (ENV.IS_PRODUCTION) {
  // Production-specific code
}

// Use feature flags
if (ENV.ENABLE_GRAPHQL) {
  // GraphQL-specific code
}
```

## Available Configuration Options

### Client Configuration (`client/src/config/env.ts`)

| Property | Description | Default |
|----------|-------------|---------|
| `API_BASE_URL` | Base URL for API requests | `http://localhost:3002` |
| `GRAPHQL_URL` | GraphQL endpoint URL | `http://localhost:3002/graphql` |
| `IS_PRODUCTION` | Whether running in production | `false` |
| `IS_DEVELOPMENT` | Whether running in development | `true` |
| `AUTH_TOKEN_KEY` | LocalStorage key for auth token | `'auth_token'` |
| `ENABLE_GRAPHQL` | Enable GraphQL features | `true` |
| `ENABLE_REST_API` | Enable REST API features | `true` |
| `MAX_FILE_SIZE` | Maximum file upload size | `5MB` |
| `DEFAULT_PAGE_SIZE` | Default pagination size | `10` |

### Server Configuration (`server/config/env.js`)

| Property | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3002` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `ALLOWED_ORIGINS` | CORS allowed origins | Array of localhost URLs |
| `MAX_FILE_SIZE` | Maximum file upload size | `10MB` |
| `RATE_LIMIT_MAX_REQUESTS` | Rate limiting requests | `100` |
| `BCRYPT_ROUNDS` | Password hashing rounds | `12` |
| `ENABLE_GRAPHQL` | Enable GraphQL features | `true` |
| `ENABLE_SWAGGER` | Enable Swagger docs | Development only |

## Environment-Specific Configuration

### Development

```bash
# Client
REACT_APP_API_URL=http://localhost:3002
NODE_ENV=development

# Server
PORT=3002
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/natureharvest-dev
```

### Production

```bash
# Client
REACT_APP_API_URL=https://your-production-api.com
NODE_ENV=production

# Server
PORT=3002
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/natureharvest
JWT_SECRET=your-super-secure-production-secret
```

## Deployment

### Vercel Deployment

For Vercel deployment, set the following environment variables in your Vercel project settings:

**Client Environment Variables:**
- `REACT_APP_API_URL`: Your production API URL
- `NODE_ENV`: `production`
- `REACT_APP_GA_ID`: Your Google Analytics ID (optional)
- `REACT_APP_SENTRY_DSN`: Your Sentry DSN (optional)

**Server Environment Variables:**
- `MONGODB_URI`: Your production MongoDB connection string
- `JWT_SECRET`: Your production JWT secret
- `NODE_ENV`: `production`
- `PORT`: `3002` (or let Vercel set it automatically)

### Local Development

1. Copy the example environment files:
   ```bash
   # Client
   cp client/env.example client/.env
   
   # Server
   cp server/.env.example server/.env
   ```

2. Update the values in the `.env` files according to your setup

3. Start the development servers:
   ```bash
   # Server
   cd server && npm run dev
   
   # Client
   cd client && npm start
   ```

## Best Practices

1. **Never commit `.env` files** - They contain sensitive information
2. **Use different values for different environments** - Don't use production values in development
3. **Validate required environment variables** - The configuration files will warn you if required variables are missing
4. **Use feature flags** - Enable/disable features based on environment
5. **Keep secrets secure** - Use strong, unique secrets for production
6. **Document changes** - Update this file when adding new configuration options

## Troubleshooting

### Common Issues

1. **"REACT_APP_API_URL is not set"**
   - Make sure you have a `.env` file in the client directory
   - Ensure the variable is prefixed with `REACT_APP_`

2. **"MONGODB_URI environment variable is required"**
   - Set the `MONGODB_URI` variable in your server `.env` file
   - Ensure the MongoDB connection string is correct

3. **CORS errors**
   - Check that your client URL is in the `ALLOWED_ORIGINS` array
   - Update the server configuration if needed

4. **Port conflicts**
   - Change the `PORT` variable in the server configuration
   - Update the client `REACT_APP_API_URL` to match

### Validation

The configuration files include validation that will:
- Warn about missing required variables
- Check for production security issues
- Validate environment-specific settings

Check the console output for any warnings or errors when starting the application. 