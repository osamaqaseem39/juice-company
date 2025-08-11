import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE } from '../services/graphql/mutations';
import { GET_ALL_SERVICES, GET_SERVICE_BY_ID } from '../services/graphql/queries';
import { useAuthGuard } from './useAuthGuard';

// Service mutations
export const useCreateService = () => {
  return useMutation(CREATE_SERVICE, {
    refetchQueries: [{ query: GET_ALL_SERVICES }]
  });
};

export const useUpdateService = () => {
  return useMutation(UPDATE_SERVICE, {
    refetchQueries: [{ query: GET_ALL_SERVICES }]
  });
};

export const useDeleteService = () => {
  return useMutation(DELETE_SERVICE, {
    refetchQueries: [{ query: GET_ALL_SERVICES }]
  });
};

// Service queries
export const useServices = () => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_ALL_SERVICES, {
    skip: skipIfNotAuthenticated
  });
};

export const useService = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_SERVICE_BY_ID, { 
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
}; 