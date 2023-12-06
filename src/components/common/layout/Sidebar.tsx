import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import SideNavList from './SideNavList';
import UserAuthBox from './UserAuthBox';
import Link from 'next/link';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';

const SidebarBlock = styled.div`
  max-width: 200px;
  width: 100%;
  background-color: ${palette.containerBackgroundColor};
  min-height: 100vh;
  position: fixed;
  top: 0;
  .sider-logo-image-wrapper {
    position: relative;
    height: 40px;
    margin-left: 16px;
    margin-top: 10px;
    aspect-ratio: 600 /200;
  }
  .side-user-auth-box {
    margin-top: 15px;
  }
  @media (max-width: ${responsive.medium}) {
    display: none;
  }
`;

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <SidebarBlock>
      <div className="sider-logo">
        <Link href="/temp">
          <div className="sider-logo-image-wrapper">
            <Image src="/png/logo02.png" alt="logo" fill />
          </div>
        </Link>
      </div>
      <SideNavList />
      <UserAuthBox className="side-user-auth-box" />
    </SidebarBlock>
  );
};

export default Sidebar;
