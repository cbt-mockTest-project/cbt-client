import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
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
import { LocalStorage } from '@lib/utils/localStorage';
import { homeRouteStackKey } from '@lib/constants';
import { checkHomePage } from '@lib/constants/routes';
import { isServer, someIncludes } from '@lib/utils/utils';
import CalculatorComponent from '@components/calculator/CalculatorComponent';
import CoreContainer from '@components/common/core/CoreContainer';
import wrapper from '@modules/redux/store/configureStore';

const App = ({ Component, pageProps }: AppProps<any>) => {
  const client = useApollo({ ...pageProps[APOLLO_STATE_PROP_NAME] }, '');
  const localStorage = new LocalStorage();
  const router = useRouter();
  useEffect(() => {
    const excludePath = ['/exam/randomselect', '/exam/solution'];
    if (!someIncludes(excludePath, router.asPath)) {
      var ads = document.getElementsByClassName('adsbygoogle').length;
      for (var i = 0; i < ads; i++) {
        try {
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({});
        } catch (e) {}
      }
    }
  }, [router.asPath]);

  // 모바일 앱에서, target="_blank"인 링크를 클릭하면 웹뷰에서 열리도록 합니다.
  useEffect(() => {
    const excludePath = ['/pricing'];
    if (
      isServer() ||
      window.innerWidth > 720 ||
      excludePath.some((path) => router.asPath.startsWith(path))
    ) {
      return;
    }
    const handleClick = (event: any) => {
      let el = event.target;
      // 이벤트가 발생한 요소가 <a>가 아닌 경우 가장 가까운 <a>를 찾습니다.
      while (el && el.tagName !== 'A') {
        el = el.parentElement;
      }
      // <a> 요소를 찾지 못한 경우는 무시합니다.
      if (!el) return;
      if (el.tagName === 'A' && el.getAttribute('target') === '_blank') {
        event.preventDefault();
        router.push(el.getAttribute('href'));
      }
    };
    window.addEventListener('click', handleClick);

    // Clean up
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [router]);

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

  async function subscribeUser() {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
          console.log('Already subscribed', subscription);
        } else {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            })
            .then((subscription) => {
              console.log('Subscribed', subscription);
              // save subscription on DB
              // fetch('/api/subscribe', {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify(subscription),
              // });
            });
        }
      });
    });
  }

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          subscribeUser();
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TXJD2HF');
          `,
        }}
      />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TXJD2HF"
          height="0"
          width="0"
          style={{
            display: 'none',
            visibility: 'hidden',
          }}
        ></iframe>
      </noscript>
      <Script
        async
        src="https://fundingchoicesmessages.google.com/i/pub-9145855450425143?ers=1"
        nonce="Y9YkCp5YFgpFn5oOP3h7zQ"
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
        <Globalstyles />
        <CoreContainer />
        <AppInner />
        <Component {...pageProps} />
        <CalculatorComponent />
      </ApolloProvider>
    </>
  );
};

export default wrapper.withRedux(App);
