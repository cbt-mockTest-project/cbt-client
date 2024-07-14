import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { PUSH_TO_TELEGRAM } from '@lib/graphql/query/telegramQuery';
import { isServer } from '@lib/utils/utils';

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
  if (userAgent.includes('Googlebot')) return;
  if (graphQLErrors)
    graphQLErrors.forEach((data) => {
      const message = `[GraphQL Error]\nMessage: ${
        data.message
      }\nLocation: ${JSON.stringify(data.locations, null, 2)}\nPath: ${
        data.path
      }\nUserAgent: ${userAgent}\nIP: ${ip}\nCurrentPagePath: ${currentPagePath}`;
      sendErrorToTelegram(message);
    });

  if (networkError) {
    const message = `
    UserAgent: ${userAgent}\nIP: ${ip}\nCurrentPagePath: ${currentPagePath}\n
    [Network Error]: ${networkError}`;
    sendErrorToTelegram(message);
  }
});

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const createApolloClient = (Cookie: string) => {
  const authLink = setContext(async (_, { headers }) => {
    const currentPagePath = !isServer() ? window.location : 'server';
    return {
      headers: {
        ...headers,
        Cookie,
        userAgent:
          typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        currentPagePath,
      },
    };
  });
  const splitLink = from([errorLink, authLink, httpLink]);
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
  if (isServer()) {
    return client;
  }
  if (!_apolloClient) {
    _apolloClient = client;
  }
  return _apolloClient;
};

export const apolloClient = initializeApollo({}, '');
