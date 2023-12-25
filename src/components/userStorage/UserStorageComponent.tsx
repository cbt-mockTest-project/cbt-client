import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';

const UserStorageComponentBlock = styled.div``;

interface UserStorageComponentProps {}

const UserStorageComponent: React.FC<UserStorageComponentProps> = ({}) => {
  const { openSaveCategoryModal, placeholder } = useSaveCategoryModal(
    StorageType.USER
  );
  const { categories } = useStorage(StorageType.USER);
  return (
    <UserStorageComponentBlock>
      <CategoryFolderList categories={categories} />
      {placeholder}
    </UserStorageComponentBlock>
  );
};

export default UserStorageComponent;
