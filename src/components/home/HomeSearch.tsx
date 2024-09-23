import { searchCategories } from '@lib/queryOptions/searchCategoriesQueryOption';
import { AutoComplete, Input } from 'antd';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import HomeSearchOption from './HomeSearchOption';
import { MockExamCategory } from 'types';
import { useRouter } from 'next/router';

const HomeSearchBlock = styled.div`
  width: 100%;
  .home-search-banner-input {
    width: 100%;
  }
`;

interface HomeSearchProps {}

const HomeSearch: React.FC<HomeSearchProps> = () => {
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
      result.categories.map((item) => ({
        value: item.urlSlug,
        label: <HomeSearchOption mockExamCategory={item as MockExamCategory} />,
      }))
    );
  };

  const debouncedSearch = debounce(handleSearch, 400);
  return (
    <HomeSearchBlock>
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
    </HomeSearchBlock>
  );
};

export default HomeSearch;
