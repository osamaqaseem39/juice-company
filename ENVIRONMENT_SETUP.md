# Environment Configuration Setup Guide

## Overview
This guide explains how to configure environment variables for the Nature Harvest Juice Company application. The application uses a centralized environment configuration system that supports different settings for development and production environments.

## File Structure
```
natureharvest-admin/
├── client/
│   ├── src/config/env.ts          # Client-side environment config
│   └── env.example                # Client environment template
└── server/
    ├── config/env.js              # Server-side environment config
    └── .env.example               # Server environment template
```

## Client-Side Configuration (`client/src/config/env.ts`)

### Required Environment Variables

#### API Configuration
```bash
# Base API URL for REST endpoints
REACT_APP_API_URL=http://localhost:3002

# Upload URL (optional - auto-detects based on environment)
# Local: uses REACT_APP_API_URL/api/upload
# Production: uses https://natureharvest.osamaqaseem.online/upload.php
REACT_APP_UPLOAD_URL=https://your-custom-upload-server.com/upload
```

#### Environment
```bash
# Environment mode
NODE_ENV=development  # or 'production'
```

### Optional Environment Variables

#### Logging
```bash
REACT_APP_LOG_LEVEL=info  # debug, info, warn, error
```

#### External Services
```bash
REACT_APP_GA_ID=your-google-analytics-id
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Upload URL Behavior

The upload URL automatically adapts based on the environment:

- **Development**: Uses `${REACT_APP_API_URL}/api/upload` (e.g., `http://localhost:3002/api/upload`)
- **Production**: Uses `https://natureharvest.osamaqaseem.online/upload.php`
- **Custom**: Override with `REACT_APP_UPLOAD_URL` environment variable

### Usage in Code

```typescript
import { API_BASE_URL, GRAPHQL_URL, UPLOAD_URL, ENV } from '../config/env';

// API calls
const response = await fetch(`${API_BASE_URL}/api/blogs`);

// GraphQL calls
const client = new ApolloClient({
  uri: GRAPHQL_URL
});

// File uploads
const formData = new FormData();
formData.append('file', file);
const uploadResponse = await fetch(UPLOAD_URL, {
  method: 'POST',
  body: formData
});
```

## Server-Side Configuration (`server/config/env.js`)

### Required Environment Variables

#### Database
```bash
MONGODB_URI=mongodb://localhost:27017/natureharvest
```

#### Authentication
```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

### Optional Environment Variables

#### Server Configuration
```bash
PORT=3002
NODE_ENV=development
```

#### CORS Origins
The server automatically includes common development and production origins. You can override by setting:
```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://yourdomain.com
```

#### File Upload
```bash
UPLOAD_PATH=../uploads
MAX_FILE_SIZE=10485760  # 10MB in bytes
```

#### Rate Limiting
```bash
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

#### External Services
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Environment-Specific Configurations

### Development Environment

#### Client (`.env`)
```bash
REACT_APP_API_URL=http://localhost:3002
NODE_ENV=development
REACT_APP_LOG_LEVEL=debug
```

#### Server (`.env`)
```bash
PORT=3002
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/natureharvest-dev
JWT_SECRET=dev-secret-key
```

### Production Environment

#### Client (Vercel Environment Variables)
```bash
REACT_APP_API_URL=https://your-api-domain.com
NODE_ENV=production
REACT_APP_LOG_LEVEL=info
REACT_APP_GA_ID=G-XXXXXXXXXX
REACT_APP_SENTRY_DSN=https://your-sentry-dsn
```

#### Server (Vercel Environment Variables)
```bash
PORT=3002
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/natureharvest
JWT_SECRET=your-super-secure-production-secret
```

## Setup Instructions

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd natureharvest-admin
   ```

2. **Set up client environment**
   ```bash
   cd client
   cp env.example .env
   # Edit .env with your local settings
   ```

3. **Set up server environment**
   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env with your local settings
   ```

4. **Install dependencies and start**
   ```bash
   # Terminal 1 - Start server
   cd server
   npm install
   npm run dev
   
   # Terminal 2 - Start client
   cd client
   npm install
   npm start
   ```

### Production Deployment (Vercel)

1. **Deploy Server**
   - Connect your GitHub repository to Vercel
   - Set the root directory to `natureharvest-admin/server`
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NODE_ENV=production`

2. **Deploy Client**
   - Create a new Vercel project for the client
   - Set the root directory to `natureharvest-admin/client`
   - Add environment variables:
     - `REACT_APP_API_URL` (point to your server URL)
     - `NODE_ENV=production`
     - `REACT_APP_GA_ID` (if using Google Analytics)
     - `REACT_APP_SENTRY_DSN` (if using Sentry)

## Upload Configuration Details

### Local Development
- **Upload Endpoint**: `http://localhost:3002/api/upload`
- **Storage**: Local server file system
- **Configuration**: Automatic based on `REACT_APP_API_URL`

### Production
- **Upload Endpoint**: `https://natureharvest.osamaqaseem.online/upload.php`
- **Storage**: External upload service
- **Configuration**: Automatic based on `NODE_ENV=production`

### Custom Upload Server
- **Upload Endpoint**: Set via `REACT_APP_UPLOAD_URL`
- **Storage**: Your custom upload service
- **Configuration**: Overrides automatic detection

## Best Practices

### Security
- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Regularly rotate JWT secrets
- Validate all environment variables

### Performance
- Use appropriate log levels for each environment
- Configure caching settings based on usage patterns
- Set reasonable rate limits for your use case

### Monitoring
- Set up logging for production environments
- Configure error tracking (Sentry)
- Monitor API performance and usage

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `ALLOWED_ORIGINS` includes your client URL
   - Check that server is running on correct port

2. **Upload Failures**
   - Verify upload URL is accessible
   - Check file size limits
   - Ensure proper CORS headers

3. **Authentication Issues**
   - Verify JWT_SECRET is set correctly
   - Check token expiration settings
   - Ensure client and server use same secret

4. **Database Connection**
   - Verify MONGODB_URI format
   - Check network connectivity
   - Ensure database user has proper permissions

### Debug Mode
Enable debug logging by setting:
```bash
REACT_APP_LOG_LEVEL=debug  # Client
LOG_LEVEL=debug            # Server
```

## Configuration Validation

The application includes validation for required environment variables:

- **Client**: Warns if `REACT_APP_API_URL` is missing in production
- **Server**: Exits if `MONGODB_URI` is missing in production
- **Server**: Warns if `JWT_SECRET` is using default value in production

## Migration from Hardcoded URLs

If migrating from hardcoded URLs:

1. Update all API calls to use `API_BASE_URL`
2. Update all GraphQL calls to use `GRAPHQL_URL`
3. Update all upload calls to use `UPLOAD_URL`
4. Test in both development and production environments
5. Update deployment scripts and documentation

## Support

For issues with environment configuration:
1. Check the troubleshooting section above
2. Verify all required environment variables are set
3. Check server logs for detailed error messages
4. Ensure proper file permissions for `.env` files 