import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import useStorage from '@lib/hooks/useStorage';
import { Empty } from 'antd';
import { StorageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';

const UserStorageComponentBlock = styled.div``;

interface UserStorageComponentProps {}

const UserStorageComponent: React.FC<UserStorageComponentProps> = ({}) => {
  const { placeholder } = useSaveCategoryModal(StorageType.USER);
  const { categories } = useStorage(StorageType.USER);
  return (
    <UserStorageComponentBlock>
      {categories.length > 0 && (
        <CategoryFolderList
          categories={categories}
          handleToggleBookmark={async () => {}}
        />
      )}
      {categories.length <= 0 && <Empty description="암기장이 비어있습니다." />}
      {placeholder}
    </UserStorageComponentBlock>
  );
};

export default UserStorageComponent;
