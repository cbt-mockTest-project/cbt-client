import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Drawer } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { CrownTwoTone, UserOutlined } from '@ant-design/icons';
import { NavViewProps } from './Nav.interface';
import { UserRole } from 'types';

interface NavDrawerProps
  extends Pick<
    NavViewProps,
    'menuState' | 'onToggleMenu' | 'meQuery' | 'requestLogout'
  > {}

const NavDrawer: React.FC<NavDrawerProps> = (props) => {
  const CommonNavItemComponent = () => (
    <div className="mobile-nav-common-wrapper">
      <Link href="/community?c=SUGGENSTION">
        <span className="mobile-nav-item-link-text">커뮤니티</span>
      </Link>
    </div>
  );
  return (
    <StyledDrawer
      open={props.menuState}
      onClose={props.onToggleMenu}
      className="mobile-menu-drawer"
      title="메뉴"
      width={200}
    >
      <div className="mobile-menu-drawer-wrapper">
        {props.meQuery?.me.user ? (
          <>
            <div className="mobile-nav-user-content">
              <span className="mobile-nav-user-content-profile-image">
                {props.meQuery.me.user.isAllowAdblock && (
                  <CrownTwoTone
                    className="nav-user-content-profile-crown"
                    width={15}
                    height={15}
                    twoToneColor={palette.yellow_500}
                  />
                )}
                <UserOutlined className="nav-user-content-profile-user-outlined" />
              </span>
              <span>{props.meQuery?.me.user.nickname}</span>
            </div>
            {CommonNavItemComponent()}
            <div className="mobile-nav-item-wrapper">
              <Link href="/me/bookmark">
                <span className="mobile-nav-item-link-text">활동내역</span>
              </Link>
              <Link href="/me/edit">
                <span className="mobile-nav-item-link-text">프로필수정</span>
              </Link>
            </div>
            {props.meQuery.me.user.role === UserRole.Admin && (
              <Link href="/admin">
                <span className="mobile-nav-item-link-text">관리자</span>
              </Link>
            )}
            <StyledButton onClick={props.requestLogout}>로그아웃</StyledButton>
          </>
        ) : (
          <>
            <div className="mobile-nav-item-wrapper-logout">
              <Link href="/mobile/login">
                <StyledButton>로그인</StyledButton>
              </Link>
              <Link href="/register/confirm">
                <StyledButton type="primary">회원가입</StyledButton>
              </Link>
            </div>
            {CommonNavItemComponent()}
          </>
        )}
      </div>
    </StyledDrawer>
  );
};

export default NavDrawer;

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
    .mobile-nav-item-wrapper,
    .mobile-nav-common-wrapper {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .mobile-nav-item-wrapper {
      padding: 10px 0;
      border-top: 1px solid ${palette.gray_200};
    }
    .mobile-nav-item-wrapper-logout {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 15px;
      border-bottom: 1px solid ${palette.gray_200};
    }
    .mobile-nav-user-content-profile-image {
      top: 1px;
      position: relative;
    }
    .nav-user-content-profile-user-outlined {
      svg {
        width: 21px;
        height: 21px;
      }
    }
    .nav-user-content-profile-crown {
      position: absolute;
      top: -11px;
      left: 1px;
      svg {
        width: 19px;
        height: 19px;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${responsive.medium}) {
    width: 100%;
  }
`;
