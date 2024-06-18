import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { navBottomItems, navItems, navSellerItems } from './layout.constants';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import CustomNavDivider from './CustomNavDivider';
import UserAuthBox from './UserAuthBox';
import AppDownloadInfoModal from './AppDownloadInfoModal';
import { responsive } from '@lib/utils/responsive';
import KakaoOpenChatModal from '../modal/KakaoOpenChatModal';
import OpenChatModal from './OpenChatModal';
import useAuth from '@lib/hooks/useAuth';
import { UserRole } from 'types';
import BugReportModal from './BugReportModal';
import MainViewCount from '@components/main/MainViewCount';

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
  const { isLoggedIn, user, handleCheckLogin } = useAuth();
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
          if (e.key === 'report') {
            if (!handleCheckLogin()) return;
            setIsReportModalOpen(true);
          }
          if (e.key === 'youtube') {
            window.open(
              'https://www.youtube.com/@moducbt',
              '_blank',
              'noopener'
            );
          }
        }}
        style={{ backgroundColor: palette.colorContainerBg }}
        mode="inline"
        items={navBottomItems}
        selectedKeys={[]}
      />
      <CustomNavDivider />
      <UserAuthBox className="side-user-auth-box" />
      {isLoggedIn && [UserRole.Admin].includes(user.role) && (
        <>
          <CustomNavDivider />
          <Menu
            className="side-nav-list"
            onClick={(e) => {
              if (e.key === '/me/admin') {
                router.push(e.key);
                return;
              }
            }}
            style={{ backgroundColor: palette.colorContainerBg }}
            mode="inline"
            items={navSellerItems}
            selectedKeys={[]}
          />
        </>
      )}

      {isAppDownloadModalOpen && (
        <AppDownloadInfoModal
          open={isAppDownloadModalOpen}
          onCancel={() => setIsAppDownloadModalOpen(false)}
        />
      )}
      {isKakaoOpenChatModalOpen && (
        <OpenChatModal
          open={isKakaoOpenChatModalOpen}
          onCancel={() => setIsKakaoOpenChatModalOpen(false)}
        />
      )}
      {isReportModalOpen && (
        <BugReportModal
          open={isReportModalOpen}
          onCancel={() => setIsReportModalOpen(false)}
        />
      )}
    </SideNavListBlock>
  );
};

export default SideNavList;
