import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { navBottomItems, navItems } from './layout.constants';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import CustomNavDivider from './CustomNavDivider';
import UserAuthBox from './UserAuthBox';
import AppDownloadInfoModal from './AppDownloadInfoModal';
import { responsive } from '@lib/utils/responsive';
import KakaoOpenChatModal from '../modal/KakaoOpenChatModal';
import OpenChatModal from './OpenChatModal';
import useAuth from '@lib/hooks/useAuth';

const SideNavListBlock = styled.ul`
  .side-nav-list {
    .ant-menu-item {
      height: 36px;
    }
  }
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
  const { isLoggedIn } = useAuth();
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false);
  const [isKakaoOpenChatModalOpen, setIsKakaoOpenChatModalOpen] =
    useState(false);
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
      <CustomNavDivider />

      <Menu
        className="side-nav-list"
        onClick={(e) => {
          if (e.key === 'app-download') {
            setIsAppDownloadModalOpen(true);
            return;
          }
          if (e.key === 'open-chat') {
            setIsKakaoOpenChatModalOpen(true);
            return;
          }
          if (e.key === '/pricing') {
            router.push(e.key);
            return;
          }
        }}
        style={{ backgroundColor: palette.colorContainerBg }}
        mode="inline"
        items={navBottomItems}
        selectedKeys={[]}
      />
      <CustomNavDivider />

      <UserAuthBox className="side-user-auth-box" />
      <AppDownloadInfoModal
        open={isAppDownloadModalOpen}
        onCancel={() => setIsAppDownloadModalOpen(false)}
      />
      <OpenChatModal
        open={isKakaoOpenChatModalOpen}
        onCancel={() => setIsKakaoOpenChatModalOpen(false)}
      />
    </SideNavListBlock>
  );
};

export default SideNavList;
