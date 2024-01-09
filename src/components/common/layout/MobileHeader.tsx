import React, { useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import MobileDrawer from './MobileDrawer';
import Link from 'next/link';

const MobileHeaderBlock = styled.div`
  display: none;
  @media (max-width: ${responsive.medium}) {
    position: sticky;
    top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${palette.colorContainerBg};
    border-bottom: 1px solid ${palette.colorBorder};
    z-index: 500;
    height: 57px;
    width: 100vw;
    padding: 0px 16px;
    .mobile-menu-button {
      color: ${palette.colorText};
    }
    .mobile-header-title {
      font-size: 16px;
      font-weight: 700;
    }
  }
`;
interface MobileHeaderProps {
  title: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  const [menuState, setMenuState] = useState(false);
  return (
    <MobileHeaderBlock>
      <Link href="/">
        <p className="mobile-header-title">{title}</p>
      </Link>
      <button className="mobile-menu-button" onClick={() => setMenuState(true)}>
        <MenuIcon />
      </button>
      <MobileDrawer open={menuState} onClose={() => setMenuState(false)} />
    </MobileHeaderBlock>
  );
};

export default MobileHeader;
