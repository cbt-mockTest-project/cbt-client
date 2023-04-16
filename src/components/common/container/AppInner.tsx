import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useCreateVisit } from '@lib/graphql/user/hook/useVisit';
import { handleError } from '@lib/utils/utils';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import shortid from 'shortid';

interface AppInnerProps {}

const AppInner: React.FC<AppInnerProps> = () => {
  const [createVisit] = useCreateVisit();
  const { data: meData } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (meData?.me.user?.isAllowAdblock && typeof window !== 'undefined') {
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
      } catch (e) {
        console.log('hi');
      }
    }
  }, [meData, router.asPath]);

  const requestCreateVisit = async () => {
    const mtvCookie = getCookie('MTV');
    if (!mtvCookie) {
      createVisit();
      setCookie('MTV', shortid.generate(), {
        maxAge: 60 * 30,
      });
    }
  };
  useEffect(() => {
    try {
      requestCreateVisit();
    } catch (e) {
      handleError(e);
    }
  }, []);

  return null;
};

export default AppInner;
