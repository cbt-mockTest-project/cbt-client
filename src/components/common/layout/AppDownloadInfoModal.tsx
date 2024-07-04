import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import palette from '@styles/palette';
import { Button, Modal, ModalProps } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const AppDownloadInfoModalBlock = styled(Modal)`
  .app-download-info-modal-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .app-download-info-modal-android-app-button-wrapper {
    display: flex;
    gap: 10px;
  }
  .app-download-info-modal-android-app-button {
    svg {
      font-size: 16px;
    }
    color: ${({ theme }) => theme.color('colorText')};
  }
  .app-download-info-modal-ios-guide-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1410 / 1340;
    margin-top: 20px;
  }
`;

interface AppDownloadInfoModalProps extends Omit<ModalProps, 'children'> {}

const AppDownloadInfoModal: React.FC<AppDownloadInfoModalProps> = (props) => {
  const { ...modalProps } = props;
  const [isIOS, setIsIOS] = useState(false);
  return (
    <AppDownloadInfoModalBlock {...modalProps} footer={false}>
      <div className="app-download-info-modal-title">앱 설치 안내</div>
      <div className="app-download-info-modal-android-app-button-wrapper">
        <a
          href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="app-download-info-modal-android-app-button">
            <AndroidOutlined />
            안드로이드 앱
          </Button>
        </a>
        <Button
          className="app-download-info-modal-android-app-button"
          onClick={() => setIsIOS((prev) => !prev)}
        >
          <AppleOutlined />
          IOS 앱
        </Button>
      </div>
      {isIOS && (
        <div className="app-download-info-modal-ios-guide-wrapper">
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT}/app-guide/ios-app-guide01.png`}
            alt="ios-guide-image"
            fill
          />
        </div>
      )}
    </AppDownloadInfoModalBlock>
  );
};

export default AppDownloadInfoModal;
