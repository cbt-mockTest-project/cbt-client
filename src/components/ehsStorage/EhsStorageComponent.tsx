import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ExamSource, UserRole } from 'types';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import TextInput from '@components/common/input/TextInput';
import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import { Empty } from 'antd';

const EhsStorageComponentBlock = styled.div`
  .category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
`;

interface EhsStorageComponentProps {}

const EhsStorageComponent: React.FC<EhsStorageComponentProps> = () => {
  const { data: meQuery } = useMeQuery();
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
        categories={categories}
        handleToggleBookmark={handleToggleCategoryBookmark}
      />
      {categories.length === 0 && (
        <Empty style={{ marginTop: '100px' }} description="준비중입니다." />
      )}
      {placeholder}
    </EhsStorageComponentBlock>
  );
};

export default EhsStorageComponent;
