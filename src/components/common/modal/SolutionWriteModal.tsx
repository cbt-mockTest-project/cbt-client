import QuestionAndSolutionBox, {
  QuestionAndSolutionContent,
} from '@components/exam/QuestionAndSolutionBox';
import { TextAreaProps } from 'antd/lib/input';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';

interface SolutionWriteModalProps extends Omit<ModalProps, 'children'> {
  questionAndSolutionContent: QuestionAndSolutionContent;
  textAreaOption: TextAreaProps;
}

const SolutionWriteModal: React.FC<SolutionWriteModalProps> = ({
  open,
  onClose,
  questionAndSolutionContent,
  textAreaOption,
}) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      animation={true}
      animationDirection="bottom"
    >
      <div className="solution-write-question-box-wrapper">
        <QuestionAndSolutionBox
          label="문제"
          content={questionAndSolutionContent}
        />
      </div>
      <div className="solution-write-modal-text-area-wrapper">
        <TextArea
          {...textAreaOption}
          className="solution-write-modal-text-area"
        />
      </div>
    </StyledModal>
  );
};

export default SolutionWriteModal;

const StyledModal = styled(Modal)`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 20px;
  max-width: unset;
  overflow-y: scroll;
  .solution-write-question-box-wrapper {
    margin-top: 0px;
    padding-bottom: 180px;
  }
  .modal-close-button {
    display: block;
    width: 25px;
    top: 0;
    margin-left: auto;
    position: sticky;
    z-index: 999;
  }

  .solution-write-modal-text-area-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 20px;
  }
`;
