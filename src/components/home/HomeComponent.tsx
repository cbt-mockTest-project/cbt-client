import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import HomeBanner from './HomeBanner';
import { responsive } from '@lib/utils/responsive';
import HomeFolderList from './HomeFolderList';
import { useRouter } from 'next/router';
import HomeSearchedFolderList from './HomeSearchedFolderList';
import { ExamSource, MockExamCategory } from 'types';

import useHomeCategories from '@lib/hooks/useHomeCategories';
import useAuth from '@lib/hooks/useAuth';
import { handleError } from '@lib/utils/utils';
import BookmarkedFolderList from './BookmarkedFolderList';

const HomeComponentBlock = styled.div`
  width: 100%;

  .home-wrapper {
    margin-top: 20px;
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
  const router = useRouter();
  const {
    fetchCategories,
    searchedCategories,
    fetchCategoriesLoading,
    moduStorageCategories,
    userStorageCategories,
    ehsStorageCategories,
    handleToggleCategoryBookmark,
  } = useHomeCategories();

  const searchType = useMemo(() => {
    if (router.query.type) return router.query.type;
    return 'folder';
  }, [router.query.type]);
  const keyword = useMemo(() => {
    if (searchType === 'folder') return router.query.f_keyword;
    if (searchType === 'question') return router.query.q_keyword;
  }, [router.query.q_keyword, router.query.f_keyword, searchType]);

  useEffect(() => {
    if (!moduStorageCategories.length) {
      fetchCategories({
        limit: 30,
        examSource: ExamSource.MoudCbt,
        isPublicOnly: true,
      });
    }
    if (!userStorageCategories.length) {
      fetchCategories({
        limit: 30,
        examSource: ExamSource.User,
        isPublicOnly: true,
      });
    }
    if (!ehsStorageCategories.length) {
      fetchCategories({
        limit: 30,
        examSource: ExamSource.EhsMaster,
      });
    }
  }, [moduStorageCategories, userStorageCategories, ehsStorageCategories]);

  useEffect(() => {
    if (typeof keyword !== 'string' || !keyword) return;
    if (searchType === 'folder') {
      fetchCategories({
        limit: 30,
        isPublicOnly: true,
        keyword,
      });
      return;
    }
  }, [keyword]);

  return (
    <HomeComponentBlock>
      <HomeBanner />
      <div className="home-wrapper">
        {typeof keyword === 'string' && keyword ? (
          searchType === 'folder' ? (
            <HomeSearchedFolderList
              keyword={keyword}
              categories={searchedCategories as MockExamCategory[]}
              loading={fetchCategoriesLoading}
              handleToggleBookmark={async (id) => {
                handleToggleCategoryBookmark({
                  categoryId: id,
                  type: 'search',
                  input: { keyword, limit: 30, isPublicOnly: true },
                });
              }}
            />
          ) : (
            <></>
          )
        ) : (
          <>
            <HomeFolderList
              title="국가고시 실기시험 준비하기 👀"
              subTitle="실기 시험을 효율적으로 준비해보세요."
              link="/modu-storage"
              categories={moduStorageCategories}
              unikeyKey="modu-storage"
            />
            <HomeFolderList
              title="직8딴 시리즈(기출문제 중복소거) 📒"
              subTitle="직8딴 시리즈를 모두CBT에서 학습해보세요."
              link="/ehs-storage"
              categories={ehsStorageCategories}
              unikeyKey="modu-storage"
            />
            <HomeFolderList
              title="유저가 만든 공개 암기장 📂"
              subTitle="유저들이 만든 공개 암기장으로 학습해보세요."
              trigger="user-storage"
              categories={userStorageCategories}
              unikeyKey="user-storage"
            />
            <BookmarkedFolderList
              title="북마크한 암기장 📌"
              subTitle="북마크한 암기장을 모아보세요."
            />
          </>
        )}
      </div>
    </HomeComponentBlock>
  );
};

export default HomeComponent;
