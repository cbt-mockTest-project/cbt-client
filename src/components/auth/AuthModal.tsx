import { Modal } from 'antd';
import { ModalProps } from 'antd/lib';
import React, { useState } from 'react';
import styled from 'styled-components';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
import FindPasswordTab from './FindPasswordTab';

const AuthModalBlock = styled(Modal)`
  .ant-modal-content {
    width: 330px;
  }
`;

interface AuthModalProps extends Omit<ModalProps, 'children'> {}

const AuthModal: React.FC<AuthModalProps> = (props) => {
  const [currentTab, setCurrentTab] = useState<
    'login' | 'register' | 'findPassword'
  >('login');
  const { ...modalProps } = props;
  return (
    <AuthModalBlock {...modalProps} footer={false}>
      {currentTab === 'login' && <LoginTab />}
      {currentTab === 'register' && <RegisterTab />}
      {currentTab === 'findPassword' && <FindPasswordTab />}
    </AuthModalBlock>
  );
};

export default AuthModal;
