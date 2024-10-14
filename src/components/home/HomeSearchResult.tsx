import GoogleAd from '@components/common/ad/GoogleAd';
import CategoryFolderListItem from '@components/common/category/CategoryFolderListItem';
import { searchCategoriesQueryOption } from '@lib/queryOptions/searchCategoriesQueryOption';
import { responsive } from '@lib/utils/responsive';
import { useQuery } from '@tanstack/react-query';
import { Dropdown, Pagination, Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';

const HomeSearchResultBlock = styled.div`
  padding: 20px 30px;

  .home-search-result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .home-search-result-title {
      font-size: 20px;
      font-weight: 700;
    }

    .home-search-result-sort {
      width: 100px;
    }
  }

  .home-search-result-categories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    @media (max-width: ${responsive.medium}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${responsive.small}) {
      grid-template-columns: repeat(1, 1fr);
    }

    .home-search-result-category {
      width: 100%;
    }
  }
  .home-search-result-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  @media (max-width: ${responsive.medium}) {
    padding: 16px;
  }
`;

interface HomeSearchResultProps {}

const HomeSearchResult: React.FC<HomeSearchResultProps> = () => {
  const router = useRouter();
  const keyword = router.query.q;
  const page = router.query.page || '1';
  const sort = router.query.sort || 'popular';
  const { data: searchResult } = useQuery(
    searchCategoriesQueryOption({
      queryKey: [
        'searchCategories',
        keyword as string,
        page as string,
        sort as string,
      ],
      input: {
        keyword: keyword as string,
        limit: 12,
        page: Number(page),
        isPublic: true,
        hasExamCount: true,
        sort: sort as 'popular' | 'recent',
      },
    })
  );
  return (
    <HomeSearchResultBlock>
      <div className="home-search-result-header">
        <div className="home-search-result-title">{`"${keyword}" 검색결과`}</div>
        <Select
          className="home-search-result-sort"
          defaultValue={sort}
          onChange={(value) => {
            router.push({
              query: { ...router.query, sort: value, page: '1' },
            });
          }}
          options={[
            {
              value: 'popular',
              label: '인기순',
            },
            {
              value: 'recent',
              label: '최신순',
            },
          ]}
        />
      </div>
      <GoogleAd />
      <div className="home-search-result-categories">
        {searchResult?.categories.map((category) => (
          <CategoryFolderListItem
            className="home-search-result-category"
            category={category as MockExamCategory}
            key={category.id}
          />
        ))}
      </div>
      <div className="home-search-result-pagination">
        {searchResult?.totalCount > 12 && (
          <Pagination
            total={searchResult?.totalCount}
            pageSize={12}
            current={Number(page)}
            onChange={(page) => {
              router.push({
                query: { ...router.query, page },
              });
            }}
          />
        )}
      </div>
    </HomeSearchResultBlock>
  );
};

export default HomeSearchResult;
