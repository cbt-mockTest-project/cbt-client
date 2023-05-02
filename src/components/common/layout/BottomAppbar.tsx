import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import CategoryIcon from '@mui/icons-material/Category';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { LocalStorage } from '@lib/utils/localStorage';
import { homeRouteStackKey } from '@lib/constants';
import { checkUrl } from '@lib/utils/utils';
import {
  checkCommunityPage,
  checkHomePage,
  checkProfilePage,
  checkRecordPage,
  profileRoutes,
  recordRoutes,
} from '@lib/constants/routes';

interface BottomAppbarProps {
  className: string;
}

const BottomAppbar: React.FC<BottomAppbarProps> = ({ className }) => {
  const { data: meQuery } = useMeQuery();
  const localStorage = new LocalStorage();
  const router = useRouter();
  const authRoutes = recordRoutes.concat(profileRoutes);
  const isRecordPage = checkRecordPage(router.asPath);
  const isProfilePage = checkProfilePage(router.asPath);
  const isCommunityPage = checkCommunityPage(router.asPath);
  const isHome = checkHomePage(router.asPath);
  const onRouteChange = (path: string) => {
    if (!meQuery?.me.user && checkUrl({ url: path, allowUrls: authRoutes })) {
      return router.push('/mobile/login');
    }
    return router.push(path);
  };
  const onHomeRouteHandler = () => {
    try {
      if (isHome) return;
      const homeRouteStack = localStorage.get(homeRouteStackKey);
      if (homeRouteStack) {
        const beforeHomeRoute = homeRouteStack.pop();
        if (beforeHomeRoute) {
          router.push(beforeHomeRoute.path).then(() => {
            window.scrollTo({ top: beforeHomeRoute.scrollY });
          });
          return;
        }
      }
      return router.push('/');
    } catch {
      return router.push('/');
    }
  };
  return (
    <BottomAppbarContainer className={className}>
      <button onClick={onHomeRouteHandler} className="bottom-app-bar-item">
        <HomeIcon className={`${isHome && 'active'}`} />
        <span className={`bottom-app-bar-item-text ${isHome && 'active'}`}>
          홈
        </span>
      </button>
      <button
        onClick={() => onRouteChange('/me/bookmark')}
        className="bottom-app-bar-item"
      >
        <StarIcon className={`${isRecordPage && 'active'}`} />
        <span
          className={`bottom-app-bar-item-text ${isRecordPage && 'active'}`}
        >
          기록
        </span>
      </button>
      <button
        onClick={() => onRouteChange('/community?c=SUGGENSTION')}
        className="bottom-app-bar-item"
      >
        <ForumIcon className={`${isCommunityPage && 'active'}`} />
        <span
          className={`bottom-app-bar-item-text ${isCommunityPage && 'active'}`}
        >
          게시판
        </span>
      </button>
      <button
        onClick={() => onRouteChange('/me/edit')}
        className="bottom-app-bar-item"
      >
        <PersonIcon className={`${isProfilePage && 'active'}`} />
        <span
          className={`bottom-app-bar-item-text ${isProfilePage && 'active'}`}
        >
          프로필
        </span>
      </button>
    </BottomAppbarContainer>
  );
};

export default BottomAppbar;

const BottomAppbarContainer = styled.div`
  @keyframes tabAnimation {
    50% {
      width: 100%;
    }
    100% {
      opacity: 0;
      width: 0%;
    }
  }

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
    position: relative;
    ::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 0;
      background-color: ${palette.blue_200};
      opacity: 0;
      border-radius: 50px;
      transition: all 0.3s;
    }
    :hover {
      ::before {
        animation: tabAnimation 0.6s;
        opacity: 0.3;
      }
    }
  }

  .bottom-app-bar-item-text {
    font-size: 0.7rem;
  }
`;
