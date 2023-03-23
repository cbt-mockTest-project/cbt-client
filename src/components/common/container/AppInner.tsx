import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useCreateVisit } from '@lib/graphql/user/hook/useVisit';
import useToggle from '@lib/hooks/useToggle';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { getCookie, setCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import shortid from 'shortid';

interface AppInnerProps {}

const AppInner: React.FC<AppInnerProps> = () => {
  const [createVisit] = useCreateVisit();

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
