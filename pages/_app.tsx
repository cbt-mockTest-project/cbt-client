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

  // useEffect(() => {
  //   (window as any).ChannelIO('boot', {
  //     pluginKey: process.env.NEXT_PUBLIC_CHANNER_TALK_KEY,
  //     hideChannelButtonOnBoot: router.asPath === '/' ? false : true, // 메인 페이지에서만 노출
  //     customLauncherSelector: '.channel-talk-custom, #channel-talk-custom',
  //   });
  // }, [router.asPath]);

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
      {/* <Script
        id="channer-talk-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.")}var ch=function(){ch.c(arguments)};ch.q=[];ch.c=function(args){ch.q.push(args)};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x)}}if(document.readyState==="complete"){l()}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l)}})();
          `,
        }}
      /> */}
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
