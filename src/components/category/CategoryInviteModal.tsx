import useCategoryInvitation from '@lib/hooks/useCategoryInvitation';
import { Clear } from '@mui/icons-material';
import palette from '@styles/palette';
import { Button, List, Modal, ModalProps, message } from 'antd';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CategoryInviteLinkContent from './CategoryInviteLinkContent';
import { useCreateCategoryInviteLinkMutation } from '@lib/hooks/useCategoryInviteLink';

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
    color: ${({ theme }) => theme.color('colorTextSecondary')};
  }
  .category-invite-modal-list-item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .category-invite-modal-list-item-user-info {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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
  const createCategoryInviteLink = useCreateCategoryInviteLinkMutation();
  const { subscribers, handleDeleteCategorySubscriber } =
    useCategoryInvitation(categoryId);
  const onClickCreateInviteLink = async () => {
    const res = await createCategoryInviteLink.mutateAsync(categoryId);
    if (!res.createCategoryInvitationLink.ok) {
      message.error(res.createCategoryInvitationLink.error);
      return;
    }

    Modal.success({
      title: '초대링크',
      footer: null,
      content: (
        <CategoryInviteLinkContent
          createCategoryInviteLink={createCategoryInviteLink}
          categoryId={categoryId}
          defaultInviteCode={res.createCategoryInvitationLink.code}
        />
      ),
    });
  };
  return (
    <CategoryInviteModalBlock {...modalProps}>
      <div className="category-invite-modal-wrapper">
        <div>
          <p className="category-invite-modal-title">유저 초대하기</p>
          <p className="category-invite-modal-desc">
            초대된 유저는 폴더를 학습할 수 있습니다.
          </p>
        </div>
        <Button type="primary" size="large" onClick={onClickCreateInviteLink}>
          초대링크 생성
        </Button>
        <List
          header="폴더를 구독하고 있는 유저"
          dataSource={subscribers}
          style={{ maxHeight: '400px', overflowY: 'scroll' }}
          bordered
          renderItem={(user) => (
            <List.Item key={user.id}>
              <div className="category-invite-modal-list-item-wrapper">
                <div className="category-invite-modal-list-item-user-info">{`${user.nickname}(${user.email})`}</div>
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
