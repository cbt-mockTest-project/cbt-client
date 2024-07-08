import { Drawer } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { DrawerProps } from 'antd/lib';
import SideNavList from './SideNavList';

interface MobileDrawerProps extends DrawerProps {}

const MobileDrawer: React.FC<MobileDrawerProps> = (props) => {
  const { ...drawerProps } = props;
  return (
    <StyledDrawer {...drawerProps} title="메뉴" width={200}>
      <SideNavList />
    </StyledDrawer>
  );
};

export default MobileDrawer;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px !important;
    background-color: ${({ theme }) => theme.color('colorBgContainer')};
  }
`;
