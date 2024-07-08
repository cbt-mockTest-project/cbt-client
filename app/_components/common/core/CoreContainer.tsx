'use client';

import { homeRouteStackKey, loginModal } from '../../../_lib/constants';
import { coreActions } from '../../../_modules/redux/slices/core';
import * as gtag from '../../../_lib/ga/gtag';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../_modules/redux/store/configureStore';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AuthModal from '../../auth/AuthModal';
import { useRouter, useSearchParams } from 'next/navigation';
import katex from 'katex';
import { message } from 'antd';
import { checkHomePage } from '@lib/constants/routes';
import useAsPath from '@lib/hooks/useAsPath';
import { someIncludes } from '@lib/utils/utils';
import { setCookie } from 'cookies-next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface CoreContainerProps {}

const CoreContainer: React.FC<CoreContainerProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { asPath } = useAsPath();
  const searchParmas = useSearchParams();
  const messageQuery = searchParmas?.get('message');
  const { modalName } = useAppSelector((state) => state.core);
  const onCloseModal = () => {
    dispatch(coreActions.closeModal());
  };

  useEffect(() => {
    window.katex = katex;
  }, []);

  useEffect(() => {
    if (messageQuery) {
      message.error(messageQuery);
    }
  }, [messageQuery]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    const routeChangeStart = () => {
      const isHome = checkHomePage(asPath);
      if (isHome) {
        const homeRouteStack = localStorage.get(homeRouteStackKey);
        if (homeRouteStack) {
          if (homeRouteStack.length > 10) {
            homeRouteStack.shift();
          }
          homeRouteStack.push({ path: asPath, scrollY: window.scrollY });
          localStorage.set(homeRouteStackKey, homeRouteStack);
          return;
        }
        localStorage.set(homeRouteStackKey, [
          { path: asPath, scrollY: window.scrollY },
        ]);
      }
    };
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, asPath]);

  useEffect(() => {
    const excludePath = ['/exam/randomselect', '/exam/solution'];
    if (!someIncludes(excludePath, asPath)) {
      var ads = document.getElementsByClassName('adsbygoogle').length;
      for (var i = 0; i < ads; i++) {
        try {
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({});
        } catch (e) {}
      }
    }

    // 로그인 후 리다이렉트
    if (asPath === '/auth' || !asPath) return;
    setCookie('auth_redirect', asPath, {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      path: '/',
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });
  }, [asPath]);

  return (
    <>
      {modalName === loginModal && (
        <AuthModal open={true} onCancel={onCloseModal} />
      )}
      <div id="portal" />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default CoreContainer;
