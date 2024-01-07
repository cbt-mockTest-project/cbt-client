import { SearchOutlined } from '@ant-design/icons';
import useCategoryInvitation from '@lib/hooks/useCategoryInvitation';
import { Clear } from '@mui/icons-material';
import palette from '@styles/palette';
import { Button, Input, InputRef, List, Modal, ModalProps, Select } from 'antd';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const CategoryInviteModalBlock = styled(Modal)`
  .category-invite-modal-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .category-invite-modal-title {
    font-size: 16px;
    font-weight: bold;
  }
  .category-invite-modal-desc {
    font-size: 12px;
    color: ${palette.colorSubText};
  }
  .ant-list-header {
    padding: 12px 11px;
  }
`;

interface CategoryInviteModalProps extends Omit<ModalProps, 'children'> {
  categoryId: number;
}

const CategoryInviteModal: React.FC<CategoryInviteModalProps> = (props) => {
  const { categoryId, ...modalProps } = props;
  const searchUserInputRef = useRef<InputRef>(null);

  const {
    handleSearchAndInviteUser,
    subscribers,
    handleDeleteCategorySubscriber,
  } = useCategoryInvitation(categoryId);
  return (
    <CategoryInviteModalBlock {...modalProps}>
      <div className="category-invite-modal-wrapper">
        <div>
          <p className="category-invite-modal-title">유저 초대하기</p>
          <p className="category-invite-modal-desc">
            초대된 유저는 폴더를 학습할 수 있습니다.
          </p>
        </div>
        <Input
          size="large"
          placeholder="초대할 유저를 검색해주세요."
          ref={searchUserInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchAndInviteUser({
                keyword: searchUserInputRef.current.input.value,
                categoryId,
              });
            }
          }}
          suffix={
            <SearchOutlined
              onClick={() => {
                handleSearchAndInviteUser({
                  keyword: searchUserInputRef.current.input.value,
                  categoryId,
                });
              }}
            />
          }
        />
        <List
          header="폴더를 구독하고 있는 유저"
          dataSource={subscribers}
          style={{ maxHeight: '400px', overflowY: 'scroll' }}
          bordered
          renderItem={(user) => (
            <List.Item key={user.id}>
              <div className="my-exam-invite-list-item-wrapper">
                <div>{user.nickname}</div>
                <Button
                  onClick={() => handleDeleteCategorySubscriber(user.id)}
                  type="text"
                >
                  <Clear />
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </CategoryInviteModalBlock>
  );
};

export default CategoryInviteModal;
