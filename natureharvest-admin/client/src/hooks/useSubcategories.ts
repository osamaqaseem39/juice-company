import { useMutation, useQuery } from '@apollo/client';
import { 
  CREATE_SUBCATEGORY, 
  UPDATE_SUBCATEGORY, 
  DELETE_SUBCATEGORY,
  GET_ALL_SUBCATEGORIES,
  GET_SUBCATEGORY_BY_ID,
  GET_SUBCATEGORIES_BY_CATEGORY
} from '../services/graphql';
import { useAuthGuard } from './useAuthGuard';

// Create subcategory mutation
export const useCreateSubcategory = () => {
  return useMutation(CREATE_SUBCATEGORY, {
    refetchQueries: [{ query: GET_ALL_SUBCATEGORIES }]
  });
};

// Update subcategory mutation
export const useUpdateSubcategory = () => {
  return useMutation(UPDATE_SUBCATEGORY, {
    refetchQueries: [{ query: GET_ALL_SUBCATEGORIES }]
  });
};

// Delete subcategory mutation
export const useDeleteSubcategory = () => {
  return useMutation(DELETE_SUBCATEGORY, {
    refetchQueries: [{ query: GET_ALL_SUBCATEGORIES }]
  });
};

// Get all subcategories query
export const useSubcategories = (categoryId?: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_ALL_SUBCATEGORIES, {
    fetchPolicy: 'cache-and-network',
    skip: skipIfNotAuthenticated
  });
};

// Get single subcategory query
export const useSubcategory = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_SUBCATEGORY_BY_ID, {
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
};

// Get subcategories by category
export const useSubcategoriesByCategory = (categoryId: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_SUBCATEGORIES_BY_CATEGORY, {
    variables: { categoryId },
    skip: !categoryId || skipIfNotAuthenticated
  });
}; 