import TextInput from '@components/common/input/TextInput';
import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import { useSearchFilterStorage } from '@lib/hooks/useSearchFilterStorage';
import { getCategoriesForAdminQueryOption } from '@lib/queryOptions/getCategoriesForAdminQueryOption';
import { useQuery } from '@tanstack/react-query';
import { Empty, Pagination, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';

const AdminStorageComponentBlock = styled.div`
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

interface AdminStorageComponentProps {
  type?: 'user' | 'public';
}

const LIMIT = 10;

const AdminStorageComponent: React.FC<AdminStorageComponentProps> = () => {
  const { data, isLoading } = useQuery(getCategoriesForAdminQueryOption);
  const { handleSearch, handleSort, paginatedData, page, setPage } =
    useSearchFilterStorage({
      data,
      limit: LIMIT,
      hasOrderOption: true,
    });

  if (isLoading) return <div>로딩중...</div>;
  return (
    <AdminStorageComponentBlock>
      <TextInput
        className="category-filter-input"
        placeholder="암기장 필터링"
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
            {
              label: '세트 많은 순',
              value: 'setCount',
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
    </AdminStorageComponentBlock>
  );
};

export default AdminStorageComponent;
