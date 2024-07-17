import type { AppProps } from 'next/app';
import Globalstyles from '@styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@modules/apollo';
import 'katex/dist/katex.min.css';
import Script from 'next/script';
import Head from 'next/head';
import CoreContainer from '@components/common/core/CoreContainer';
import wrapper, { store } from '@modules/redux/store/configureStore';
import MainLayout from '@components/common/layout/MainLayout';
import * as gtag from '@lib/ga/gtag';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import { Provider } from 'react-redux';
import ThemeProviderWrapper from '@lib/provider/theme/ThemeProviderWrapper';
import { useMemo } from 'react';

export const queryClient = new QueryClient();

const pagesWithoutLayout: string[] = [
  EXAM_SOLUTION_PAGE,
  EXAM_PDF_PAGE,
  EXAMS_PDF_PAGE,
  STUDY_PAGE,
  EXAM_CREATE_PAGE,
  NAVER_BLOG_BOT_PAGE,
];
const pagesWithoutBodyBorder: string[] = [
  PRICING_PAGE,
  QUESTION_PAGE,
  QUESTION_EDIT_PAGE,
  TODAY_QUIZ_PAGE,
  SEARCH_PAGE,
];
const isOnlyLightModePage = [
  EXAM_SOLUTION_PAGE,
  EXAM_CREATE_PAGE,
  QUESTION_EDIT_PAGE,
  EXAM_PDF_PAGE,
  EXAMS_PDF_PAGE,
];
function App({ Component, pageProps, ...customProps }: AppProps) {
  const { hasLayout, hasBodyBorder, isOnlyLightMode } = useMemo(
    () => ({
      hasLayout: !pagesWithoutLayout.includes(String(Component.displayName)),
      hasBodyBorder: !pagesWithoutBodyBorder.includes(
        String(Component.displayName)
      ),
      isOnlyLightMode: isOnlyLightModePage.includes(
        String(Component.displayName)
      ),
    }),
    [Component.displayName]
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
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <ThemeProviderWrapper isOnlyLightMode={isOnlyLightMode}>
              <Globalstyles />
              <CoreContainer />
              {hasLayout ? (
                <MainLayout type={hasBodyBorder ? 'default' : 'clean'}>
                  <Component {...pageProps} />
                </MainLayout>
              ) : (
                <Component {...pageProps} />
              )}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ThemeProviderWrapper>
          </ApolloProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);
