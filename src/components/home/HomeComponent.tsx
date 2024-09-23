import React from 'react';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { Spin } from 'antd';
import EhsFolderList from './folderList/EhsFolderList';
import dynamic from 'next/dynamic';

import HomeSearchBanner from './HomeSearchBanner';
import { useRouter } from 'next/router';
import HomeSearchResult from './HomeSearchResult';
import PopularFolderList from './folderList/PopularFolderList';

const BookmarkedFolderList = dynamic(
  () => import('./folderList/BookmarkedFolderList'),
  {
    loading: () => <Spin size="large" />,
  }
);

const HomeComponentBlock = styled.div`
  width: 100%;
  .home-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    padding: 0px 30px 30px 30px;
    height: 900px;
  }
  @media (max-width: ${responsive.medium}) {
    .home-wrapper {
      padding: 0px 16px;
    }
  }
`;

interface HomeComponentProps {}

const HomeComponent: React.FC<HomeComponentProps> = () => {
  const router = useRouter();
  const isSearchTab = !!router.query.q;
  return (
    <HomeComponentBlock>
      <HomeSearchBanner />
      {isSearchTab ? (
        <HomeSearchResult />
      ) : (
        <div className="home-wrapper">
          <PopularFolderList />
          <EhsFolderList />
          <BookmarkedFolderList />
        </div>
      )}
    </HomeComponentBlock>
  );
};

export default HomeComponent;
