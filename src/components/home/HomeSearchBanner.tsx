import {
  searchCategories,
  searchCategoriesQueryOption,
} from '@lib/queryOptions/searchCategoriesQueryOption';
import { responsive } from '@lib/utils/responsive';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Input } from 'antd';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import HomeSearchOption from './HomeSearchOption';
import { MockExamCategory } from 'types';
import { useRouter } from 'next/router';
import { SearchOutlined } from '@ant-design/icons';

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
  const router = useRouter();
  const [options, setOptions] = useState<any[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const handleSearch = async (value: string) => {
    const result = await searchCategories({
      keyword: value,
      isPublic: true,
      limit: 10,
      page: 1,
    });
    setOptions(
      result.map((item) => ({
        value: item.urlSlug,
        label: <HomeSearchOption mockExamCategory={item as MockExamCategory} />,
      }))
    );
  };

  const debouncedSearch = debounce(handleSearch, 400);

  return (
    <HomeSearchBannerBlock>
      <div className="home-search-banner-wrapper">
        <div className="home-search-banner-title">
          효율적인 학습을 추구합니다
        </div>
        <AutoComplete
          className="home-search-banner-input"
          options={options}
          onSelect={(value) => router.push(`/category/${value}`)}
          onDropdownVisibleChange={setIsDropdownVisible}
          onChange={debouncedSearch}
          placeholder="암기장을 검색해보세요"
        >
          <Input.Search
            size="large"
            onSearch={(value, event) => {
              if (event.target instanceof HTMLInputElement) {
                if (
                  value.trim() &&
                  (!isDropdownVisible || options.length === 0)
                ) {
                  router.push({
                    query: {
                      q: value,
                    },
                  });
                  return;
                }
              } else {
                router.push({
                  query: {
                    q: value,
                  },
                });
              }
            }}
          />
        </AutoComplete>
      </div>
    </HomeSearchBannerBlock>
  );
};

export default HomeSearchBanner;
