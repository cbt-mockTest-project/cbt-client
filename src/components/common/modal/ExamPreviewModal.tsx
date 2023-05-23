import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';
import Modal, { ModalProps } from './Modal';

interface ExamPreviewModalProps extends Omit<ModalProps, 'children'> {
  examId: number;
  categoryName: string;
  examTitle: string;
}

const ExamPreviewModal: React.FC<ExamPreviewModalProps> = ({
  open,
  onClose,
  examId,
  categoryName,
  examTitle,
}) => {
  return (
    <ExamPreviewModalContainer onClose={onClose} open={open}>
      <h3>시험지 미리보기</h3>
      <div className="exam-preview-button-wrapper">
        <Link
          href={`/preview/exam?e=${examId}&q=1`}
          className="exam-preview-link"
        >
          <Button type="primary">풀이모드</Button>
        </Link>
        <Link
          href={`/preview/exam/solution/${examId}`}
          className="exam-preview-link"
        >
          <Button type="primary">해설모드</Button>
        </Link>
      </div>
    </ExamPreviewModalContainer>
  );
};

export default ExamPreviewModal;

const ExamPreviewModalContainer = styled(Modal)`
  .exam-preview-button-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .exam-preview-link {
    width: 100%;
    button {
      width: 100%;
    }
  }
`;
