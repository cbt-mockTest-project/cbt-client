import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExamSource, UserRole } from 'types';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import TextInput from '@components/common/input/TextInput';
import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import { Empty, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import {
  GetCategoriesQueryKey,
  getCategoriesQueryOption,
} from '@lib/queryOptions/getCategoriesQueryOption';
import { useSearchFilterStorage } from '@lib/hooks/useSearchFilterStorage';

const EhsStorageComponentBlock = styled.div`
  .category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
`;

const LIMIT = 10;

interface EhsStorageComponentProps {}

const EhsStorageComponent: React.FC<EhsStorageComponentProps> = () => {
  const { placeholder } = useSaveCategoryModal(StorageType.MODU);
  const { data } = useQuery(
    getCategoriesQueryOption({
      queryKey: GetCategoriesQueryKey.ehs_storage,
      input: {
        examSource: ExamSource.EhsMaster,
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
    <EhsStorageComponentBlock>
      <TextInput
        className="category-filter-input"
        placeholder="암기장 필터링"
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
    </EhsStorageComponentBlock>
  );
};

export default EhsStorageComponent;
