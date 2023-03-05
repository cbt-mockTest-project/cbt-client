import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { LocalStorage } from '@lib/utils/localStorage';
import { homeRouteStackKey } from '@lib/constants';

interface BottomAppbarProps {
  className: string;
}

const BottomAppbar: React.FC<BottomAppbarProps> = ({ className }) => {
  const { data: meQuery } = useMeQuery();
  const localStorage = new LocalStorage();
  const router = useRouter();
  const authRoutes = ['/me/bookmark', '/me/edit'];
  const isBookmarkPage = router.pathname === '/me/bookmark';
  const isMypage = router.pathname === '/me/edit';
  const isMainPage = !isMypage && !isBookmarkPage;
  const onRouteChange = (path: string) => {
    if (!meQuery?.me.user && authRoutes.includes(path)) {
      return router.push('/mobile/login');
    }
    return router.push(path);
  };
  const onHomeRouteHandler = () => {
    const homeRouteStack = localStorage.get(homeRouteStackKey);
    if (homeRouteStack) {
      const beforeHomeRoute = homeRouteStack.pop();
      if (beforeHomeRoute && beforeHomeRoute.path && beforeHomeRoute.scrollY)
        router.push(beforeHomeRoute.path).then(() => {
          window.scrollTo({ top: beforeHomeRoute.scrollY });
        });
      return;
    }
    return router.push('/');
  };
  return (
    <BottomAppbarContainer className={className}>
      <button onClick={onHomeRouteHandler} className="bottom-app-bar-item">
        <HomeIcon className={`${isMainPage && 'active'}`} />
        <span className={`bottom-app-bar-item-text ${isMainPage && 'active'}`}>
          홈
        </span>
      </button>
      <button
        onClick={() => onRouteChange('/me/bookmark')}
        className="bottom-app-bar-item"
      >
        <StarIcon className={`${isBookmarkPage && 'active'}`} />
        <span
          className={`bottom-app-bar-item-text ${isBookmarkPage && 'active'}`}
        >
          북마크
        </span>
      </button>
      <button
        onClick={() => onRouteChange('/me/edit')}
        className="bottom-app-bar-item"
      >
        <PersonIcon className={`${isMypage && 'active'}`} />
        <span className={`bottom-app-bar-item-text ${isMypage && 'active'}`}>
          프로필
        </span>
      </button>
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
    height: 55px;
    display: flex;
    gap: 3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .active {
      color: ${palette.antd_blue_01};
    }
  }
  .bottom-app-bar-item-text {
    font-size: 0.7rem;
  }
`;
