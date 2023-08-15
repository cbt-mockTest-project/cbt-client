import Modal, { ModalProps } from '@components/common/modal/Modal';
import {
  useDeleteExamCategoryViewer,
  useGetInvitedExams,
  useUpdateExamCategoryViewerApproveState,
} from '@lib/graphql/user/hook/useExamViewer';
import { responsive } from '@lib/utils/responsive';
import { handleError } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, List, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExamViewer } from 'types';

const InviteExamModalBlock = styled(Modal)`
  padding: 20px;
  min-width: 500px;
  width: 100%;
  height: 500px;
  overflow-y: auto;
  .invited-exam-modal-title {
    font-size: 18px;
    font-weight: 700;
    color: ${palette.gray_900};
  }
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
    width: 70%;
  }
  .invited-exam-modal-item-title-username {
    color: ${palette.gray_700};
    width: 30%;
    text-align: right;
  }
  .invited-exam-modal-list-item-button-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  @media (max-width: ${responsive.lsmall}) {
    min-width: calc(100vw - 40px);
  }
`;

interface InviteExamModalProps extends Omit<ModalProps, 'children'> {}

const InviteExamModal: React.FC<InviteExamModalProps> = (props) => {
  const { data: invitedExamsQuery } = useGetInvitedExams();
  const [invitedExams, setInvitedExams] = useState<ExamViewer[]>([]);
  const [deleteExamCategoryViewer] = useDeleteExamCategoryViewer();
  const [updateExamCategoryViewer] = useUpdateExamCategoryViewerApproveState();
  useEffect(() => {
    if (Array.isArray(invitedExamsQuery?.getInvitedExams.examViewers)) {
      const newExamViewers = invitedExamsQuery?.getInvitedExams.examViewers;

      setInvitedExams(newExamViewers as ExamViewer[]);
    }
  }, [invitedExamsQuery]);
  const handleDeleteExamViewer = async (
    categoryId: number,
    examViewerId: number
  ) => {
    try {
      const confirmed = confirm(
        '정말로 삭제하시겠습니까? 삭제 하시면 더 이상 해당 시험지를 볼 수 없습니다.'
      );
      if (confirmed) {
        const res = await deleteExamCategoryViewer({
          variables: {
            input: { categoryId, examViewerId, executor: 'viewer' },
          },
        });
        if (res.data?.deleteExamCategoryViewer.ok) {
          setInvitedExams((prev) =>
            prev.filter((viewer) => viewer.id !== examViewerId)
          );
          return message.success('삭제되었습니다.');
        }
        return message.error(res.data?.deleteExamCategoryViewer.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  const handleUpdateExamViewer = async (examViewerId: number) => {
    try {
      const confirmed = confirm(
        '정말로 수락하시겠습니까? 수락 하시면 해당 시험지를 볼 수 있습니다.'
      );
      if (!confirmed) return;
      const res = await updateExamCategoryViewer({
        variables: {
          input: { examViewerId },
        },
      });
      if (res.data?.updateExamViewerApproveState.ok) {
        setInvitedExams((prev) =>
          prev.map((viewer) => {
            if (viewer.id === examViewerId) {
              return { ...viewer, isApprove: true };
            }
            return viewer;
          })
        );
        return message.success('수락되었습니다.');
      }
      return message.error(res.data?.updateExamViewerApproveState.error);
    } catch (e) {
      handleError(e);
    }
  };
  const { ...modalProps } = props;
  return (
    <InviteExamModalBlock {...modalProps}>
      <p className="invited-exam-modal-title">시험지 초대목록 관리</p>
      <List
        className="invited-exam-modal-list"
        bordered
        dataSource={invitedExams}
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
                <Button
                  type="primary"
                  disabled={item.isApprove}
                  onClick={() => handleUpdateExamViewer(item.id)}
                >
                  {item.isApprove ? '수락됨' : '수락하기'}
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    handleDeleteExamViewer(item.examCategory.id, item.id)
                  }
                >
                  삭제하기
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />
    </InviteExamModalBlock>
  );
};

export default InviteExamModal;
