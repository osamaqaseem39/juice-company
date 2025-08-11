import { useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_USER_BY_ID } from '../services/graphql/queries';
import { useAuthGuard } from './useAuthGuard';

export const useUsers = () => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, {
    skip: skipIfNotAuthenticated
  });
  
  return {
    data: data?.users || [],
    loading,
    error,
    refetch
  };
};

export const useUser = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
  
  return {
    data: data?.user || null,
    loading,
    error,
    refetch
  };
};

export const useRemoveUser = () => {
  // TODO: Implement when DELETE_USER mutation is available
  const deleteUser = async ({ variables }: { variables: { id: string } }) => {
    return Promise.resolve();
  };
  return deleteUser;
}; 