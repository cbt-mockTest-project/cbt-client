import { loginModal } from '@lib/constants';
import { coreActions } from '@modules/redux/slices/core';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginModal from '../modal/LoginModal';
import { isServer } from '@lib/utils/utils';
import { AppInfo } from './CoreContainer.type';
import AppUpdateNotification from './modal/AppUpdateNotification';

interface CoreContainerProps {}

const CoreContainer: React.FC<CoreContainerProps> = () => {
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);
  const [appUpdateNotificationState, setAppUpdateNotificationState] =
    useState(false);
  const onCloseModal = () => {
    dispatch(coreActions.closeModal());
  };

  useEffect(() => {
    if (isServer()) return;
    if (!window.Kakao.isInitialized() && window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }

    // app 양방향 통신을 위한 메소드
    window.appInfoChanged = function (appInfo: AppInfo) {
      //Todo: 앱 업데이트 알림 - 어플 배포후 적용
      // if (appInfo.version !== '1.1.1') {
      //   setAppUpdateNotificationState(true);
      // } else {
      //   setAppUpdateNotificationState(false);
      // }
    };
    if (window.PackageInfo) {
      window.PackageInfo.postMessage('getPackageInfo');
    }
  }, []);

  return (
    <CoreContainerBlock>
      {modalName === loginModal && (
        <LoginModal open={modalName === loginModal} onClose={onCloseModal} />
      )}
      <div id="portal" />
      {appUpdateNotificationState && <AppUpdateNotification />}
    </CoreContainerBlock>
  );
};

export default CoreContainer;

const CoreContainerBlock = styled.div``;
