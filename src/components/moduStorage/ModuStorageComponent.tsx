import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryFolderList from './CategoryFolderList';
import { ExamSource, UserRole } from 'types';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import TextInput from '@components/common/input/TextInput';

const ModuStorageComponentBlock = styled.div`
  .category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
`;

interface ModuStorageComponentProps {}

const ModuStorageComponent: React.FC<ModuStorageComponentProps> = () => {
  const { data: meQuery } = useMeQuery();
  const { placeholder } = useSaveCategoryModal(StorageType.MODU);
  const { categories, fetchCategories, handleFilterCategories } = useStorage(
    StorageType.MODU
  );

  useEffect(() => {
    if (meQuery?.me.user?.role === UserRole.Admin) {
      fetchCategories({ examSource: ExamSource.MoudCbt });
    }
  }, [meQuery]);

  return (
    <ModuStorageComponentBlock>
      <TextInput
        className="category-filter-input"
        placeholder="암기장 필터링"
        onChange={(e) => {
          handleFilterCategories(e.target.value);
        }}
      />
      <CategoryFolderList categories={categories} />
      {placeholder}
    </ModuStorageComponentBlock>
  );
};

export default ModuStorageComponent;
