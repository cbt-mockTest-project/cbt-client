import React from 'react';
import styled from 'styled-components';
import HomeBanner from './HomeBanner';
import { responsive } from '@lib/utils/responsive';
import HomeFolderList from './HomeFolderList';
import { ExamSource } from 'types';
import BookmarkedFolderList from './BookmarkedFolderList';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';

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
        <HomeFolderList
          key="modu-storage"
          title="모두CBT 공식 암기장 👀"
          subTitle="실기 시험을 효율적으로 준비해보세요."
          link="/modu-storage"
          unikeyKey="modu-storage"
          type={ExamSource.MoudCbt}
        />
        <HomeFolderList
          key="ehs-storage"
          title="직8딴 암기장(기출문제 중복소거) 📒"
          subTitle="직8딴 시리즈를 모두CBT에서 학습해보세요."
          link="/ehs-storage"
          unikeyKey="modu-storage"
          type={ExamSource.EhsMaster}
        />
        <HomeFolderList
          key="user-storage"
          title="유저 공유 암기장 📂"
          subTitle="유저들이 만든 공개 암기장으로 학습해보세요."
          link="/user-storage"
          unikeyKey="user-storage"
          type={ExamSource.User}
        />
        <BookmarkedFolderList
          key="bookmarked-storage"
          title="저장된 암기장 📌"
          subTitle="저장된 암기장을 모아보세요."
        />
      </div>
    </HomeComponentBlock>
  );
};

export default HomeComponent;
