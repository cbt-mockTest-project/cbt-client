import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import useStorage from '@lib/hooks/useStorage';
import { StorageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';

const MyStorageComponentBlock = styled.div``;

interface MyStorageComponentProps {}

const MyStorageComponent: React.FC<MyStorageComponentProps> = () => {
  const { categories } = useStorage(StorageType.MY);
  return (
    <MyStorageComponentBlock>
      <CategoryFolderList categories={categories} />
    </MyStorageComponentBlock>
  );
};

export default MyStorageComponent;
