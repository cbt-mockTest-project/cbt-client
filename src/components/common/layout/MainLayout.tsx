import React from 'react';
import styled, { css } from 'styled-components';
import Sidebar from './Sidebar';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import MobileHeader from './MobileHeader';
import Footer from './Footer';
import MobileBottomAppbar from './MobileBottomAppbar';

const MainLayoutBlock = styled.div<{ type: 'default' | 'clean' }>`
  overflow-y: auto;
  overflow-x: hidden;
  color: ${({ theme }) => theme.color('colorText')};
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
    background-color: ${({ theme }) => theme.color('colorBgLayout')};
  }
  .main-layout-body-wrapper {
    max-width: 1200px;
    ${(props) =>
      props.type === 'default' &&
      css`
        border: 1px solid ${({ theme }) => theme.color('colorSplit')};
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.085);
      `}
    min-height: 750px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color('colorBgContainer')};
    height: 100%;
    width: 100%;
  }
  @media (max-width: ${responsive.medium}) {
    flex-direction: column;
    height: 100vh;
    .main-layout-body-wrapper {
      min-height: calc(100 * 1vh - 116px);
      margin-bottom: 56px;
    }
    .main-layout-body {
      margin-left: 0px;
      padding: 0px;
      min-height: calc(100 * 1vh - 116px);
    }
  }
`;

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  type?: 'default' | 'clean';
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = '',
  title = '모두CBT',
  type = 'default',
}) => {
  return (
    <MainLayoutBlock className={className} type={type}>
      <MobileHeader title={title} />
      <div className="main-layout-wrapper">
        <Sidebar />
        <div className="main-layout-body">
          <div className="main-layout-body-wrapper">{children}</div>
          <Footer className="layout-pc-footer" />
        </div>
      </div>
      <MobileBottomAppbar />
    </MainLayoutBlock>
  );
};

export default MainLayout;
