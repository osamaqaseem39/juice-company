import { useMutation, useQuery } from '@apollo/client';
import { 
  CREATE_SUBCATEGORY, 
  UPDATE_SUBCATEGORY, 
  DELETE_SUBCATEGORY,
  GET_ALL_SUBCATEGORIES,
  GET_SUBCATEGORY_BY_ID,
  GET_NESTED_SUBCATEGORIES
} from '../services/graphql';

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
  return useQuery(GET_ALL_SUBCATEGORIES, {
    fetchPolicy: 'cache-and-network'
  });
};

// Get single subcategory query
export const useSubcategory = (id: string) => {
  return useQuery(GET_SUBCATEGORY_BY_ID, {
    variables: { id },
    skip: !id
  });
};

// Get nested subcategories by parent category
export const useNestedSubcategories = (parentId: string) => {
  return useQuery(GET_NESTED_SUBCATEGORIES, {
    variables: { parentId },
    skip: !parentId
  });
}; 