import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from '../Modal';
import { Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const AppGuideModalBlock = styled(Modal)`
  padding: 30px 20px;
  max-width: 500px;
  /* height: 500px; */
  h2 {
    text-align: center;
    font-size: 20px;
  }
  a {
    button {
      width: 100%;
    }
  }
  .modal-close-button {
    right: -15px;
    top: -25px;
  }
  .app-guide-modal-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
  .app-guide-ios-guide-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1410 / 1340;
    margin-top: 20px;
  }
`;

interface AppGuideModalProps extends Omit<ModalProps, 'children'> {}

const AppGuideModal: React.FC<AppGuideModalProps> = (props) => {
  const [isIOS, setIsIOS] = useState(false);
  const { ...modalProps } = props;
  return (
    <AppGuideModalBlock {...modalProps}>
      <div className="app-guide-modal-wrapper">
        <h2>기종을 선택해주세요!!</h2>
        <a
          href="https://play.google.com/store/apps/details?id=com.moducbt&pli=1"
          target="_blank"
          rel="noreferrer"
        >
          <Button size="large" type="primary">
            안드로이드
          </Button>
        </a>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setIsIOS((prev) => !prev);
          }}
        >
          IOS
        </Button>
      </div>
      {isIOS && (
        <div className="app-guide-ios-guide-wrapper">
          <Image
            src="/png/guide/ios-app-guide01.png"
            alt="ios-guide-image"
            fill
          />
        </div>
      )}
    </AppGuideModalBlock>
  );
};

export default AppGuideModal;
