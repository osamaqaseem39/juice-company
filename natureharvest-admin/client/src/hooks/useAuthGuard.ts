import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getStoredToken } from '../utils/authUtils';

export const useAuthGuard = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  
  // Double-check token validity on each call
  const validToken = getStoredToken();
  const isActuallyAuthenticated = isAuthenticated && !!validToken;
  
  return {
    isAuthenticated: isActuallyAuthenticated,
    loading,
    // Helper function to skip queries when not authenticated or still loading
    skipIfNotAuthenticated: !isActuallyAuthenticated || loading
  };
}; 