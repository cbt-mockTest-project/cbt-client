import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import { navItems } from './layout.constants';
import { useRouter } from 'next/router';
import { Menu } from 'antd';

const SideNavListBlock = styled.ul``;

interface SideNavListProps {}

const SideNavList: React.FC<SideNavListProps> = () => {
  const router = useRouter();

  return (
    <SideNavListBlock>
      <Menu
        onClick={(e) => {
          if (e.key.toString() === router.pathname) return;
          router.push(e.key.toString());
        }}
        selectedKeys={[router.pathname]}
        style={{ backgroundColor: palette.containerBackgroundColor }}
        mode="inline"
        theme="dark"
        items={navItems}
      />
    </SideNavListBlock>
  );
};

export default SideNavList;
