import CategoryFolderList from '../moduStorage/CategoryFolderList';
import useStorage from '../../_lib/hooks/useStorage';
import { handleError } from '../../_lib/utils/utils';
import { Empty, Input, Pagination, Skeleton } from 'antd';
import { StorageType } from '../../customTypes';
import React, { useState } from 'react';
import styled from 'styled-components';

const LIMIT = 10;

const SearchCategoriesComponentBlock = styled.div``;

interface SearchCategoriesComponentProps {}

const SearchCategoriesComponent: React.FC<
  SearchCategoriesComponentProps
> = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const { categories, fetchCategories } = useStorage(StorageType.SEARCH);

  return (
    <SearchCategoriesComponentBlock>
      <Input.Search
        className="mb-4"
        size="large"
        placeholder="찾으시는 암기장을 입력해주세요."
        onSearch={async (keyword) => {
          try {
            setIsSearching(true);
            await fetchCategories(
              { keyword, limit: 30, isPublicOnly: true },
              'popular'
            );
          } catch (e) {
            handleError(e);
          } finally {
            setIsSearching(false);
          }
        }}
      />

      {!isSearching && categories?.length > 0 && (
        <CategoryFolderList
          categories={categories?.slice((page - 1) * LIMIT, page * LIMIT) || []}
        />
      )}
      {!isSearching && categories && categories.length <= 0 && (
        <Empty description="암기장이 존재하지 않습니다.." />
      )}
      {isSearching && (
        <div>
          <Skeleton />
        </div>
      )}
      {!!categories?.length && (
        <div className="flex items-center mt-5 justify-center">
          <Pagination
            current={page}
            total={categories?.length || 0}
            pageSize={LIMIT}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
    </SearchCategoriesComponentBlock>
  );
};

export default SearchCategoriesComponent;
