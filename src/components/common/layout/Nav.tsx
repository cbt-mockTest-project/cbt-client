import palette from '@styles/palette';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import LoginForm from '@components/common/modal/LoginForm';
import Modal from '@components/common/modal/Modal';
import { useLogoutMutation, useMeQuery } from '@lib/graphql/user/hook/useUser';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { initializeApollo } from '@modules/apollo';

const Nav = () => {
  const loginModal = 'longinModal';
  const { data: meQuery } = useMeQuery();
  const { pathname } = useRouter();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);
  const isHome = pathname === '/';
  const isCommunity = pathname === '/community';
  const isRegister = pathname.includes('/register');

  const openLoginModal = () => {
    dispatch(coreActions.openModal(loginModal));
  };
  const closeLoginModal = () => {
    dispatch(coreActions.closeModal());
  };
  const onLogout = async () => {
    await logout();
    location.reload();
  };
  const navItems = [
    {
      key: '/',
      label: '문제풀이',
      selected: isHome,
    },
    {
      key: '/community',
      label: '커뮤니티',
      selected: isCommunity,
    },
  ];
  return (
    <>
      <NavContainer>
        <div className="nav-contents-wrapper">
          <Link href="/">
            <span className="nav-home-link-text">실기CBT</span>
          </Link>
          {navItems.map((item) => {
            return (
              <Link href={item.key} key={item.key}>
                <span
                  className={`nav-item-link-text ${
                    item.selected && 'selected'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          {meQuery?.me.user ? (
            <p className="nav-user-content ml-auto">
              {meQuery?.me.user.nickname}
            </p>
          ) : (
            <>
              <Link href="/register/confirm">
                <span
                  className={`nav-item-link-text ml-auto ${
                    isRegister && 'selected'
                  }`}
                >
                  회원가입
                </span>
              </Link>
              <Button onClick={openLoginModal} htmlType="button">
                로그인
              </Button>
            </>
          )}
        </div>
        <button onClick={onLogout}>로그아웃</button>
      </NavContainer>
      <Modal open={modalName === loginModal} onClose={closeLoginModal}>
        <LoginForm />
      </Modal>
    </>
  );
};

export default Nav;

const NavContainer = styled.div`
  padding: 25px 0px;
  height: 60px;
  border-bottom: 1.5px solid ${palette.gray_200};
  display: flex;
  flex-direction: row;
  position: sticky;
  width: 100vw;
  .nav-contents-wrapper {
    width: 100vw;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: center;
  }
  .nav-home-link-text {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
  .nav-item-link-text,
  .nav-register-link-text {
    :hover {
      color: ${palette.antd_blue_01};
      transition: color 0.3s ease-in;
    }
    color: ${palette.gray_500};
    cursor: pointer;
  }
  .selected {
    color: ${palette.antd_blue_01};
  }
`;
