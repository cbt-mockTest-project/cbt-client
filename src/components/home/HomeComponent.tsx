import React from 'react';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { App, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ModuFolderList from './folderList/ModuFolderList';
import EhsFolderList from './folderList/EhsFolderList';
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
  const { modal } = App.useApp();
  const onClickFindPartner = () => {
    modal.success({
      title: '협업 제안서를 받아보시겠습니까?',
      content: '실기시험 시장을 혁신할 파트너를 찾습니다.',
      okText: '제안서 보기',
      onOk: () => {
        window.open(
          'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/proposal/%E1%84%86%E1%85%A9%E1%84%83%E1%85%AECBT_%E1%84%92%E1%85%A7%E1%86%B8%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A5.pdf',
          '_blank',
          'noreferrer'
        );
      },
      closable: true,
      cancelText: '아니오',
    });
  };
  return (
    <HomeComponentBlock>
      <HomeBanner />

      <div className="ml-[30px] mt-4 lg:ml-[20px] flex justify-between items-center">
        <Link href="/search-categories">
          <Button type="primary">
            <div className="flex gap-2 items-center">
              암기장 검색
              <SearchOutlined />
            </div>
          </Button>
        </Link>
        <div className="md:hidden mr-[30px] ">
          <Button
            type="text"
            className="underline"
            onClick={onClickFindPartner}
          >
            협업 파트너를 찾습니다.
          </Button>
        </div>
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
