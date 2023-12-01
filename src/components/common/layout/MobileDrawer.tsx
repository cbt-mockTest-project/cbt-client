import palette from '@styles/palette';
import { Drawer } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { DrawerProps } from 'antd/lib';
import { navList } from './layout.constants';
import UserAuthBox from './UserAuthBox';
import { useRouter } from 'next/router';

interface MobileDrawerProps extends DrawerProps {}

const MobileDrawer: React.FC<MobileDrawerProps> = (props) => {
  const { ...drawerProps } = props;
  const router = useRouter();
  return (
    <StyledDrawer {...drawerProps} title="메뉴" width={200}>
      <ul className="mobile-drawer-list">
        {navList.map((nav) => (
          <li
            className={`mobile-drawer-item ${
              router.pathname === nav.path ? 'active' : ''
            }`}
            key={nav.name}
          >
            <Link href={nav.path}>
              {nav.icon}
              <span>{nav.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <UserAuthBox />
    </StyledDrawer>
  );
};

export default MobileDrawer;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px !important;
  }
  .mobile-drawer-list {
    margin-bottom: 15px;
  }
  .mobile-drawer-item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 3px 4px;
    padding: 0px 10px 0px 24px;
    border-radius: 5px;
    transition: background-color 0.2s ease-in-out;
    font-size: 14px;
    &:hover {
      background-color: ${palette.gray_100};
    }
    a {
      color: black;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    svg {
      font-size: 18px;
    }
  }
  .mobile-drawer-item.active {
    background-color: ${palette.gray_100};
    color: ${palette.antd_blue_02};
    a {
      color: ${palette.antd_blue_02};
    }
    svg {
      fill: ${palette.antd_blue_02};
    }
  }
`;
