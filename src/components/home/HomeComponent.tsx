import React from 'react';
import styled from 'styled-components';
import HomeBanner from './HomeBanner';
import { responsive } from '@lib/utils/responsive';
import HomeFolderList from './HomeFolderList';
import { ExamSource } from 'types';
import BookmarkedFolderList from './folderList/BookmarkedFolderList';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ModuFolderList from './folderList/ModuFolderList';
import EhsFolderList from './folderList/EhsFolderList';
import UserFolderList from './folderList/UserFolderList';

const HomeComponentBlock = styled.div`
  width: 100%;

  .home-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    padding: 20px 30px 30px 30px;
    .home-folder-search-input-and-radio {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 10px;
      align-items: center;
      .home-folder-search-form {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .home-folder-search-input {
          max-width: 500px;
          text-align: center;
        }
        .home-folder-search-button {
          svg {
            font-size: 18px;
          }
        }
      }
    }
  }
  @media (max-width: ${responsive.medium}) {
    .home-wrapper {
      padding: 20px 16px;
      .home-folder-search-input-and-radio {
        width: 100%;

        .home-folder-search-input {
          max-width: 100%;
          width: 100%;
        }
      }
    }
  }
`;

interface HomeComponentProps {}

const HomeComponent: React.FC<HomeComponentProps> = () => {
  return (
    <HomeComponentBlock>
      <HomeBanner />
      <div className="ml-[30px] mt-4 lg:ml-[20px]">
        <Link href="/search-categories">
          <Button type="primary">
            <div className="flex gap-2 items-center">
              암기장 통합검색
              <SearchOutlined />
            </div>
          </Button>
        </Link>
      </div>
      <div className="home-wrapper">
        <ModuFolderList />
        <EhsFolderList />
        <UserFolderList />
        <BookmarkedFolderList />
      </div>
    </HomeComponentBlock>
  );
};

export default HomeComponent;
