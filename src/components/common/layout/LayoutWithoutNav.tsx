import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const LayoutWithoutNavBlock = styled.div``;

interface LayoutWithoutNavProps {
  children: React.ReactNode;
}

const LayoutWithoutNav: React.FC<LayoutWithoutNavProps> = ({ children }) => {
  return (
    <LayoutWithoutNavBlock>
      <div className="layout-without-nav-body">{children}</div>
    </LayoutWithoutNavBlock>
  );
};

export default LayoutWithoutNav;
