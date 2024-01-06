import React, { useEffect } from 'react';
import styled from 'styled-components';
import HomeBanner from './HomeBanner';
import { Input, InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { responsive } from '@lib/utils/responsive';
import { useAppSelector } from '@modules/redux/store/configureStore';
import HomeFolderList from './HomeFolderList';
import { useLazyGetExamCategories } from '@lib/graphql/hook/useExam';
import { useRouter } from 'next/router';
import HomeSearchedFolderList from './HomeSearchedFolderList';
import { MockExamCategory } from 'types';

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
    .home-folder-search-input {
      max-width: 500px;
      text-align: center;
    }
  }
  @media (max-width: ${responsive.medium}) {
    .home-wrapper {
      padding: 20px 16px;
    }
  }
`;

interface HomeComponentProps {}

const HomeComponent: React.FC<HomeComponentProps> = () => {
  const router = useRouter();
  const [getExamCategories, { data: searchedCategoriesResponse }] =
    useLazyGetExamCategories();
  const searchInputRef = React.useRef<InputRef>(null);
  const searchedCategories =
    searchedCategoriesResponse?.getExamCategories.categories || [];

  const keyword = router.query.keyword;
  const moduStorageCategories = useAppSelector(
    (state) => state.home.moduStorageCategories
  );
  const userStorageCategories = useAppSelector(
    (state) => state.home.userStorageCategories
  );
  useEffect(() => {
    if (typeof keyword !== 'string') return;
    getExamCategories({
      variables: {
        input: {
          limit: 30,
          isPublicOnly: true,
          keyword,
        },
      },
    });
  }, [keyword]);
  const handleSearch = (value: string) => {
    router.push({
      pathname: '/',
      query: {
        keyword: value,
      },
    });
  };
  return (
    <HomeComponentBlock>
      <HomeBanner />
      <div className="home-wrapper">
        <Input
          ref={searchInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              handleSearch(searchInputRef.current.input.value);
          }}
          className="home-folder-search-input"
          placeholder="학습하고 싶은 과목을 검색해보세요."
          suffix={
            <SearchOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => handleSearch(searchInputRef.current.input.value)}
            />
          }
          size="large"
        />
        {typeof keyword === 'string' && keyword ? (
          <HomeSearchedFolderList
            keyword={keyword}
            categories={searchedCategories as MockExamCategory[]}
          />
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
              title="유저가 만든 공개 암기장 📂"
              subTitle="유저들이 만든 공개 암기장으로 학습해보세요."
              link="/user-storage"
              categories={userStorageCategories}
              unikeyKey="user-storage"
            />
          </>
        )}
      </div>
    </HomeComponentBlock>
  );
};

export default HomeComponent;
