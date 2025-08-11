// Environment configuration
export const ENV = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3002',
  GRAPHQL_URL: `${process.env.REACT_APP_API_URL || 'http://localhost:3002'}/graphql`,
  
  // Upload Configuration - Different for local vs production
  UPLOAD_URL: process.env.REACT_APP_UPLOAD_URL || (
    process.env.NODE_ENV === 'production' 
      ? 'https://natureharvest.osamaqaseem.online/upload.php'
      : `${process.env.REACT_APP_API_URL || 'http://localhost:3002'}/api/upload`
  ),
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  
  // App Configuration
  APP_NAME: 'Nature Harvest Admin',
  APP_VERSION: '2.0.0',
  
  // Feature Flags
  ENABLE_GRAPHQL: true,
  ENABLE_REST_API: true,
  ENABLE_SWAGGER: process.env.NODE_ENV === 'development',
  
  // Authentication
  AUTH_TOKEN_KEY: 'auth_token',
  AUTH_USER_KEY: 'auth_user',
  
  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  
  // Error Handling
  SHOW_ERROR_DETAILS: process.env.NODE_ENV === 'development',
  
  // Logging
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'info',
  
  // External Services
  GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GA_ID,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
} as const;

// Validation
if (ENV.IS_PRODUCTION && !process.env.REACT_APP_API_URL) {
  console.warn('⚠️ REACT_APP_API_URL is not set in production. Using default localhost URL.');
}

// Export individual values for convenience
export const API_BASE_URL = ENV.API_BASE_URL;
export const GRAPHQL_URL = ENV.GRAPHQL_URL;
export const UPLOAD_URL = ENV.UPLOAD_URL;
export const IS_PRODUCTION = ENV.IS_PRODUCTION;
export const IS_DEVELOPMENT = ENV.IS_DEVELOPMENT;

export default ENV; 