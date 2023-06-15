import { ClearOutlined } from '@ant-design/icons';
import QuestionAndSolutionBox, {
  QuestionAndSolutionContent,
} from '@components/exam/QuestionAndSolutionBox';
import palette from '@styles/palette';
import { Button } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import TextArea from 'antd/lib/input/TextArea';
import React, { SetStateAction, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Label from '../label/Label';
import Modal, { ModalProps } from './Modal';

interface SolutionWriteModalProps extends Omit<ModalProps, 'children'> {
  questionAndSolutionContent: QuestionAndSolutionContent;
  textAreaOption: TextAreaProps;
  pageSubTitle: string;
  onClearAnswer: () => void;
}

const SolutionWriteModal: React.FC<SolutionWriteModalProps> = ({
  open,
  onClose,
  questionAndSolutionContent,
  textAreaOption,
  onClearAnswer,
  pageSubTitle,
}) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      animation={true}
      animationDirection="bottom"
    >
      <div className="solution-write-question-box-wrapper">
        <Label content={pageSubTitle} />
        <QuestionAndSolutionBox content={questionAndSolutionContent} />
      </div>
      <div className="solution-write-modal-text-area-wrapper">
        <div className="solution-write-modal-label-wrapper">
          <Label content="답 작성" className="solution-write-modal-label" />
          <button
            className="solution-write-modal-clear-button"
            onClick={onClearAnswer}
          >
            <ClearOutlined />
          </button>
        </div>
        <TextArea
          {...textAreaOption}
          autoFocus
          className="solution-write-modal-text-area"
        />
        <Button
          className="solution-write-modal-text-finish-button"
          type="primary"
          onClick={onClose}
        >
          작성완료
        </Button>
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
  padding: 20px 20px;
  max-width: unset;
  overflow-y: scroll;
  z-index: 99999;
  .solution-write-modal-text-finish-button {
    width: 100%;
  }
  .solution-write-modal-label-wrapper {
    margin-left: -20px;
    margin-right: -20px;
    padding: 10px 20px 0 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: white;
    .solution-write-modal-label {
      margin: 0;
    }
  }
  .solution-write-modal-clear-button {
    height: 18px;
    width: 18px;
    margin-top: -6px;
    svg {
      transition: all 0.3s;
      width: 18px;
      height: 18px;
    }
    :hover {
      svg {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .solution-write-question-box-wrapper {
    margin-top: 0px;
    padding-bottom: 180px;
  }
  .modal-close-button {
    display: block;
    width: 25px;
    top: 0;
    height: 15px;
    margin-left: auto;
    position: sticky;
    z-index: 999;
  }

  .solution-write-modal-text-area-wrapper {
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 4px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 20px;
  }
`;
