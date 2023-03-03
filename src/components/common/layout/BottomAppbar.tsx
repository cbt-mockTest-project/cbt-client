import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import palette from '@styles/palette';
import { useRouter } from 'next/router';

interface BottomAppbarProps {
  className: string;
}

const BottomAppbar: React.FC<BottomAppbarProps> = ({ className }) => {
  const router = useRouter();
  const isBookmarkPage = router.pathname === '/me/bookmark';
  const isMypage = router.pathname === '/me/edit';
  const isMainPage = !isMypage && !isBookmarkPage;
  return (
    <BottomAppbarContainer className={className}>
      <Link href="/" className="bottom-app-bar-item">
        <HomeIcon className={`${isMainPage && 'active'}`} />
        <span className={`bottom-app-bar-item-text ${isMainPage && 'active'}`}>
          홈
        </span>
      </Link>
      <Link href="/me/bookmark" className="bottom-app-bar-item">
        <StarIcon className={`${isBookmarkPage && 'active'}`} />
        <span
          className={`bottom-app-bar-item-text ${isBookmarkPage && 'active'}`}
        >
          북마크
        </span>
      </Link>
      <Link href="/me/edit" className="bottom-app-bar-item">
        <PersonIcon className={`${isMypage && 'active'}`} />
        <span className={`bottom-app-bar-item-text ${isMypage && 'active'}`}>
          프로필
        </span>
      </Link>
    </BottomAppbarContainer>
  );
};

export default BottomAppbar;

const BottomAppbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 4px;
  .bottom-app-bar-item {
    flex: 1;
    text-align: center;
    height: 70px;
    display: flex;
    gap: 3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    :hover {
      color: ${palette.antd_blue_01};
    }
    .active {
      color: ${palette.antd_blue_01};
    }
  }
  .bottom-app-bar-item-text {
    font-size: 0.7rem;
  }
`;
