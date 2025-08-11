import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_URL } from '../config/env';
import { getStoredToken, clearStoredToken } from '../utils/authUtils';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getStoredToken();
  return {
    headers: {
      ...headers,
      'x-auth-token': token ? token : '',
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  console.log('GraphQL error link triggered:', { 
    hasGraphQLErrors: !!graphQLErrors?.length, 
    hasNetworkError: !!networkError,
    operation: operation?.operationName 
  });
  
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Only redirect on specific authentication errors, not all errors
      if (message.includes('Authentication required') || 
          message.includes('Unauthorized') ||
          message.includes('Token expired') ||
          message.includes('Invalid token')) {
        console.log('Authentication error detected, redirecting to login');
        clearStoredToken();
        // Only redirect if not already on login page
        if (window.location.pathname !== '/signin') {
          window.location.href = '/signin';
        }
      }
    });
  }
  
  if (networkError) {
    console.error('Network error:', networkError);
    
    // Only handle 401 (Unauthorized) errors as authentication issues
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      console.log('401 Unauthorized error detected, redirecting to login');
      clearStoredToken();
      // Only redirect if not already on login page
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
}); 