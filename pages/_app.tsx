import 'antd/dist/antd.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import Globalstyles from '@styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { APOLLO_STATE_PROP_NAME, useApollo } from '@modules/apollo';
import { Provider } from 'react-redux';
import store from '@modules/redux/store/configureStore';
import CommonModalContainer from '@components/common/core/CommonModalContainer';

export default function App({ Component, pageProps }: AppProps<any>) {
  const client = useApollo({ ...pageProps[APOLLO_STATE_PROP_NAME] }, '');
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Globalstyles />
          <CommonModalContainer />
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </>
  );
}
