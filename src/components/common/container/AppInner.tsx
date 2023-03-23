import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useCreateVisit } from '@lib/graphql/user/hook/useVisit';
import useToggle from '@lib/hooks/useToggle';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { getCookie, setCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { UserRole } from 'types';
import PreventAdBlockModal from '../modal/PreventAdBlockModal';
import Portal from '../portal/Portal';

interface AppInnerProps {}

const AppInner: React.FC<AppInnerProps> = () => {
  const [createVisit] = useCreateVisit();
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
    if (meQuery?.me.user?.role === UserRole.Admin) {
      const head = document.head;
      if (googleAdScript) head.removeChild(googleAdScript);
    } else {
      if (!googleAdScript) {
        setPreventAdBlockModalState(true);
      }
    }
  }, [meQuery]);

  return (
    <>
      <Portal>
        {preventAdBlockModalState && (
          <PreventAdBlockModal
            open={preventAdBlockModalState}
            onClose={() => {}}
          />
        )}
      </Portal>
    </>
  );
};

export default AppInner;
