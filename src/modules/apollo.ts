import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { fetchClientIp } from '@lib/apis/fetch-client-ip';
import { PUSH_TO_TELEGRAM } from '@lib/graphql/query/telegramQuery';
import { isServer, pushErrorLogToSentry } from '@lib/utils/utils';
import React from 'react';

let _apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const apolloClient = initializeApollo({}, '');
  const sendErrorToTelegram = (message: string) =>
    apolloClient.mutate({
      mutation: PUSH_TO_TELEGRAM,
      variables: {
        input: {
          message,
        },
      },
    });
  const { userAgent, ip, currentPagePath } = operation.getContext().headers;
  if (graphQLErrors)
    graphQLErrors.forEach((data) => {
      const message = `[GraphQL Error]\nMessage: ${
        data.message
      }\nLocation: ${JSON.stringify(data.locations, null, 2)}\nPath: ${
        data.path
      }\nUserAgent: ${userAgent}\nIP: ${ip}\nCurrentPagePath: ${currentPagePath}`;
      sendErrorToTelegram(message);
      pushErrorLogToSentry({ message, level: 'error' });
    });

  if (networkError) {
    const message = `[Network Error]: ${networkError}`;
    sendErrorToTelegram(message);
    pushErrorLogToSentry({ message, level: 'error' });
  }
});

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

const createApolloClient = (Cookie: string) => {
  const authLink = setContext(async (_, { headers }) => {
    const clientIp = !isServer() ? await fetchClientIp() : 'server';
    const currentPagePath = !isServer() ? window.location : 'server';
    return {
      ...headers,
      headers: {
        Cookie,
        userAgent:
          typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        ip: clientIp,
        currentPagePath,
      },
    };
  });
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
          from([errorLink, authLink, httpLink]) // 에러 핸들링 로직 추가
        )
      : from([errorLink, authLink, httpLink]); // 에러 핸들링 로직 추가
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
