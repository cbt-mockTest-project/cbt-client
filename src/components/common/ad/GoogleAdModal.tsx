import { Modal, ModalProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import GoogleAd from './GoogleAd';

const GoogleAdModalBlock = styled(Modal)``;

interface GoogleAdModalProps extends Omit<ModalProps, 'children'> {}

const GoogleAdModal: React.FC<GoogleAdModalProps> = (props) => {
  const { ...modalProps } = props;
  return (
    <GoogleAdModalBlock {...modalProps} footer={false}>
      <div className="google-ad-modal-ad-wrapper">
        <GoogleAd type="display" />
      </div>
    </GoogleAdModalBlock>
  );
};
export default GoogleAdModal;
