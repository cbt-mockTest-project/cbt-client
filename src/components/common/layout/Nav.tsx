import palette from '@styles/palette';
import { Button, Drawer } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLogoutMutation, useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { UserOutlined } from '@ant-design/icons';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DropBox, { DropBoxOption } from '../dropbox/DropBox';
import OuterClick from '../outerClick/OuterClick';
import { loginModal } from '@lib/constants';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { responsive } from '@lib/utils/responsive';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import NoticeDropBox, { NoticeDropBoxOption } from '../dropbox/NoticeDropBox';
import useToggle from '@lib/hooks/useToggle';

const Nav = () => {
  const router = useRouter();
  const [sticky, setSticky] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const {
    value: profileDropBoxState,
    setValue: setProfileDropBoxState,
    onToggle: onToggleProfileDropBox,
  } = useToggle();
  const {
    value: noticesDropBoxState,
    setValue: setNoticesDropBoxState,
    onToggle: onToggleNoticesDropBox,
  } = useToggle();
  const { data: meQuery } = useMeQuery();
  const { pathname } = useRouter();
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const isRegister = pathname.includes('/register');
  const requestLogout = async () => {
    await logoutMutation();
    location.reload();
  };
  const tryRequestLogout = convertWithErrorHandlingFunc({
    callback: requestLogout,
  });
  const notices = meQuery?.me.notices;
  const noticeBoxOptions: NoticeDropBoxOption[] =
    notices?.map((notice) => ({
      value: notice.id,
      label: notice.content,
      confirmed: notice.confirm,
    })) || [];
  const hasNotices = notices && notices.length >= 1;
  const dropBoxOptions: DropBoxOption[] = [
    {
      label: '활동내역',
      onClick: () => router.push('/me?l=eh'),
    },
    {
      label: '프로필수정',
      onClick: () => router.push('/me/edit'),
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
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));

  const onToggleMenu = () => setMenuState(!menuState);

  return (
    <NavContainer sticky={sticky} profileDropBoxState={profileDropBoxState}>
      <div className="pc-nav-contents-wrapper">
        <Link href="/">
          <div className="nav-home-logo-wrapper">
            <Image
              src={'/png/logo01.png'}
              alt="logo-img"
              width={320}
              height={200}
              layout="responsive"
            />
          </div>
        </Link>
        {meQuery?.me.user ? (
          <div className="nav-user-content-wrapper ml-auto">
            <OuterClick
              callback={() =>
                noticesDropBoxState && setNoticesDropBoxState(false)
              }
            >
              <button
                onClick={onToggleNoticesDropBox}
                className={`nav-user-content-notice-button ${
                  hasNotices && 'active'
                }`}
              >
                <NotificationsNoneOutlinedIcon />
              </button>
              <NoticeDropBox
                isOpen={noticesDropBoxState}
                options={noticeBoxOptions}
              />
            </OuterClick>

            <OuterClick
              callback={() =>
                profileDropBoxState && setProfileDropBoxState(false)
              }
            >
              <button
                className="nav-user-content"
                onClick={onToggleProfileDropBox}
              >
                <span className="nav-user-content-profile-image">
                  <UserOutlined />
                </span>
                <span>{meQuery?.me.user.nickname}</span>
              </button>
              <DropBox isOpen={profileDropBoxState} options={dropBoxOptions} />
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
      <div className="mobile-nav-contents-wrapper">
        <Link href="/">
          <div className="nav-home-logo-wrapper">
            <Image
              src={'/png/logo01.png'}
              alt="logo-img"
              width={320}
              height={200}
              layout="responsive"
            />
          </div>
        </Link>
        <button className="mobile-menu-button" onClick={onToggleMenu}>
          <MenuIcon />
        </button>
        <StyledDrawer
          open={menuState}
          onClose={onToggleMenu}
          className="mobile-menu-drawer"
          title="메뉴"
          width={200}
        >
          <div className="mobile-menu-drawer-wrapper">
            {meQuery?.me.user ? (
              <>
                <div className="mobile-nav-user-content">
                  <span className="mobile-nav-user-content-profile-image">
                    <UserOutlined />
                  </span>
                  <span>{meQuery?.me.user.nickname}</span>
                </div>
                <Link href="/me?l=eh">
                  <span className={`mobile-nav-item-link-text`}>활동내역</span>
                </Link>
                <Link href="/me/edit">
                  <span className={`mobile-nav-item-link-text`}>
                    프로필수정
                  </span>
                </Link>
                <StyledButton onClick={tryRequestLogout}>로그아웃</StyledButton>
              </>
            ) : (
              <>
                <Link href="/mobile/login">
                  <StyledButton>로그인</StyledButton>
                </Link>
                <Link href="/register/confirm">
                  <StyledButton type="primary">회원가입</StyledButton>
                </Link>
              </>
            )}
          </div>
        </StyledDrawer>
      </div>
    </NavContainer>
  );
};

export default Nav;

interface NavContainerProps {
  sticky: boolean;
  profileDropBoxState: boolean;
}

const NavContainer = styled.div<NavContainerProps>`
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
  padding: 0 80px;
  ${(props) =>
    props.sticky &&
    css`
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 4px;
    `}
  .mobile-nav-contents-wrapper {
    display: none;
  }
  .pc-nav-contents-wrapper {
    width: 100vw;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: center;
  }
  .nav-home-logo-wrapper {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    width: 80px;
    height: 50px;
    /* width: 100px; */
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
    display: flex;
    gap: 15px;
    align-items: center;
    position: relative;
  }
  .nav-user-content-notice-button {
    position: relative;

    svg {
      color: ${palette.gray_700};
      transition: color 0.2s ease-in;
    }
    position: relative;
    top: 1.5px;
    cursor: pointer;
    :hover {
      svg {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .nav-user-content-notice-button.active {
    ::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: ${palette.antd_blue_01};
      top: 2px;
      right: 3px;
      position: absolute;
    }
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

  @media (max-width: ${responsive.medium}) {
    padding: 0 10px;
    .pc-nav-contents-wrapper {
      display: none;
    }
    .mobile-nav-contents-wrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    .mobile-login-button {
      width: 100% !important;
    }
    .mobile-nav-user-content-profile-image {
      span {
        font-size: 1.3rem;
      }
    }
    .mobile-menu-button {
      position: relative;
      top: 4px;
    }
  }
`;

const StyledDrawer = styled(Drawer)`
  @media (max-width: ${responsive.medium}) {
    .mobile-menu-drawer-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .mobile-nav-user-content {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid ${palette.gray_200};
    }
    .mobile-nav-item-link-text {
      font-size: 0.9rem;
      cursor: pointer;
      padding: 5px 0;
      transition: color 0.2s ease-in;
      :hover {
        color: ${palette.antd_blue_01};
      }
    }
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;
