import CategoryInviteModal from '@components/category/CategoryInviteModal';
import TextInput from '@components/common/input/TextInput';
import CategoryFolderList from '@components/moduStorage/CategoryFolderList';
import useStorage from '@lib/hooks/useStorage';
import { Button, Select, Tooltip } from 'antd';
import { StorageType } from 'customTypes';
import React from 'react';
import styled from 'styled-components';
import InvitationManageModal from './InvitationManageModal';

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

interface MyStorageComponentProps {}

enum CategoryOptionEnum {
  ME = 'me',
  BOOKMARKED = 'bookmarked',
}

const MyStorageComponent: React.FC<MyStorageComponentProps> = ({}) => {
  const [storageType, setStorageType] = React.useState<StorageType>(
    StorageType.MY
  );
  const [isInvitationManageModal, setIsInvitationManageModal] =
    React.useState<boolean>(false);
  const { categories, handleFilterCategories } = useStorage(storageType);
  return (
    <MyStorageComponentBlock>
      <Tooltip title="초대받은 암기장 목록을 관리합니다.">
        <Button
          className="my-storage-toggle-invite-modal-button"
          onClick={() => setIsInvitationManageModal(true)}
        >
          초대함
        </Button>
      </Tooltip>
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
        categories={categories}
        hasAllExamFolder={storageType === StorageType.MY}
      />
      {isInvitationManageModal && (
        <InvitationManageModal
          open={isInvitationManageModal}
          onCancel={() => setIsInvitationManageModal(false)}
        />
      )}
    </MyStorageComponentBlock>
  );
};

export default MyStorageComponent;
