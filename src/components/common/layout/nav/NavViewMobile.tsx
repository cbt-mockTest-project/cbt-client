import NoticeDropBox from '@components/common/dropbox/NoticeDropBox';
import OuterClick from '@components/common/outerClick/OuterClick';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { responsive } from '@lib/utils/responsive';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import palette from '@styles/palette';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { NavViewProps } from './Nav.interface';
import NavDrawer from './NavDrawer';

interface NavViewMobileProps extends NavViewProps {}

const NavViewMobile: React.FC<NavViewMobileProps> = (props) => {
  const { data: meQuery } = useMeQuery();
  return (
    <NavViewMobileContainer>
      <Link href="/">
        <div className="nav-home-logo-wrapper">
          <Image src={'/png/logo01.png'} alt="logo-img" fill />
        </div>
      </Link>
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="nav-user-content-refresh-button-wrapper"
      >
        <RefreshIcon />
      </button>
      {meQuery?.me.user && (
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
      )}
      <button className="mobile-menu-button" onClick={props.onToggleMenu}>
        <MenuIcon />
      </button>
      <NavDrawer
        menuState={props.menuState}
        onToggleMenu={props.onToggleMenu}
        meQuery={props.meQuery}
        requestLogout={props.requestLogout}
      />
    </NavViewMobileContainer>
  );
};

export default NavViewMobile;

const NavViewMobileContainer = styled.div`
  display: none;
  .nav-home-logo-wrapper {
    position: relative;
  }

  @media (max-width: ${responsive.medium}) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
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
    .nav-user-content-refresh-button-wrapper {
      margin-left: auto;
      margin-right: 30px;
      margin-top: 10px;
      color: ${palette.gray_700};
    }
    .nav-user-content-notice-button-wrapper {
      position: relative;
      margin-right: 30px;
      margin-top: 5px;
    }
  }
`;
