import TextInput from '@components/common/input/TextInput';
import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import { useSearchFilterStorage } from '@lib/hooks/useSearchFilterStorage';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';
import { useQuery } from '@tanstack/react-query';
import { Empty, Pagination, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ExamSource } from 'types';

const UserStorageComponentBlock = styled.div`
  .category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
  .user-storage-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

interface UserStorageComponentProps {
  type?: 'user' | 'public';
}

const LIMIT = 10;

const UserStorageComponent: React.FC<UserStorageComponentProps> = () => {
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.user_storage,
      input: {
        examSource: ExamSource.User,
      },
    })
  );
  const { handleSearch, handleSort, paginatedData, page, setPage } =
    useSearchFilterStorage({
      data,
      limit: LIMIT,
      hasOrderOption: true,
    });

  return (
    <UserStorageComponentBlock>
      <TextInput
        className="category-filter-input"
        placeholder="암기장을 검색해보세요."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <div className="mb-6">
        <Select
          style={{ width: '150px' }}
          defaultValue={'popular'}
          options={[
            {
              label: '인기순',
              value: 'popular',
            },
            {
              label: '최신순',
              value: 'latest',
            },
          ]}
          onChange={(value) => handleSort(value as 'popular' | 'latest')}
        />
      </div>
      {paginatedData?.length > 0 && (
        <CategoryFolderList categories={paginatedData} />
      )}
      {paginatedData?.length <= 0 && (
        <Empty description="암기장이 존재하지 않습니다.." />
      )}
      <div className="flex items-center mt-5 justify-center">
        <Pagination
          current={page}
          total={data?.length || 0}
          pageSize={LIMIT}
          onChange={(page) => setPage(page)}
        />
      </div>
    </UserStorageComponentBlock>
  );
};

export default UserStorageComponent;
