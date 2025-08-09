import { useMutation, useQuery } from '@apollo/client';
import { CREATE_FLAVOR, UPDATE_FLAVOR, DELETE_FLAVOR } from '../services/graphql/mutations';
import { GET_ALL_FLAVORS, GET_FLAVOR_BY_ID } from '../services/graphql/queries';

// Flavor mutations
export const useCreateFlavor = () => {
  return useMutation(CREATE_FLAVOR, {
    refetchQueries: [{ query: GET_ALL_FLAVORS }]
  });
};

export const useUpdateFlavor = () => {
  return useMutation(UPDATE_FLAVOR, {
    refetchQueries: [{ query: GET_ALL_FLAVORS }]
  });
};

export const useDeleteFlavor = () => {
  return useMutation(DELETE_FLAVOR, {
    refetchQueries: [{ query: GET_ALL_FLAVORS }]
  });
};

// Flavor queries
export const useFlavors = () => {
  return useQuery(GET_ALL_FLAVORS);
};

export const useFlavor = (id: string) => {
  return useQuery(GET_FLAVOR_BY_ID, { 
    variables: { id },
    skip: !id 
  });
}; 