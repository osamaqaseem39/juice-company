import { useMutation, useQuery } from '@apollo/client';
import { 
  CREATE_QUOTE, 
  UPDATE_QUOTE, 
  DELETE_QUOTE,
  GET_ALL_QUOTES,
  GET_QUOTE_BY_ID
} from '../services/graphql';

// Create quote mutation
export const useCreateQuote = () => {
  return useMutation(CREATE_QUOTE, {
    refetchQueries: [{ query: GET_ALL_QUOTES }]
  });
};

// Update quote mutation
export const useUpdateQuote = () => {
  return useMutation(UPDATE_QUOTE, {
    refetchQueries: [{ query: GET_ALL_QUOTES }]
  });
};

// Delete quote mutation
export const useDeleteQuote = () => {
  return useMutation(DELETE_QUOTE, {
    refetchQueries: [{ query: GET_ALL_QUOTES }]
  });
};

// Get all quotes query
export const useQuotes = () => {
  return useQuery(GET_ALL_QUOTES, {
    fetchPolicy: 'cache-and-network'
  });
};

// Get single quote query
export const useQuote = (id: string) => {
  return useQuery(GET_QUOTE_BY_ID, {
    variables: { id },
    skip: !id
  });
}; 