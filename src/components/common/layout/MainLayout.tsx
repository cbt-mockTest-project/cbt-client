import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import MobileHeader from './MobileHeader';
import Footer from './Footer';

const MainLayoutBlock = styled.div`
  overflow-y: auto;
  color: ${palette.colorText};
  .main-layout-wrapper {
    display: flex;
    position: relative;
  }
  .main-layout-body {
    margin-left: 200px;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: ${palette.colorBg};
  }
  .main-layout-body-wrapper {
    max-width: 1200px;
    border: 1px solid ${palette.colorBorder};
    border-radius: 5px;
    background-color: ${palette.colorBgContainer};
    height: 100%;
    width: 100%;
  }
  @media (max-width: ${responsive.medium}) {
    flex-direction: column;
    .main-layout-body {
      margin-left: 0px;
      padding: 0px;
      min-height: calc(100 * 1vh - 60px);
    }
    .main-layout-body-wrapper {
      min-height: calc(100 * 1vh - 60px);
    }
  }
`;

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = '',
  title = '모두CBT',
}) => {
  return (
    <MainLayoutBlock className={className}>
      <MobileHeader title={title} />
      <div className="main-layout-wrapper">
        <Sidebar />
        <div className="main-layout-body">
          <div className="main-layout-body-wrapper">{children}</div>
        </div>
      </div>
      <Footer className="layout-pc-footer" />
    </MainLayoutBlock>
  );
};

export default MainLayout;
