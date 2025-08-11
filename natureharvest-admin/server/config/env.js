// Server Environment Configuration
const ENV = {
  // Server Configuration
  PORT: process.env.PORT || 3002,
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  
  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI,
  
  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS Configuration
  ALLOWED_ORIGINS: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:5173',
    'https://natureharvest.osamaqaseem.online',
    'https://juice-company-server.vercel.app',
    'https://juice-company-dashboard.vercel.app',
    'https://natureharvest-admin.vercel.app',
    'https://natureharvest-web.vercel.app'
  ],
  
  // File Upload Configuration
  UPLOAD_PATH: process.env.UPLOAD_PATH || '../uploads',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // Security
  BCRYPT_ROUNDS: 12,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  
  // Error Handling
  SHOW_ERROR_DETAILS: process.env.NODE_ENV === 'development',
  
  // External Services
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  
  // Feature Flags
  ENABLE_GRAPHQL: true,
  ENABLE_REST_API: true,
  ENABLE_SWAGGER: process.env.NODE_ENV === 'development',
  ENABLE_FILE_UPLOAD: true,
  
  // App Configuration
  APP_NAME: 'Nature Harvest Juice Company API',
  APP_VERSION: '1.0.0',
};

// Validation
if (!ENV.MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  if (ENV.IS_PRODUCTION) {
    process.exit(1);
  }
}

if (ENV.IS_PRODUCTION && ENV.JWT_SECRET === 'your-secret-key-change-in-production') {
  console.warn('⚠️ JWT_SECRET should be changed in production');
}

// Export individual values for convenience
module.exports = {
  ...ENV,
  // Convenience exports
  API_BASE_URL: ENV.IS_PRODUCTION ? 'https://juice-company-server.vercel.app' : `http://localhost:${ENV.PORT}`,
  GRAPHQL_URL: ENV.IS_PRODUCTION ? 'https://juice-company-server.vercel.app/graphql' : `http://localhost:${ENV.PORT}/graphql`,
  SWAGGER_URL: ENV.IS_PRODUCTION ? 'https://juice-company-server.vercel.app/api-docs' : `http://localhost:${ENV.PORT}/api-docs`,
}; 