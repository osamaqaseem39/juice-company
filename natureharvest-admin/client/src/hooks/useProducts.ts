import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../services/graphql/mutations';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../services/graphql/queries';
import { useAuthGuard } from './useAuthGuard';

// Product mutations
export const useCreateProduct = () => {
  return useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }]
  });
};

export const useUpdateProduct = () => {
  return useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }]
  });
};

export const useDeleteProduct = () => {
  return useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }]
  });
};

// Product queries
export const useProducts = () => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_ALL_PRODUCTS, {
    skip: skipIfNotAuthenticated
  });
};

export const useProduct = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_PRODUCT_BY_ID, { 
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
}; 