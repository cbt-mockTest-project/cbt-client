import Modal, { ModalProps } from '@components/common/modal/Modal';
import { useGetInvitedExams } from '@lib/graphql/user/hook/useExamViewer';
import palette from '@styles/palette';
import { Button, List } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExamViewer } from 'types';

const InviteExamModalBlock = styled(Modal)`
  padding: 20px;
  min-width: 500px;
  .modal-close-button {
    right: -5px;
    top: -5px;
  }
  .invited-exam-modal-list {
    margin-top: 30px;
  }
  .invited-exam-modal-item-title-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
  }
  .invited-exam-modal-list-item-wrapper {
    width: 100%;
  }
  .invited-exam-modal-item-title-username,
  .invited-exam-modal-item-title-categoryname {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .invited-exam-modal-item-title-categoryname {
    width: 80%;
  }
  .invited-exam-modal-item-title-username {
    color: ${palette.gray_700};
    width: 20%;
    text-align: right;
  }
  .invited-exam-modal-list-item-button-wrapper {
    display: flex;
    /* justify-content: flex-end; */
    gap: 10px;
    margin-top: 15px;
  }
`;

interface InviteExamModalProps extends Omit<ModalProps, 'children'> {}

const InviteExamModal: React.FC<InviteExamModalProps> = (props) => {
  const { data: invitedExamsQuery } = useGetInvitedExams();
  const [invitedExams, setInvitedExams] = useState<ExamViewer[]>([]);
  useEffect(() => {
    if (Array.isArray(invitedExamsQuery?.getInvitedExams.examViewers)) {
      const newExamViewers = invitedExamsQuery?.getInvitedExams.examViewers;

      setInvitedExams(newExamViewers as ExamViewer[]);
    }
  }, [invitedExamsQuery]);
  const { ...modalProps } = props;
  return (
    <InviteExamModalBlock {...modalProps}>
      <List
        className="invited-exam-modal-list"
        bordered
        dataSource={invitedExams}
        // dataSource={invitedExamsQuery?.getInvitedExams.examViewers?.sort(a,b =>) || []}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div className="invited-exam-modal-list-item-wrapper">
              <div className="invited-exam-modal-item-title-wrapper">
                <span className="invited-exam-modal-item-title-categoryname">
                  {item.examCategory.name}
                </span>
                <span className="invited-exam-modal-item-title-username">
                  초대자: {item.examCategory.user.nickname}
                </span>
              </div>
              <div className="invited-exam-modal-list-item-button-wrapper">
                <Button type="primary" disabled={item.isApprove}>
                  수락됨
                </Button>
                <Button type="primary">삭제하기</Button>
              </div>
            </div>
          </List.Item>
        )}
      />
    </InviteExamModalBlock>
  );
};

export default InviteExamModal;
