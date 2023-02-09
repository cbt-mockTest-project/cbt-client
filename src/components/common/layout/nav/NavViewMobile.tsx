import OuterClick from '@components/common/outerClick/OuterClick';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NoticeDropBox from '@components/common/dropbox/NoticeDropBox';
import MenuIcon from '@mui/icons-material/Menu';
import NavDrawer from './NavDrawer';
import { NavViewProps } from './Nav.interface';
import { responsive } from '@lib/utils/responsive';

interface NavViewMobileProps extends NavViewProps {}

const NavViewMobile: React.FC<NavViewMobileProps> = (props) => {
  return (
    <NavViewMobileContainer>
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
    </NavViewMobileContainer>
  );
};

export default NavViewMobile;

const NavViewMobileContainer = styled.div`
  display: none;

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
    .nav-user-content-notice-button-wrapper {
      position: relative;
      margin-left: auto;
      margin-right: 30px;
      margin-top: 5px;
    }
  }
`;
