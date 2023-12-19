import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';
import useStorage from '@lib/hooks/useStorage';
import { Select } from 'antd';
import { StorageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';

const MyStorageComponentBlock = styled.div`
  .my-storage-filter-select {
    margin-bottom: 20px;
  }
`;

interface MyStorageComponentProps {}

enum CategoryOptionEnum {
  ME = 'me',
  BOOKMARKED = 'bookmarked',
}

const MyStorageComponent: React.FC<MyStorageComponentProps> = ({}) => {
  const [storageType, setStorageType] = React.useState<StorageType>(
    StorageType.MY
  );
  const { categories } = useStorage(storageType);
  return (
    <MyStorageComponentBlock>
      <Select
        className="my-storage-filter-select"
        style={{ width: '200px' }}
        defaultValue={CategoryOptionEnum.ME}
        onChange={(value) => {
          if (value === CategoryOptionEnum.ME) setStorageType(StorageType.MY);
          if (value === CategoryOptionEnum.BOOKMARKED)
            setStorageType(StorageType.BOOKMARK);
        }}
        options={[
          { label: '내 암기장', value: CategoryOptionEnum.ME },
          { label: '저장된', value: CategoryOptionEnum.BOOKMARKED },
        ]}
      />
      <CategoryFolderList categories={categories} />
    </MyStorageComponentBlock>
  );
};

export default MyStorageComponent;
