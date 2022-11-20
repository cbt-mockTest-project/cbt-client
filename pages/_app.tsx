import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import Globalstyles from '@styles/globalStyles';
import Layout from '@components/common/layout/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@modules/apollo';
import CoreContainer from '@components/common/core/CoreContainer';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <>
      <ApolloProvider client={client}>
        <CoreContainer />
        <Globalstyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
