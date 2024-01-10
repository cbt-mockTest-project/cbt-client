import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import HistoryIcon from '@mui/icons-material/History';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import { responsive } from '@lib/utils/responsive';
import { useRouter } from 'next/router';

const MobileBottomAppbarBlock = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  z-index: 100;
  border-top: 1px solid #eaeaea;
  display: none;
  @media (max-width: ${responsive.lsmall}) {
    display: block;
  }
`;

interface MobileBottomAppbarProps {}

const MobileBottomAppbar: React.FC<MobileBottomAppbarProps> = () => {
  const router = useRouter();
  return (
    <MobileBottomAppbarBlock>
      <BottomNavigation
        showLabels
        value={router.pathname}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
      >
        <BottomNavigationAction value={'/'} label="홈" icon={<HomeIcon />} />
        <BottomNavigationAction
          value={'/me/storage'}
          label="내 암기장"
          icon={<FolderIcon />}
        />
        <BottomNavigationAction
          value={'/me/history'}
          label="기록"
          icon={<HistoryIcon />}
        />
      </BottomNavigation>
    </MobileBottomAppbarBlock>
  );
};

export default MobileBottomAppbar;
