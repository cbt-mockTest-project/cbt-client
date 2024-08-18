import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import CategoryFolderList from './CategoryFolderList';
import { ExamSource } from 'types';
import { StorageType } from 'customTypes';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import TextInput from '@components/common/input/TextInput';
import { Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';
import { useSearchFilterStorage } from '@lib/hooks/useSearchFilterStorage';

const ModuStorageComponentBlock = styled.div`
  .category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
`;
const LIMIT = 10;

interface ModuStorageComponentProps {}

const ModuStorageComponent: React.FC<ModuStorageComponentProps> = () => {
  const { placeholder } = useSaveCategoryModal(StorageType.MODU);
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.modu_storage,
      input: {
        examSource: ExamSource.MoudCbt,
      },
    })
  );
  const { handleSearch, paginatedData, page, setPage } = useSearchFilterStorage(
    {
      data,
      limit: LIMIT,
    }
  );

  return (
    <ModuStorageComponentBlock>
      <TextInput
        className="category-filter-input"
        placeholder="암기장을 검색해보세요."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <CategoryFolderList categories={paginatedData} />
      <div className="flex items-center mt-5 justify-center">
        <Pagination
          current={page}
          total={paginatedData?.length || 0}
          pageSize={LIMIT}
          onChange={(page) => setPage(page)}
        />
      </div>
      {placeholder}
    </ModuStorageComponentBlock>
  );
};

export default ModuStorageComponent;
