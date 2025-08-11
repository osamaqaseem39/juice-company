import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../services/graphql/mutations';
import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_ID } from '../services/graphql/queries';
import { useAuthGuard } from './useAuthGuard';

// Category mutations
export const useCreateCategory = () => {
  return useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES }]
  });
};

export const useUpdateCategory = () => {
  return useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES }]
  });
};

export const useDeleteCategory = () => {
  return useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES }]
  });
};

// Category queries
export const useCategories = () => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_ALL_CATEGORIES, {
    skip: skipIfNotAuthenticated
  });
};

export const useCategory = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_CATEGORY_BY_ID, { 
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
}; 