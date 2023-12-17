import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryFolderList from './CategoryFolderList';
import { UserRole } from 'types';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';

const ModuStorageComponentBlock = styled.div``;

interface ModuStorageComponentProps {}

const ModuStorageComponent: React.FC<ModuStorageComponentProps> = () => {
  const { data: meQuery } = useMeQuery();
  const { openSaveCategoryModal, placeholder } = useSaveCategoryModal(
    StorageType.MODU
  );
  const { categories, fetchCategories } = useStorage(StorageType.MODU);

  useEffect(() => {
    if (meQuery?.me.user?.role === UserRole.Admin) {
      fetchCategories();
    }
  }, [meQuery]);

  return (
    <ModuStorageComponentBlock>
      <CategoryFolderList
        categories={categories}
        openSaveCategoryModal={openSaveCategoryModal}
      />
      {placeholder}
    </ModuStorageComponentBlock>
  );
};

export default ModuStorageComponent;
