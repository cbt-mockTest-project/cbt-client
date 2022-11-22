import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import React from 'react';

let _apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export const createApolloClient = (token: string) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = {}, token: string) => {
  const client = _apolloClient ?? createApolloClient(token);

  if (initialState) {
    const existCache = client.extract();
    client.cache.restore({ ...existCache, ...initialState });
  }

  // for server side rendering(or generation) always create a new apollo client
  if (typeof window === 'undefined') {
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
