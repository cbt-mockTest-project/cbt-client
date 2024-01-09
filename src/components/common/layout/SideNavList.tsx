import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { navItems } from './layout.constants';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import { responsive } from '@lib/utils/responsive';
import AppDownloadInfoModal from './AppDownloadInfoModal';

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
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false);
  return (
    <SideNavListBlock>
      <Menu
        className="side-nav-list"
        onClick={(e) => {
          if (e.key === 'app-download') {
            setIsAppDownloadModalOpen(true);
            return;
          }
          if (e.key.toString() === router.pathname) return;
          router.push(e.key.toString());
        }}
        selectedKeys={[router.pathname]}
        style={{ backgroundColor: palette.colorContainerBg }}
        mode="inline"
        items={navItems}
      />

      {
        <AppDownloadInfoModal
          open={isAppDownloadModalOpen}
          onCancel={() => setIsAppDownloadModalOpen(false)}
        />
      }
    </SideNavListBlock>
  );
};

export default SideNavList;
