import { Modal } from 'antd';
import { ModalProps } from 'antd/lib';
import React from 'react';
import styled from 'styled-components';
import AuthContent from './AuthContent';

const AuthModalBlock = styled(Modal)`
  .ant-modal-content {
    width: 330px;
  }
`;

interface AuthModalProps extends Omit<ModalProps, 'children'> {}

const AuthModal: React.FC<AuthModalProps> = (props) => {
  const { ...modalProps } = props;

  return (
    <AuthModalBlock {...modalProps} footer={false}>
      <AuthContent />
    </AuthModalBlock>
  );
};

export default AuthModal;
