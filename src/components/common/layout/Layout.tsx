import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Nav />
      <div className="layout-children-wrapper">{children}</div>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  .layout-children-wrapper {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    margin-top: 45px;
  }
`;
