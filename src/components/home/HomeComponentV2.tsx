import React from 'react';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { Spin } from 'antd';
import ModuFolderList from './folderList/ModuFolderList';
import EhsFolderList from './folderList/EhsFolderList';
import dynamic from 'next/dynamic';

import HomeSearchBanner from './HomeSearchBanner';
import { useRouter } from 'next/router';
import HomeSearchResult from './HomeSearchResult';
const UserFolderList = dynamic(() => import('./folderList/UserFolderList'), {
  loading: () => <Spin size="large" />,
});
const BookmarkedFolderList = dynamic(
  () => import('./folderList/BookmarkedFolderList'),
  {
    loading: () => <Spin size="large" />,
  }
);

const HomeComponentV2Block = styled.div`
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

interface HomeComponentV2Props {}

const HomeComponentV2: React.FC<HomeComponentV2Props> = () => {
  const router = useRouter();
  const isSearchTab = !!router.query.q;
  return (
    <HomeComponentV2Block>
      <HomeSearchBanner />
     {isSearchTab ?<HomeSearchResult/> : <div className="home-wrapper">
        <ModuFolderList />
        <EhsFolderList />
        <UserFolderList />
        <BookmarkedFolderList />
      </div>}
    </HomeComponentV2Block>
  );
};

export default HomeComponentV2;
