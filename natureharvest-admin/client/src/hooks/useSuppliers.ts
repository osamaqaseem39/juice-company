import { useQuery } from '@apollo/client';
import { GET_ALL_SUPPLIERS, GET_SUPPLIER_BY_ID } from '../services/graphql/queries';
import { useAuthGuard } from './useAuthGuard';

export const useSuppliers = () => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  const { data, loading, error, refetch } = useQuery(GET_ALL_SUPPLIERS, {
    skip: skipIfNotAuthenticated
  });
  
  return {
    data: data?.suppliers || [],
    loading,
    error,
    refetch
  };
};

export const useSupplier = (id: string) => {
  const { skipIfNotAuthenticated } = useAuthGuard();
  const { data, loading, error, refetch } = useQuery(GET_SUPPLIER_BY_ID, {
    variables: { id },
    skip: !id || skipIfNotAuthenticated
  });
  
  return {
    data: data?.supplier || null,
    loading,
    error,
    refetch
  };
};

export const useCreateSupplier = () => {
  // TODO: Implement when CREATE_SUPPLIER mutation is available
  return [() => Promise.resolve(), { loading: false, error: null }];
};

export const useUpdateSupplier = () => {
  // TODO: Implement when UPDATE_SUPPLIER mutation is available
  return [() => Promise.resolve(), { loading: false, error: null }];
};

export const useDeleteSupplier = () => {
  // TODO: Implement when DELETE_SUPPLIER mutation is available
  return [() => Promise.resolve(), { loading: false, error: null }];
}; 