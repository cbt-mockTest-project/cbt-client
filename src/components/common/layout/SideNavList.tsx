import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';
import { navItems } from './layout.constants';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import { responsive } from '@lib/utils/responsive';

const SideNavListBlock = styled.ul`
  @media (max-width: ${responsive.medium}) {
    .side-nav-list {
      .ant-menu-item {
        height: 34px;
      }
    }
  }
`;

interface SideNavListProps {}

const SideNavList: React.FC<SideNavListProps> = () => {
  const router = useRouter();

  return (
    <SideNavListBlock>
      <Menu
        className="side-nav-list"
        onClick={(e) => {
          if (e.key.toString() === router.pathname) return;
          router.push(e.key.toString());
        }}
        selectedKeys={[router.pathname]}
        style={{ backgroundColor: palette.colorContainerBg }}
        mode="inline"
        items={navItems}
      />
    </SideNavListBlock>
  );
};

export default SideNavList;
