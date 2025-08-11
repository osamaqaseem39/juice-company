import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_URL, ENV } from '../config/env';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ENV.AUTH_TOKEN_KEY);
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
      if (message.includes('Authentication required')) {
        // Clear any stored auth token
        localStorage.removeItem('auth_token');
        // Redirect to login page
        window.location.href = '/signin';
      }
    });
  }
  if (networkError) {
    console.error('Network error:', networkError);
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