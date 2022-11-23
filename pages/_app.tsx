import 'antd/dist/antd.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import Globalstyles from '@styles/globalStyles';
import Layout from '@components/common/layout/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@modules/apollo';
import CoreContainer from '@components/common/core/CoreContainer';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo({}, '');
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
