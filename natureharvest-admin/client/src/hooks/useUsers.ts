import { useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_USER_BY_ID } from '../services/graphql/queries';

export const useUsers = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  
  return {
    data: data?.users || [],
    loading,
    error,
    refetch
  };
};

export const useUser = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id
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