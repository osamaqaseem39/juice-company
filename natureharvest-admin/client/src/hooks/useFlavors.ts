import { useMutation, useQuery } from '@apollo/client';
import { CREATE_FLAVOR, UPDATE_FLAVOR, DELETE_FLAVOR } from '../services/graphql/mutations';
import { GET_ALL_FLAVORS, GET_FLAVOR_BY_ID } from '../services/graphql/queries';
import { useAuthGuard } from './useAuthGuard';

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
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_ALL_FLAVORS, {
    skip: skipIfNotAuthenticated
  });
};

export const useFlavor = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  return useQuery(GET_FLAVOR_BY_ID, { 
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
}; 