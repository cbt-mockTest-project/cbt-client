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

const EhsStorageComponentBlock = styled.div`
  .category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
`;

const LIMIT = 10;

interface EhsStorageComponentProps {}

const EhsStorageComponent: React.FC<EhsStorageComponentProps> = () => {
  const { data: meQuery } = useMeQuery();
  const [page, setPage] = useState(1);
  const { placeholder } = useSaveCategoryModal(StorageType.MODU);
  const {
    categories,
    fetchCategories,
    handleFilterCategories,
    handleToggleCategoryBookmark,
  } = useStorage(StorageType.MODU);

  useEffect(() => {
    if (meQuery?.me.user?.role === UserRole.Admin) {
      fetchCategories({ examSource: ExamSource.EhsMaster });
    }
  }, [meQuery]);

  return (
    <EhsStorageComponentBlock>
      <TextInput
        className="category-filter-input"
        placeholder="암기장 필터링"
        onChange={(e) => {
          handleFilterCategories(e.target.value);
        }}
      />
      <CategoryFolderList
        categories={categories.slice((page - 1) * LIMIT, page * LIMIT) || []}
        handleToggleBookmark={handleToggleCategoryBookmark}
      />
      {categories.length === 0 && (
        <Empty style={{ marginTop: '100px' }} description="준비중입니다." />
      )}
      <div className="flex items-center mt-5 justify-center">
        <Pagination
          current={page}
          total={categories.length}
          pageSize={LIMIT}
          onChange={(page) => setPage(page)}
        />
      </div>
      {placeholder}
    </EhsStorageComponentBlock>
  );
};

export default EhsStorageComponent;
