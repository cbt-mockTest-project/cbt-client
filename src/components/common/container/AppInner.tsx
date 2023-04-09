import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useCreateVisit } from '@lib/graphql/user/hook/useVisit';
import useToggle from '@lib/hooks/useToggle';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
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
    if (meData?.me.user?.role === 'ADMIN') {
      const adsbygoogle = document.querySelectorAll('ins.adsbygoogle');
      const adsbygoogleScript = document.querySelectorAll(
        'script#googleAdScript'
      );
      adsbygoogleScript.forEach((ad) => {
        ad.remove();
      });
      adsbygoogle.forEach((ad) => {
        ad.remove();
      });
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
  const tryCreateVisit = convertWithErrorHandlingFunc({
    callback: requestCreateVisit,
  });
  useEffect(() => {
    tryCreateVisit();
  }, []);

  return null;
};

export default AppInner;
