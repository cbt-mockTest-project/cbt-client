import type { AppProps } from 'next/app';
import Globalstyles from '@styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { APOLLO_STATE_PROP_NAME, useApollo } from '@modules/apollo';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import Script from 'next/script';
import { useEffect } from 'react';
import * as gtag from '@lib/ga/gtag';
import { useRouter } from 'next/router';
import { ConfigProvider, Modal, message } from 'antd';
import Head from 'next/head';
import AppInner from '@components/common/container/AppInner';
import { LocalStorage } from '@lib/utils/localStorage';
import { homeRouteStackKey } from '@lib/constants';
import { checkHomePage } from '@lib/constants/routes';
import { isServer, someIncludes } from '@lib/utils/utils';
import CoreContainer from '@components/common/core/CoreContainer';
import wrapper from '@modules/redux/store/configureStore';
import MainLayout from '@components/common/layout/MainLayout';
import {
  EXAM_CREATE_PAGE,
  EXAM_SOLUTION_PAGE,
  PRICING_PAGE,
  QUESTION_EDIT_PAGE,
  QUESTION_PAGE,
  STUDY_PAGE,
} from '@lib/constants/displayName';
import { setCookie } from 'cookies-next';
import { SessionStorage } from '@lib/utils/sessionStorage';
import { IS_FIRST_VISIT } from '@lib/constants/sessionStorage';
import { LAST_VISITED_CATEGORY } from '@lib/constants/localStorage';

const App = ({ Component, pageProps }: AppProps<any>) => {
  const router = useRouter();
  const sessionStorage = new SessionStorage();
  const localStorage = new LocalStorage();
  const pagesWithoutLayout: string[] = [
    EXAM_SOLUTION_PAGE,
    STUDY_PAGE,
    EXAM_CREATE_PAGE,
  ];
  const papgesWithoutBodyBorder: string[] = [
    PRICING_PAGE,
    QUESTION_PAGE,
    QUESTION_EDIT_PAGE,
  ];
  const hasLayout = !pagesWithoutLayout.includes(String(Component.displayName));
  const hasBodyBorder = !papgesWithoutBodyBorder.includes(
    String(Component.displayName)
  );
  const client = useApollo({ ...pageProps[APOLLO_STATE_PROP_NAME] }, '');
  // useEffect(() => {
  //   const isFirstVisit = sessionStorage.get(IS_FIRST_VISIT);
  //   if (isFirstVisit) return;
  //   sessionStorage.set(IS_FIRST_VISIT, 'ok');
  //   const isLastVisitCategory = localStorage.get(LAST_VISITED_CATEGORY);
  //   if (LAST_VISITED_CATEGORY) {
  //     Modal.confirm({
  //       title: '이전에 학습하던 암기장으로 이동하시겠습니까?',
  //       okText: '이동하기',
  //       cancelText: '취소',
  //       onOk: () => {
  //         router.push(isLastVisitCategory);
  //       },
  //       onCancel: () => {
  //         localStorage.remove(LAST_VISITED_CATEGORY);
  //       },
  //     });
  //   }
  // }, []);
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

    // 로그인 후 리다이렉트
    if (router.asPath === '/auth' || !router.asPath) return;
    setCookie('auth_redirect', router.asPath, {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      path: '/',
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });
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

  useEffect(() => {
    window.katex = katex;
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
        <ConfigProvider>
          <Globalstyles />
          <CoreContainer />
          <AppInner />
          {hasLayout ? (
            <MainLayout type={hasBodyBorder ? 'default' : 'clean'}>
              <Component {...pageProps} />
            </MainLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ConfigProvider>
      </ApolloProvider>
    </>
  );
};

export default wrapper.withRedux(App);
