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
import Script from 'next/script';
import { useEffect } from 'react';
import * as gtag from '@lib/ga/gtag';
import { useRouter } from 'next/router';
import { message } from 'antd';
import Head from 'next/head';
import AppInner from '@components/common/container/AppInner';
import CoreContainer from '@components/common/core/CoreContainer';
import { LocalStorage } from '@lib/utils/localStorage';
import { homeRouteStackKey } from '@lib/constants';
import { checkHomePage } from '@lib/constants/routes';

export default function App({ Component, pageProps }: AppProps<any>) {
  const client = useApollo({ ...pageProps[APOLLO_STATE_PROP_NAME] }, '');
  const localStorage = new LocalStorage();
  const router = useRouter();

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (e) {}
    }
  }, [router.asPath]);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    const routeChangeStart = () => {
      const isHome = checkHomePage(router.asPath);
      if (isHome) {
        const homeRouteStack = localStorage.get(homeRouteStackKey);
        if (homeRouteStack) {
          if (homeRouteStack.length > 10) {
            homeRouteStack.shift();
          }
          homeRouteStack.push({ path: router.asPath, scrollY: window.scrollY });
          localStorage.set(homeRouteStackKey, homeRouteStack);
          return;
        }
        localStorage.set(homeRouteStackKey, [
          { path: router.asPath, scrollY: window.scrollY },
        ]);
      }
    };
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath]);
  useEffect(() => {
    // 탈퇴유저에 대한 리다이렉트 메시지
    if (router.query.message) {
      message.error(router.query.message);
    }
  }, [router.query.message]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Globalstyles />
          <CoreContainer />
          <AppInner />
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </>
  );
}
