import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { getToken } from 'src/modules/auth/adapters/out/storage';

const restUrl = process.env.EXPO_PUBLIC_GRAPHQL_REST_URL as string;
const wsUrl = process.env.EXPO_PUBLIC_GRAPHQL_WS_URL as string;

const httpLink = new HttpLink({
  uri: restUrl,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
    connectionParams: async () => {
      return {
        authorization: await getToken(),
      };
    },
  }),
);

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log('-------graphQLErrors', JSON.stringify(graphQLErrors, null, 4));
  console.log('-------networkError', networkError);
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),//.concat(errorLink),
  link: ApolloLink.from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache(),
});
