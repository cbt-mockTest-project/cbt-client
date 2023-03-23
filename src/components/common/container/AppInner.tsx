import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useCreateVisit } from '@lib/graphql/user/hook/useVisit';
import useToggle from '@lib/hooks/useToggle';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { UserRole } from 'types';
import PreventAdBlockModal from '../modal/PreventAdBlockModal';
import Portal from '../portal/Portal';

interface AppInnerProps {}

const AppInner: React.FC<AppInnerProps> = () => {
  const [createVisit] = useCreateVisit();
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const {
    value: preventAdBlockModalState,
    setValue: setPreventAdBlockModalState,
    onToggle: onTogglePreventAdBlockModal,
  } = useToggle(false);
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
    const googleAdScript = document.getElementById('googleAdScript');
    const googleAdScript2 = document.getElementById('google_shimpl');
    console.log(googleAdScript2);
    if (meQuery?.me.user?.role === UserRole.Admin) {
      const head = document.head;
      if (googleAdScript) head.removeChild(googleAdScript);
      if (googleAdScript2) head.removeChild(googleAdScript2);
    } else {
      if (!googleAdScript2 && router.isReady) {
        setPreventAdBlockModalState(true);
      }
    }
  }, [meQuery, router.isReady]);

  return (
    <>
      <Portal>
        {preventAdBlockModalState && (
          <PreventAdBlockModal
            open={preventAdBlockModalState}
            onClose={onTogglePreventAdBlockModal}
          />
        )}
      </Portal>
    </>
  );
};

export default AppInner;
