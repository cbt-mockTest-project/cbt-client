import type { AppProps } from 'next/app';
import Globalstyles from '@styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@modules/apollo';
import 'katex/dist/katex.min.css';
import Script from 'next/script';
import { ConfigProvider } from 'antd';
import Head from 'next/head';
import CoreContainer from '@components/common/core/CoreContainer';
import wrapper from '@modules/redux/store/configureStore';
import MainLayout from '@components/common/layout/MainLayout';
import * as gtag from '@lib/ga/gtag';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  EXAMS_PDF_PAGE,
  EXAM_CREATE_PAGE,
  EXAM_PDF_PAGE,
  EXAM_SOLUTION_PAGE,
  NAVER_BLOG_BOT_PAGE,
  PRICING_PAGE,
  QUESTION_EDIT_PAGE,
  QUESTION_PAGE,
  SEARCH_PAGE,
  STUDY_PAGE,
  TODAY_QUIZ_PAGE,
} from '@lib/constants/displayName';
import '@styles/global.css';
import { coreActions } from '@modules/redux/slices/core';
import { ThemeValue } from 'customTypes';
import { Provider } from 'react-redux';
import ThemeProviderWrapper from '@lib/provider/theme/ThemeProviderWrapper';

export const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
  ...customProps
}: AppProps) {
  const cookies = (customProps as any)['cookies'];
  const theme = cookies?.['theme'];
  const { store } = wrapper.useWrappedStore(pageProps);
  if (theme) {
    store.dispatch(coreActions.setTheme(theme as ThemeValue));
  }

  const pagesWithoutLayout: string[] = [
    EXAM_SOLUTION_PAGE,
    EXAM_PDF_PAGE,
    EXAMS_PDF_PAGE,
    STUDY_PAGE,
    EXAM_CREATE_PAGE,
    NAVER_BLOG_BOT_PAGE,
  ];
  const papgesWithoutBodyBorder: string[] = [
    PRICING_PAGE,
    QUESTION_PAGE,
    QUESTION_EDIT_PAGE,
    TODAY_QUIZ_PAGE,
    SEARCH_PAGE,
  ];
  const isOnlyLightModePage = [
    EXAM_CREATE_PAGE,
    QUESTION_EDIT_PAGE,
    EXAM_PDF_PAGE,
    EXAMS_PDF_PAGE,
  ];
  const hasLayout = !pagesWithoutLayout.includes(String(Component.displayName));
  const hasBodyBorder = !papgesWithoutBodyBorder.includes(
    String(Component.displayName)
  );
  const isOnlyLightMode = isOnlyLightModePage.includes(
    String(Component.displayName)
  );
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
      <Provider store={store}>
        <ThemeProviderWrapper isOnlyLightMode={isOnlyLightMode}>
          <ApolloProvider client={apolloClient}>
            <QueryClientProvider client={queryClient}>
              <ConfigProvider>
                <Globalstyles />
                <CoreContainer />
                {hasLayout ? (
                  <MainLayout type={hasBodyBorder ? 'default' : 'clean'}>
                    <Component {...pageProps} />
                  </MainLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </ConfigProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ApolloProvider>
        </ThemeProviderWrapper>
      </Provider>
    </>
  );
}
