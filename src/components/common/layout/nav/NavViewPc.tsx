import OuterClick from '@components/common/outerClick/OuterClick';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { navItems } from './Nav.constants';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NoticeDropBox from '@components/common/dropbox/NoticeDropBox';
import { UserOutlined } from '@ant-design/icons';
import DropBox from '@components/common/dropbox/DropBox';
import { Button } from 'antd';
import { NavViewProps } from './Nav.interface';
import { responsive } from '@lib/utils/responsive';

interface NavViewPcProps extends NavViewProps {}

const NavViewPc: React.FC<NavViewPcProps> = (props) => {
  return (
    <NavViewPcContainer>
      <Link href="/">
        <div className="nav-home-logo-wrapper">
          <Image src={'/png/logo01.png'} alt="logo-img" fill />
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
          <Link href="/register/confirm" className="ml-auto">
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
    </NavViewPcContainer>
  );
};

export default NavViewPc;

const NavViewPcContainer = styled.div`
  width: 100vw;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  align-items: center;
  .nav-home-logo-wrapper {
    position: relative;
  }

  @media (max-width: ${responsive.medium}) {
    display: none;
  }
`;
