import { isServer } from '@lib/utils/utils';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { getMainDefinition } from '@apollo/client/utilities';

let _apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const wsLink = !isServer()
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: `${process.env.NEXT_PUBLIC_API_SOCKET_URL}`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export const createApolloClient = (Cookie: string) => {
  const authLink = setContext(() => ({
    headers: { Cookie },
  }));
  const splitLink =
    !isServer() && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          authLink.concat(httpLink)
        )
      : authLink.concat(httpLink);
  return new ApolloClient({
    ssrMode: isServer(),
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = {}, Cookie: string) => {
  const client = _apolloClient ?? createApolloClient(Cookie);

  if (initialState) {
    const existCache = client.extract();
    client.cache.restore({ ...existCache, ...initialState });
  }

  // for server side rendering(or generation) always create a new apollo client
  if (isServer()) {
    return client;
  }

  // create apollo client only once.
  if (!_apolloClient) {
    _apolloClient = client;
  }

  return _apolloClient;
};

export const useApollo = (
  initialState: NormalizedCacheObject,
  token: string
) => {
  const store = React.useMemo(
    () => initializeApollo(initialState, token),
    [initialState, token]
  );
  return store;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};
