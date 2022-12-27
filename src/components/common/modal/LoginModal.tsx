import { coreActions } from '@modules/redux/slices/core';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import palette from '@styles/palette';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FindPasswordForm from '../form/FindPasswordForm';
import LoginForm from '../form/LoginForm';
import Modal, { ModalProps } from './Modal';

type loginModalTab = 'login' | 'findPassword';

interface LoginModalProps extends Pick<ModalProps, 'open' | 'onClose'> {}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<loginModalTab>('login');
  const onChangeTab = (tabName: loginModalTab) => setCurrentTab(tabName);
  useEffect(() => {
    const closeModal = () => dispatch(coreActions.closeModal());
    Router.events.on('routeChangeComplete', closeModal);
    Router.events.on('hashChangeComplete', closeModal);
    return () => {
      Router.events.off('routeChangeComplete', closeModal);
      Router.events.off('hashChangeComplete', closeModal);
    };
  }, []);
  return (
    <LoginModalContainer>
      <Modal open={open} onClose={onClose} className="login-modal">
        {currentTab === 'login' && <LoginForm />}

        {currentTab === 'findPassword' && <FindPasswordForm />}
        <div className="login-modal-find-password">
          <Link href="/register/confirm">회원가입</Link>
          <span className="login-modal-vertical-line">|</span>
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
  .login-modal-find-password {
    width: 100%;
    margin-top: 15px;
    font-size: 0.8rem;
    text-align: center;
    color: ${palette.gray_500};
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      cursor: pointer;
      :hover {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .login-modal-vertical-line {
    margin: 0 5px;
    font-size: 10px;
    font-weight: 600;
  }
`;
