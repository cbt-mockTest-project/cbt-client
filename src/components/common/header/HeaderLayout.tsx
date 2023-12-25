import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const HeaderLayoutBlock = styled.div`
  background-color: ${palette.colorContainerBg};
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 10;
  border-bottom: 1px solid ${palette.colorBorder};
  .header-layout-inner {
    height: 57px;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: ${palette.gray_900};
    padding: 0 20px;
    justify-content: center;
    position: relative;
  }
  @media (max-width: ${responsive.medium}) {
    .header-layout-inner {
      padding: 0 10px;
    }
  }
`;

interface HeaderLayoutProps {
  children: React.ReactNode;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <HeaderLayoutBlock>
      <div className="header-layout-inner">{children}</div>
    </HeaderLayoutBlock>
  );
};

export default HeaderLayout;
