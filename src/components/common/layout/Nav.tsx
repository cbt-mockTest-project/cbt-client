import palette from '@styles/palette';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import LoginForm from '@components/common/modal/LoginForm';
import Modal from '@components/common/modal/Modal';
import { useLogoutMutation, useMeQuery } from '@lib/graphql/user/hook/useUser';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { UserOutlined } from '@ant-design/icons';
import DropBox, { DropBoxOption } from '../dropbox/DropBox';
import OuterClick from '../outerClick/OuterClick';
import { loginModal } from '@lib/constants';
import { tryCatchHandler } from '@lib/utils/utils';

const Nav = () => {
  const router = useRouter();
  const [sticky, setSticky] = useState(false);
  const [profileDropBoxState, setProfileDropBoxState] = useState(false);
  const { data: meQuery } = useMeQuery();
  const { pathname } = useRouter();
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);
  const isHome = pathname === '/';
  const isRegister = pathname.includes('/register');
  const requestLogout = async () => {
    await logoutMutation();
    location.reload();
  };
  const tryRequestLogout = () => tryCatchHandler({ callback: requestLogout });
  const dropBoxOptions: DropBoxOption[] = [
    {
      label: '활동내역',
      onClick: () => {},
    },
    {
      label: '프로필수정',
      onClick: () => {
        router.push('/me/edit');
      },
    },
    {
      label: '로그아웃',
      onClick: tryRequestLogout,
    },
  ];
  const onScroll = () => {
    if (window.scrollY > 60 && !sticky) {
      return setSticky(true);
    }
    if (window.scrollY <= 60 && sticky) {
      return setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);
  const openLoginModal = () => {
    dispatch(coreActions.openModal(loginModal));
  };
  const closeLoginModal = () => {
    dispatch(coreActions.closeModal());
  };

  const onProfileClick = () => {
    setProfileDropBoxState(!profileDropBoxState);
  };
  const navItems = [
    {
      key: '/',
      label: '문제풀이',
      selected: isHome,
    },
  ];
  return (
    <>
      <NavContainer sticky={sticky} profileDropBoxState={profileDropBoxState}>
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
            <div className="nav-user-content-wrapper ml-auto">
              <button className="nav-user-content" onClick={onProfileClick}>
                <span className="nav-user-content-profile-image">
                  <UserOutlined />
                </span>
                <span>{meQuery?.me.user.nickname}</span>
              </button>
              <OuterClick
                callback={() => {
                  setProfileDropBoxState(false);
                }}
              >
                <DropBox
                  isOpen={profileDropBoxState}
                  options={dropBoxOptions}
                />
              </OuterClick>
            </div>
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
      </NavContainer>
      <Modal open={modalName === loginModal} onClose={closeLoginModal}>
        <LoginForm />
      </Modal>
    </>
  );
};

export default Nav;

const NavContainer = styled.div<{
  sticky: boolean;
  profileDropBoxState: boolean;
}>`
  padding: 25px 0px;
  height: 60px;
  border-bottom: 1.5px solid ${palette.gray_200};
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0px;
  z-index: 500;
  background-color: white;
  width: 100vw;
  transition: box-shadow 0.2s ease-in;
  ${(props) =>
    props.sticky &&
    css`
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 4px;
    `}
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
  .nav-user-content-wrapper {
    position: relative;
  }
  .nav-user-content {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${palette.gray_700};
    cursor: pointer;
    transition: color 0.2s ease-in;
    ${(props) =>
      props.profileDropBoxState &&
      css`
        color: ${palette.antd_blue_01};
      `}
    :hover {
      color: ${palette.antd_blue_01};
    }
    .nav-user-content-profile-image {
      span {
        font-size: 1.3rem;
      }
    }
    span {
      font-size: 0.9rem;
    }
  }
`;
