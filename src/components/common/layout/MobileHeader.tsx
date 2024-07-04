import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import MobileDrawer from './MobileDrawer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MobileHeaderBlock = styled.div`
  display: none;
  @media (max-width: ${responsive.medium}) {
    position: sticky;
    top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.color('colorBgContainer')};
    border-bottom: 1px solid ${({ theme }) => theme.color('colorBorder')};
    z-index: 500;
    height: 57px;
    width: 100vw;
    padding: 0px 16px;
    .mobile-menu-button {
      color: ${({ theme }) => theme.color('colorText')};
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
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  useEffect(() => {
    if (!menuState) return;
    setMenuState(false);
  }, [router.pathname]);
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
