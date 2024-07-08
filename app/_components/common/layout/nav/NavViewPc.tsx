import OuterClick from '../../outerClick/OuterClick';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NoticeDropBox from '../../dropbox/NoticeDropBox';
import { CrownTwoTone, UserOutlined } from '@ant-design/icons';
import DropBox from '../../dropbox/DropBox';
import { Button } from 'antd';
import { NavViewProps } from './Nav.interface';
import { responsive } from '../../../../_lib/utils/responsive';
import palette from '../../../../_styles/palette';
import { User, UserRole } from '../../../../types';
import { NAV_ITEMS } from './Nav.constants';
import { checkRole } from '../../../../_lib/utils/utils';

interface NavViewPcProps extends NavViewProps {}

const NavViewPc: React.FC<NavViewPcProps> = (props) => {
  return (
    <NavViewPcContainer>
      <Link href="/">
        <div className="nav-home-logo-wrapper">
          <Image src={'/png/logo01.png'} alt="logo-img" fill />
        </div>
      </Link>
      {NAV_ITEMS.map((item) => {
        if (
          item.permission &&
          !item.permission.includes(props.meQuery?.me.user?.role as UserRole)
        )
          return null;
        return item.isNewTab ? (
          <a key={item.path} href={item.path} target="_blank" rel="noreferrer">
            <span
              className={`nav-item ${
                props.isSelectedNavItem(item.key) && 'active'
              }`}
            >
              {item.label}
            </span>
          </a>
        ) : (
          <Link href={item.path} key={item.path}>
            <span
              className={`nav-item ${
                props.isSelectedNavItem(item.key) && 'active'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
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
                {checkRole({
                  roleIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                  meQuery: props.meQuery,
                }) && (
                  <CrownTwoTone
                    className="nav-user-content-profile-crown"
                    width={15}
                    height={15}
                    twoToneColor={palette.yellow_500}
                  />
                )}
                <UserOutlined />
              </span>
              <span className="nav-user-content-profile-nickname">
                {props.meQuery?.me.user.nickname}
              </span>
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
  .nav-user-content-profile-image {
    position: relative;
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

  @media (max-width: ${responsive.medium}) {
    display: none;
  }
`;
