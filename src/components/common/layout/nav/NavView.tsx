import palette from '@styles/palette';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DropBox from '../../dropbox/DropBox';
import OuterClick from '../../outerClick/OuterClick';
import { responsive } from '@lib/utils/responsive';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import NoticeDropBox from '../../dropbox/NoticeDropBox';
import NavDrawer from './NavDrawer';
import { navItems } from './Nav.constants';
import { NavViewProps } from './Nav.interface';
import useIsMobile from '@lib/hooks/useIsMobile';

const NavView: React.FC<NavViewProps> = (props) => {
  const isMobile = useIsMobile();
  return (
    <NavBlock
      sticky={props.sticky}
      profileDropBoxState={props.profileDropBoxState}
    >
      {!isMobile && (
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
          {navItems.map((item) => (
            <Link href={item.path} key={item.path}>
              <span
                className={`nav-item ${
                  props.isSelectedNavItem(item.key) && 'active'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
          {props.meQuery?.me.user ? (
            <div className="nav-user-content-wrapper ml-auto">
              <OuterClick callback={props.onOuterClickForNoticeDropBox}>
                <button
                  onClick={props.onToggleNoticesDropBox}
                  className={`nav-user-content-notice-button ${
                    props.hasNotices && 'active'
                  }`}
                >
                  <NotificationsNoneOutlinedIcon />
                </button>
                <NoticeDropBox
                  isOpen={props.noticesDropBoxState}
                  options={props.noticeBoxOptions}
                />
              </OuterClick>

              <OuterClick callback={props.onOuterClickForProfileDropBox}>
                <button
                  className="nav-user-content"
                  onClick={props.onToggleProfileDropBox}
                >
                  <span className="nav-user-content-profile-image">
                    <UserOutlined />
                  </span>
                  <span>{props.meQuery?.me.user.nickname}</span>
                </button>
                <DropBox
                  isOpen={props.profileDropBoxState}
                  options={props.dropBoxOptions}
                />
              </OuterClick>
            </div>
          ) : (
            <>
              <Link href="/register/confirm">
                <span
                  className={`nav-item-link-text ml-auto ${
                    props.isRegister && 'selected'
                  }`}
                >
                  회원가입
                </span>
              </Link>
              <Button onClick={props.openLoginModal} htmlType="button">
                로그인
              </Button>
            </>
          )}
        </div>
      )}
      {isMobile && (
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
          <div className="nav-user-content-notice-button-wrapper">
            <OuterClick callback={props.onOuterClickForNoticeDropBox}>
              <button
                onClick={props.onToggleNoticesDropBox}
                className={`nav-user-content-notice-button ${
                  props.hasNotices && 'active'
                }`}
              >
                <NotificationsNoneOutlinedIcon />
              </button>
              <NoticeDropBox
                isOpen={props.noticesDropBoxState}
                options={props.noticeBoxOptions}
              />
            </OuterClick>
          </div>
          <button className="mobile-menu-button" onClick={props.onToggleMenu}>
            <MenuIcon />
          </button>
          <NavDrawer
            menuState={props.menuState}
            onToggleMenu={props.onToggleMenu}
            meQuery={props.meQuery}
            tryRequestLogout={props.tryRequestLogout}
          />
        </div>
      )}
    </NavBlock>
  );
};

export default NavView;

interface NavBlockProps {
  sticky: boolean;
  profileDropBoxState: boolean;
}

const NavBlock = styled.div<NavBlockProps>`
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
  .nav-item {
    font-size: 0.9rem;
    color: ${palette.gray_700};
    cursor: pointer;
    transition: color 0.2s ease-in;
    position: relative;
    top: 5px;
  }
  .nav-item.active {
    color: ${palette.antd_blue_01};
  }
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
    .nav-user-content-notice-button-wrapper {
      position: relative;
      margin-left: auto;
      margin-right: 30px;
      margin-top: 5px;
    }
  }
`;
