import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';

const MyStorageComponentBlock = styled.div``;

interface MyStorageComponentProps {}

const MyStorageComponent: React.FC<MyStorageComponentProps> = () => {
  const { openSaveCategoryModal, placeholder } = useSaveCategoryModal(
    StorageType.MY
  );
  const { categories } = useStorage(StorageType.MY);
  return (
    <MyStorageComponentBlock>
      <CategoryFolderList
        categories={categories}
        openSaveCategoryModal={openSaveCategoryModal}
      />
      {placeholder}
    </MyStorageComponentBlock>
  );
};

export default MyStorageComponent;
