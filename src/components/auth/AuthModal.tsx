import { Button, Divider, Modal } from 'antd';
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
  .auth-modal-tab-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    button {
      font-size: 12px;
      color: #999;
      cursor: pointer;
    }
  }
`;

interface AuthModalProps extends Omit<ModalProps, 'children'> {}

const AuthModal: React.FC<AuthModalProps> = (props) => {
  const [currentTab, setCurrentTab] = useState<
    'login' | 'register' | 'findPassword'
  >('login');
  const isLoginTab = currentTab === 'login';
  const { ...modalProps } = props;
  return (
    <AuthModalBlock {...modalProps} footer={false}>
      {currentTab === 'login' && <LoginTab />}
      {currentTab === 'register' && <RegisterTab />}
      {currentTab === 'findPassword' && <FindPasswordTab />}
      <div className="auth-modal-tab-wrapper">
        {isLoginTab && (
          <>
            <Button type="text" onClick={() => setCurrentTab('register')}>
              회원가입
            </Button>
            <Divider type="vertical" style={{ marginTop: '4px' }} />
            <Button type="text" onClick={() => setCurrentTab('findPassword')}>
              비밀번호 찾기
            </Button>
          </>
        )}
        {!isLoginTab && (
          <Button type="text" onClick={() => setCurrentTab('login')}>
            로그인
          </Button>
        )}
      </div>
    </AuthModalBlock>
  );
};

export default AuthModal;
