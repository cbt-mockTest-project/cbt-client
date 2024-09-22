import CategoryFolderListItem from '@components/moduStorage/CategoryFolderListItem';
import { searchCategoriesQueryOption } from '@lib/queryOptions/searchCategoriesQueryOption';
import { responsive } from '@lib/utils/responsive';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { MockExamCategory } from 'types';

const HomeSearchResultBlock = styled.div`
  padding: 20px 30px;
  .home-search-result-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
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
  @media (max-width: ${responsive.medium}) {
    padding: 16px;
  }
`;

interface HomeSearchResultProps {}

const HomeSearchResult: React.FC<HomeSearchResultProps> = () => {
  const router = useRouter();
  const keyword = router.query.q;
  const { data: searchResult } = useQuery(
    searchCategoriesQueryOption({
      queryKey: ['searchCategories', keyword as string],
      input: {
        keyword: keyword as string,
        limit: 30,
        page: 1,
        isPublic: true,
        hasExamCount: true,
      },
    })
  );
  return (
    <HomeSearchResultBlock>
      <div className="home-search-result-title">{`"${keyword}" 검색결과`}</div>
      <div className="home-search-result-categories">
        {searchResult?.map((category) => (
          <CategoryFolderListItem
            className="home-search-result-category"
            category={category as MockExamCategory}
            key={category.id}
          />
        ))}
      </div>
    </HomeSearchResultBlock>
  );
};

export default HomeSearchResult;
