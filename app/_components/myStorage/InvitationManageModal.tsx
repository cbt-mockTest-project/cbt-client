import BasicCard from '../common/card/BasicCard';
import useManageInvitation from '../../_lib/hooks/useManageInvitation';
import { Button, Empty, List, Modal, ModalProps } from 'antd';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const InvitationManageModalBlock = styled(Modal)`
  .invitation-manage-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .invitation-manage-modal-title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 15px;
  }
  .invitation-manage-item-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .invitation-manage-header {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .invitation-manage-user-info-wrapper {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
    .invitation-manage-button-wrapper {
      display: flex;
      gap: 5px;
    }
  }
`;

interface InvitationManageModalProps extends Omit<ModalProps, 'children'> {}

const InvitationManageModal: React.FC<InvitationManageModalProps> = (props) => {
  const { ...modalProps } = props;
  const {
    invitations,
    handleAcceptCategoryInvitation,
    handleDeleteCategoryInvitation,
  } = useManageInvitation();
  return (
    <InvitationManageModalBlock {...modalProps} footer={false}>
      <div className="invitation-manage-modal-title">
        초대받은 암기장 리스트
      </div>
      <div className="invitation-manage-list">
        {invitations.map((invitation) => (
          <BasicCard key={invitation.id}>
            <div className="invitation-manage-item-wrapper">
              <div className="invitation-manage-header">
                <div>{invitation.category.name}</div>
                <div className="invitation-manage-user-info-wrapper">
                  <Image
                    src={
                      invitation.category.user.profileImg ||
                      `${process.env.NEXT_PUBLIC_CLOUD_FRONT}/user/profile_default.png`
                    }
                    alt="profile"
                    width={25}
                    height={25}
                  />
                  <div>{invitation.category.user.nickname}</div>
                </div>
              </div>
              <div className="invitation-manage-button-wrapper">
                <Button
                  size="small"
                  type="primary"
                  onClick={() =>
                    handleAcceptCategoryInvitation({
                      categoryId: invitation.category.id,
                      invitationId: invitation.id,
                    })
                  }
                >
                  수락
                </Button>
                <Button
                  size="small"
                  onClick={() => handleDeleteCategoryInvitation(invitation.id)}
                >
                  삭제
                </Button>
              </div>
            </div>
          </BasicCard>
        ))}
      </div>
      {invitations.length == 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="초대받은 암기장이 없습니다."
        />
      )}
    </InvitationManageModalBlock>
  );
};

export default InvitationManageModal;
