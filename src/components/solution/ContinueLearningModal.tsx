import Modal, { ModalProps } from '@components/common/modal/Modal';
import React from 'react';
import styled from 'styled-components';
import MoveExamSelectorBox from './MoveExamSelectorBox';

const ContinueLearningModalBlock = styled(Modal)`
  padding: 20px 30px;
  min-height: 144px;
`;

interface ContinueLearningModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  examId: number;
}

const ContinueLearningModal: React.FC<ContinueLearningModalProps> = (props) => {
  const { examId, title, ...modalProps } = props;

  return (
    <ContinueLearningModalBlock {...modalProps} hasCloseIcon={false}>
      <MoveExamSelectorBox
        key={`continue-learning-modal-${examId}`}
        examId={examId}
      />
    </ContinueLearningModalBlock>
  );
};

export default ContinueLearningModal;
