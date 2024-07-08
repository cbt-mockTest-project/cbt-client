import type { AppProps } from 'next/app';
import Globalstyles from '../app/_styles/globalStyles';
import { ApolloProvider } from '@apollo/client';
import 'katex/dist/katex.min.css';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ConfigProvider, App as AntApp } from 'antd';
import Head from 'next/head';
import AppInner from '../app/_components/common/container/AppInner';
import { LocalStorage } from '../app/_lib/utils/localStorage';
import CoreContainer from '../app/_components/common/core/CoreContainer';
import MainLayout from '../app/_components/common/layout/MainLayout';
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
} from '../app/_lib/constants/displayName';
import { coreActions } from '../app/_modules/redux/slices/core';
import { ThemeValue } from '../app/customTypes';
import ThemeProviderWrapper from '../app/_lib/provider/theme/ThemeProviderWrapper';
import { wrapper } from '@modules/redux/store/configureStore';

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
      <ThemeProviderWrapper isOnlyLightMode={isOnlyLightMode}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider>
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
        </QueryClientProvider>
      </ThemeProviderWrapper>
    </>
  );
}
