import { homeRouteStackKey, loginModal } from '@lib/constants';
import { coreActions } from '@modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AuthModal from '@components/auth/AuthModal';
import { checkRole, someIncludes } from '@lib/utils/utils';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { LocalStorage } from '@lib/utils/localStorage';
import * as gtag from '@lib/ga/gtag';
import katex from 'katex';

import { App } from 'antd';
import { checkHomePage } from '@lib/constants/routes';

interface CoreContainerProps {}

const CoreContainer: React.FC<CoreContainerProps> = () => {
  const { message } = App.useApp();
  const { data: meQuery } = useMeQuery();
  const localStorage = new LocalStorage();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);
  const onCloseModal = () => {
    dispatch(coreActions.closeModal());
  };

  useEffect(() => {
    if (
      checkRole({ roleIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], meQuery }) &&
      typeof window !== 'undefined'
    ) {
      try {
        const adsbygoogle = document.querySelectorAll('ins.adsbygoogle');
        const adsbygoogleScript = document.querySelectorAll(
          'script#googleAdScript'
        );
        adsbygoogle.forEach((ad) => {
          if (ad.parentNode) {
            ad.parentNode.removeChild(ad);
          }
        });
        adsbygoogleScript.forEach((ad) => {
          if (ad.parentNode) {
            ad.parentNode.removeChild(ad);
          }
        });
      } catch (e) {}
    }
  }, [meQuery, router.asPath]);

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
    const userAgent = window.navigator.userAgent;
    if (userAgent.toUpperCase().includes('KAKAO')) {
      // 카카오 인앱브라우저에서 현재 링크 띄우기
      const currentUrl = window.location.href;
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(
        currentUrl
      )}`;
    }
  }, []);

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
    if (router.asPath === '/auth' || !router.asPath) return;
    setCookie('auth_redirect', router.asPath, {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      path: '/',
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });
  }, [router.asPath]);

  return (
    <CoreContainerBlock>
      {modalName === loginModal && (
        <AuthModal open={true} onCancel={onCloseModal} />
      )}
      <div id="portal" />
    </CoreContainerBlock>
  );
};

export default CoreContainer;

const CoreContainerBlock = styled.div``;
