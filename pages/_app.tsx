import type { AppProps } from 'next/app';
import Globalstyles from '@styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@modules/apollo';
import 'katex/dist/katex.min.css';
import Script from 'next/script';
import Head from 'next/head';
import CoreContainer from '@components/common/core/CoreContainer';
import * as gtag from '@lib/ga/gtag';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@styles/global.css';
import { Provider } from 'react-redux';
import ThemeProviderWrapper from '@lib/provider/theme/ThemeProviderWrapper';
import wrapper from '@modules/redux/store/configureStore';
import BasicTemplate from '@components/common/layout/BasicTemplate';
import { GoogleAnalytics } from '@next/third-parties/google';

export const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Script
        id="clarify-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "mnhew0syru");
        `,
        }}
      />
      <GoogleAnalytics gaId={gtag.GA_TRACKING_ID} />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <CoreContainer />
            <ThemeProviderWrapper displayName={Component.displayName}>
              <Globalstyles />
              <BasicTemplate displayName={Component.displayName}>
                <Component {...pageProps} />
              </BasicTemplate>
            </ThemeProviderWrapper>
          </ApolloProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
