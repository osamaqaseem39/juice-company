import { ENV } from '../config/env';

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    // Check if token is a valid JWT format (has 3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Decode the payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token is expired
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

export const getStoredToken = (): string | null => {
  try {
    const token = localStorage.getItem(ENV.AUTH_TOKEN_KEY);
    return isTokenValid(token) ? token : null;
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