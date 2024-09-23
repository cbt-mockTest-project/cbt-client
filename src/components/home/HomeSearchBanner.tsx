import { searchCategories } from '@lib/queryOptions/searchCategoriesQueryOption';
import { responsive } from '@lib/utils/responsive';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import HomeSearchOption from './HomeSearchOption';
import { MockExamCategory } from 'types';
import { useRouter } from 'next/router';
import HomeSearch from './HomeSearch';

const HomeSearchBannerBlock = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

  @media (max-width: ${responsive.medium}) {
    padding: 0 20px;
  }
  .home-search-banner-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    max-width: 400px;
    .home-search-banner-title {
      font-size: 20px;
      color: #fff;
      @media (max-width: ${responsive.medium}) {
        font-size: 18px;
      }
    }
    .home-search-banner-input {
      width: 100%;
    }
  }
`;

interface HomeSearchBannerProps {}

const HomeSearchBanner: React.FC<HomeSearchBannerProps> = () => {
  return (
    <HomeSearchBannerBlock>
      <div className="home-search-banner-wrapper">
        <div className="home-search-banner-title">
          효율적인 학습을 추구합니다
        </div>
        <HomeSearch />
      </div>
    </HomeSearchBannerBlock>
  );
};

export default HomeSearchBanner;
