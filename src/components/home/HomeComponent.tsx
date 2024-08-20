import React from 'react';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import { App, Button, Spin, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ModuFolderList from './folderList/ModuFolderList';
import EhsFolderList from './folderList/EhsFolderList';
import HomeBanner from './HomeBanner';
import dynamic from 'next/dynamic';
import useAuth from '@lib/hooks/useAuth';
import { useRouter } from 'next/router';
const UserFolderList = dynamic(() => import('./folderList/UserFolderList'), {
  loading: () => <Spin size="large" />,
});
const BookmarkedFolderList = dynamic(
  () => import('./folderList/BookmarkedFolderList'),
  {
    loading: () => <Spin size="large" />,
  }
);

const HomeComponentBlock = styled.div`
  width: 100%;
  .banner-skeletoon {
    width: 100% !important;
    height: 100% !important;
  }
  .home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 30px;
    margin-top: 15px;
    @media (max-width: ${responsive.medium}) {
      margin-left: 20px;
    }
    .home-header-left-buttons {
      display: flex;
      gap: 10px;
      .home-header-left-buttons-search-button {
        display: flex;
        gap: 5px;
        align-items: center;
      }
    }
    .home-header-find-partner-button-wrapper {
      margin-right: 30px;
      @media (max-width: ${responsive.medium}) {
        display: none;
      }
    }
  }
  .home-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    padding: 0px 30px 30px 30px;
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
      padding: 0px 16px;
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
  const router = useRouter();
  const { modal } = App.useApp();
  const { user } = useAuth();
  const onClickFindPartner = () => {
    modal.success({
      title: '협업 제안서를 받아보시겠습니까?',
      content: '모두CBT와 함께 할 파트너를 찾습니다.',
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
      <div className="home-header">
        <div className="home-header-left-buttons">
          <Link href="/search-categories">
            <Button type="primary">
              <div className="home-header-left-buttons-search-button">
                암기장 검색
                <SearchOutlined />
              </div>
            </Button>
          </Link>
          {/* TODO: 객관식고려해서 코드 수정필요 */}
          {user && user.recentlyStudiedCategory && (
            <Tooltip title="최근 공부한 암기장으로 이동합니다.">
              <Button
                onClick={() =>
                  router.push(`/category/${user.recentlyStudiedCategory}`)
                }
                type="dashed"
              >
                빠른 이동
              </Button>
            </Tooltip>
          )}
        </div>
        <div className="home-header-find-partner-button-wrapper">
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
