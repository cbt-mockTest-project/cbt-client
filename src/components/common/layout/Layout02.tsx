import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import palette from '@styles/palette';
import { responsive } from '@lib/utils/responsive';
import MobileHeader from './MobileHeader';

const Layout02Block = styled.div`
  display: flex;
  position: relative;
  overflow-y: auto;
  .layout-body {
    margin-left: 200px;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: ${palette.gray_100};
  }
  .layout-body-wrapper {
    max-width: 1200px;
    background-color: white;
    height: 100%;
    width: 100%;
  }
  @media (max-width: ${responsive.medium}) {
    flex-direction: column;
    .layout-body {
      margin-left: 0px;
      padding: 0px;
      min-height: calc(100 * 1vh - 60px);
    }
    .layout-body-wrapper {
      min-height: calc(100 * 1vh - 60px);
    }
  }
`;

interface Layout02Props {
  children: React.ReactNode;
  title?: string;
}

const Layout02: React.FC<Layout02Props> = ({ children, title = '모두CBT' }) => {
  return (
    <Layout02Block>
      <MobileHeader title={title} />
      <Sidebar />
      <div className="layout-body">
        <div className="layout-body-wrapper">{children}</div>
      </div>
    </Layout02Block>
  );
};

export default Layout02;
