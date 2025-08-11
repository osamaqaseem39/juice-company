import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SIZE, UPDATE_SIZE, DELETE_SIZE } from '../services/graphql/mutations';
import { GET_ALL_SIZES, GET_SIZE_BY_ID } from '../services/graphql/queries';
import { useAuthGuard } from './useAuthGuard';

// Size mutations
export const useCreateSize = () => {
  return useMutation(CREATE_SIZE, {
    refetchQueries: [{ query: GET_ALL_SIZES }]
  });
};

export const useUpdateSize = () => {
  return useMutation(UPDATE_SIZE, {
    refetchQueries: [{ query: GET_ALL_SIZES }]
  });
};

export const useDeleteSize = () => {
  return useMutation(DELETE_SIZE, {
    refetchQueries: [{ query: GET_ALL_SIZES }]
  });
};

// Size queries
export const useSizes = (variables?: {
  search?: string;
  status?: string;
  isAvailable?: boolean;
  sort?: string;
  limit?: number;
  offset?: number;
}) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_ALL_SIZES, {
    variables,
    skip: skipIfNotAuthenticated
  });
};

export const useSize = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_SIZE_BY_ID, { 
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
}; 