import TextInput from '@components/common/input/TextInput';
import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import useStorage from '@lib/hooks/useStorage';
import { Button, Empty, Pagination, Select, Skeleton, Tooltip } from 'antd';
import { StorageType } from 'customTypes';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useSaveCategoryModal from '@lib/hooks/usaSaveCategoryModal';

const MyStorageComponentBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  .my-storage-filter-select {
    margin-bottom: 20px;
  }
  .my-storage-category-filter-input {
    max-width: 500px;
    margin-bottom: 20px;
  }
  .my-storage-toggle-invite-modal-button {
    position: absolute;
    right: 50px;
    top: -45px;
  }
`;

const LIMIT = 10;

interface MyStorageComponentProps {}

enum CategoryOptionEnum {
  ME = 'me',
  BOOKMARKED = 'bookmarked',
}

const MyStorageComponent: React.FC<MyStorageComponentProps> = ({}) => {
  const [page, setPage] = useState(1);
  const [storageType, setStorageType] = React.useState<StorageType>(
    StorageType.MY
  );
  const setMyCategoriesLoading = useAppSelector(
    (state) => state.storage.setMyCategoriesLoading
  );
  const { categories, handleFilterCategories, handleToggleCategoryBookmark } =
    useStorage(storageType);
  const { openSaveCategoryModal, placeholder } =
    useSaveCategoryModal(storageType);
  return (
    <MyStorageComponentBlock>
      <Tooltip title="초대받은 암기장 목록을 관리합니다."></Tooltip>
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
      <TextInput
        className="my-storage-category-filter-input"
        placeholder="암기장 필터링"
        onChange={(e) => {
          handleFilterCategories(e.target.value);
        }}
      />
      <CategoryFolderList
        categories={categories?.slice((page - 1) * LIMIT, page * LIMIT) || []}
        handleToggleBookmark={handleToggleCategoryBookmark}
        hasAllExamFolder={storageType === StorageType.MY}
      />
      {setMyCategoriesLoading && (
        <div className="flex justify-center flex-col gap-4">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
      {!setMyCategoriesLoading && categories?.length === 0 && (
        <Empty description="암기장이 없습니다.">
          <Button type="primary" onClick={openSaveCategoryModal}>
            암기장 생성하기
          </Button>
        </Empty>
      )}
      <div className="flex items-center mt-5 justify-center">
        <Pagination
          current={page}
          total={categories?.length || 0}
          pageSize={LIMIT}
          onChange={(page) => setPage(page)}
        />
      </div>
      {placeholder}
    </MyStorageComponentBlock>
  );
};

export default MyStorageComponent;
