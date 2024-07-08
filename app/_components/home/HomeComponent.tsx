import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { responsive } from '../../_lib/utils/responsive';
import { Button, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ModuFolderList from './folderList/ModuFolderList';
import EhsFolderList from './folderList/EhsFolderList';
import dynamic from 'next/dynamic';
import UserFolderList from './folderList/UserFolderList';
import BookmarkedFolderList from './folderList/BookmarkedFolderList';
import HomeBanner from './HomeBanner';

const HomeComponentBlock = styled.div`
  width: 100%;
  .banner-skeletoon {
    width: 100% !important;
    height: 100% !important;
  }
  .home-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    padding: 20px 30px 30px 30px;
    height: 900px;
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
  const [isLazyLoadingComponentVisible, setIsLazyLoadingComponentVisible] =
    useState(false);

  useEffect(() => {
    setIsLazyLoadingComponentVisible(true);
  }, []);
  return (
    <HomeComponentBlock>
      {isLazyLoadingComponentVisible ? (
        <HomeBanner />
      ) : (
        <Skeleton.Button
          active
          className="banner-skeletoon aspect-[1024/180] w-full lg:aspect-[2000/650] h-full"
        />
      )}
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
        {isLazyLoadingComponentVisible && <UserFolderList />}
        {isLazyLoadingComponentVisible && <BookmarkedFolderList />}
      </div>
    </HomeComponentBlock>
  );
};

export default HomeComponent;
