import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_URL, ENV } from '../config/env';
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      // If it's an authentication error, redirect to login
      if (message.includes('Authentication required') || message.includes('An error occurred while processing your request')) {
        // Clear any stored auth token
        clearStoredToken();
        // Redirect to login page
        window.location.href = '/signin';
      }
    });
  }
  if (networkError) {
    console.error('Network error:', networkError);
    // Handle 400 errors as authentication issues
    if ('statusCode' in networkError && networkError.statusCode === 400) {
      clearStoredToken();
      window.location.href = '/signin';
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