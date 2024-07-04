import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const HeaderLayoutBlock = styled.div`
  background-color: ${({ theme }) => theme.color('colorBgContainer')};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color('colorSplit')};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
