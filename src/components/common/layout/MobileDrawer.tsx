import palette from '@styles/palette';
import { Drawer } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { DrawerProps } from 'antd/lib';
import { navItems } from './layout.constants';
import UserAuthBox from './UserAuthBox';
import { useRouter } from 'next/router';
import SideNavList from './SideNavList';

interface MobileDrawerProps extends DrawerProps {}

const MobileDrawer: React.FC<MobileDrawerProps> = (props) => {
  const { ...drawerProps } = props;
  const router = useRouter();
  return (
    <StyledDrawer {...drawerProps} title="메뉴" width={200}>
      <SideNavList />
      <UserAuthBox />
    </StyledDrawer>
  );
};

export default MobileDrawer;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px !important;
    background-color: ${palette.colorBgContainer};
  }
`;
