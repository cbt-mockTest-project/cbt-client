import React from 'react';
import styled, { css } from 'styled-components';
import Sidebar from './Sidebar';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import MobileHeader from './MobileHeader';
import Footer from './Footer';

const MainLayoutBlock = styled.div<{ type: 'default' | 'clean' }>`
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
    ${(props) =>
      props.type === 'default' &&
      css`
        border: 1px solid ${palette.colorBorderLight};
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.085);
      `}
    min-height: 750px;
    border-radius: 5px;
    background-color: ${palette.colorContainerBg};
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
    </MainLayoutBlock>
  );
};

export default MainLayout;
