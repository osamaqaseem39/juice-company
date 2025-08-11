import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BRAND, UPDATE_BRAND, DELETE_BRAND } from '../services/graphql/mutations';
import { GET_ALL_BRANDS, GET_BRAND_BY_ID } from '../services/graphql/queries';

// Brand mutations
export const useCreateBrand = () => {
  return useMutation(CREATE_BRAND, {
    refetchQueries: [{ query: GET_ALL_BRANDS }]
  });
};

export const useUpdateBrand = () => {
  return useMutation(UPDATE_BRAND, {
    refetchQueries: [{ query: GET_ALL_BRANDS }]
  });
};

export const useDeleteBrand = () => {
  return useMutation(DELETE_BRAND, {
    refetchQueries: [{ query: GET_ALL_BRANDS }]
  });
};

// Brand queries
export const useBrands = () => {
  return useQuery(GET_ALL_BRANDS);
};

export const useBrand = (id: string) => {
  return useQuery(GET_BRAND_BY_ID, { 
    variables: { id },
    skip: !id 
  });
}; 