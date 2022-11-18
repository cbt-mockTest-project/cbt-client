import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'cookies-next';

const jwtToken = getCookie('jwt-token');
export const authTokenVar = makeVar(jwtToken);
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const authLink = setContext((request, previousContext) => ({
  headers: { 'jwt-token': authTokenVar() || '' },
}));

export const client = new ApolloClient({
  ssrMode: true,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'ignore',
    },
  },
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});
