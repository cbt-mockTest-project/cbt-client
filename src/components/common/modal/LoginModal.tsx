import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import FindPasswordForm from '../form/FindPasswordForm';
import LoginForm from '../form/LoginForm';
import Modal, { ModalProps } from './Modal';

type loginModalTab = 'login' | 'findPassword';

interface LoginModalProps extends Pick<ModalProps, 'open' | 'onClose'> {}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [currentTab, setCurrentTab] = useState<loginModalTab>('login');
  const onChangeTab = (tabName: loginModalTab) => setCurrentTab(tabName);
  return (
    <LoginModalContainer>
      <Modal open={open} onClose={onClose} className="login-modal">
        {currentTab === 'login' && <LoginForm />}

        {currentTab === 'findPassword' && <FindPasswordForm />}
        <div className="login-modal-find-password">
          <button
            className="login-modal-find-password-button"
            onClick={() =>
              onChangeTab(currentTab === 'login' ? 'findPassword' : 'login')
            }
          >
            {currentTab === 'login' ? '비밀번호 찾기' : '로그인'}
          </button>
        </div>
      </Modal>
    </LoginModalContainer>
  );
};

export default LoginModal;

const LoginModalContainer = styled.div`
  .login-modal {
    height: 320px;
  }
  .login-modal-find-password {
    width: 100%;
    margin-top: 15px;
    font-size: 0.8rem;
    text-align: center;
    color: ${palette.gray_500};
    button {
      cursor: pointer;
      :hover {
        color: ${palette.antd_blue_01};
      }
    }
  }
`;
