import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useAuthGuard = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  return {
    isAuthenticated,
    // Helper function to skip queries when not authenticated
    skipIfNotAuthenticated: !isAuthenticated
  };
}; 