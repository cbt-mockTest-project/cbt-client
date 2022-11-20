import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import Globalstyles from '@styles/globalStyles';
import Layout from '@components/common/layout/Layout';
import { ApolloProvider } from '@apollo/client';
import { client } from '@modules/apollo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Globalstyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
