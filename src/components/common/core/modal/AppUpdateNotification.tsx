import { Button } from 'antd';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const AppUpdateNotificationBlock = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #e9ecef;
  display: flex;
  z-index: 9999;
  flex-direction: column;
  .app-update-notification-logo-image {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
  }
  .app-update-notification-logo-image-wrapper {
    position: relative;
    width: 100%;
    height: 100px;
  }
  .app-update-notification-description {
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
  }
  .app-update-notification-button {
    width: 200px;
    height: 40px;
    margin-top: 30px;
    a {
      width: 100%;
      height: 100%;
    }
  }
`;

interface AppUpdateNotificationProps {}

const AppUpdateNotification: React.FC<AppUpdateNotificationProps> = () => {
  return (
    <AppUpdateNotificationBlock>
      <div className="app-update-notification-logo-image-wrapper">
        <Image
          className="app-update-notification-logo-image"
          src={'/png/logo01.png'}
          alt="logo-img"
          fill
        />
      </div>
      <p className="app-update-notification-description">
        업데이트 후 이용해주세요.
      </p>
      <Button className="app-update-notification-button" type="primary">
        <a href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1">
          업데이트 하러가기
        </a>
      </Button>
    </AppUpdateNotificationBlock>
  );
};

export default AppUpdateNotification;
