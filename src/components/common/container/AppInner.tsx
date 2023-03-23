import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useCreateVisit } from '@lib/graphql/user/hook/useVisit';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { getCookie, setCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { UserRole } from 'types';

interface AppInnerProps {}

const AppInner: React.FC<AppInnerProps> = () => {
  const [createVisit] = useCreateVisit();
  const { data: meQuery } = useMeQuery();
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
  useEffect(() => {
    if (meQuery?.me.user?.role === UserRole.Admin) {
      const googleAdScript = document.getElementById('googleAdScript');
      const head = document.head;
      if (googleAdScript) head.removeChild(googleAdScript);
    }
  }, [meQuery]);
  return null;
};

export default AppInner;

const AppInnerContainer = styled.div``;
