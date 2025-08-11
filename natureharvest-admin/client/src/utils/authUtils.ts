import { ENV } from '../config/env';

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    console.log('Token validation: No token provided');
    return false;
  }
  
  try {
    // Check if token is a valid JWT format (has 3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('Token validation: Invalid JWT format (not 3 parts)');
      return false;
    }
    
    // Decode the payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token is expired
    if (payload.exp && payload.exp < currentTime) {
      console.log('Token validation: Token expired', { 
        tokenExp: payload.exp, 
        currentTime,
        timeUntilExpiry: payload.exp - currentTime 
      });
      return false;
    }
    
    console.log('Token validation: Token is valid', { 
      tokenExp: payload.exp, 
      currentTime,
      timeUntilExpiry: payload.exp ? payload.exp - currentTime : 'no expiry' 
    });
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

export const getStoredToken = (): string | null => {
  try {
    const token = localStorage.getItem(ENV.AUTH_TOKEN_KEY);
    console.log('Getting stored token:', { 
      tokenKey: ENV.AUTH_TOKEN_KEY, 
      hasToken: !!token,
      tokenLength: token?.length 
    });
    
    const isValid = isTokenValid(token);
    console.log('Token validation result:', { isValid });
    
    return isValid ? token : null;
  } catch (error) {
    console.error('Error getting stored token:', error);
    return null;
  }
};

export const clearStoredToken = (): void => {
  try {
    localStorage.removeItem(ENV.AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing stored token:', error);
  }
}; 