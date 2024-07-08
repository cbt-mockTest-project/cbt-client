import palette from '../../_styles/palette';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, ModalProps, Radio } from 'antd';
import { checkboxOption } from '../../customTypes';
import { MockExamQuestion, QuestionFeedbackType } from '../../types';
import CreateQuestionEditor from '../exam/write/CreateQuestionEditor';
import {
  AddFeedbackInput,
  EditFeedbackInput,
} from '../../_lib/hooks/useQuestionFeedback';

export const feedbackOptions: checkboxOption[] = [
  { label: '비공개', value: QuestionFeedbackType.Private },
  { label: '공개', value: QuestionFeedbackType.Public },
  { label: '오류신고', value: QuestionFeedbackType.Report },
];
interface QuestionFeedbackModalProps extends Omit<ModalProps, 'children'> {
  title: string | string[];
  question: MockExamQuestion;
  feedbackId?: number;
  defaultFeedback?: string;
  defaultType?: QuestionFeedbackType;
  onClose: () => void;
  editFeedback: (
    editFeedbackInput: Omit<EditFeedbackInput, 'setQuestion'>
  ) => Promise<void>;
  addFeedback: (
    editFeedbackInput: Omit<AddFeedbackInput, 'setQuestion'>
  ) => Promise<void>;
}

const QuestionFeedbackModal: React.FC<QuestionFeedbackModalProps> = (props) => {
  const {
    addFeedback,
    editFeedback,
    feedbackId = 0,
    onClose,
    question,
    title,
    defaultFeedback,
    defaultType = QuestionFeedbackType.Private,
    ...modalProps
  } = props;
  const [updateFeedbackLoading, setUpdateFeedbackLoading] = useState(false);

  const [selectedType, setSelectedType] =
    useState<QuestionFeedbackType>(defaultType);
  const [content, setContent] = useState('');
  const handleAddQuestionFeedback = async () => {
    setUpdateFeedbackLoading(true);
    await addFeedback({
      content,
      selectedType,
      question,
    });
    onClose();
    setUpdateFeedbackLoading(false);
  };
  const handleEditQuestionFeedback = async () => {
    setUpdateFeedbackLoading(true);
    await editFeedback({
      content,
      selectedType,
      question,
      feedbackId,
    });
    onClose();
    setUpdateFeedbackLoading(false);
  };

  useEffect(() => {
    setContent(defaultFeedback);
  }, [defaultFeedback]);

  useEffect(() => {
    if (!feedbackId) setContent('');
  }, [feedbackId]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <QuestionFeedbackModalBlock
        {...modalProps}
        onOk={
          feedbackId ? handleEditQuestionFeedback : handleAddQuestionFeedback
        }
        okText={feedbackId ? '수정하기' : '등록하기'}
        cancelText="닫기"
        okButtonProps={{ loading: updateFeedbackLoading }}
      >
        <div className="add-answer-modal-inner">
          <label className="content-label">메모</label>
          <pre className="content-title">{title}</pre>
          <Radio.Group
            className="content-feedback-type-checkbox-group"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
            options={feedbackOptions}
          />
          <CreateQuestionEditor
            content={content}
            setContent={setContent}
            placeholder={`1.암기팁 또는 추가적인 답안을 공유해주세요.\n2.문제 오류가 있다면 공유해주세요.\n3.함께 풍성한 답안을 만들어 봅시다.`}
            className="content-feedback-editor"
          />
        </div>
      </QuestionFeedbackModalBlock>
    </div>
  );
};

export default QuestionFeedbackModal;

const QuestionFeedbackModalBlock = styled(Modal)`
  .add-answer-modal-inner {
    padding-top: 20px;
    pre {
      text-align: center;
      font-weight: bold;
    }
    textarea {
      margin-top: 25px;
    }
    .content-label {
      display: block;
      margin: 0 auto;
      margin-bottom: 0px;
      position: relative;
      bottom: 15px;
      width: max-content;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.color('colorPrimary')};
      border: 1px solid ${({ theme }) => theme.color('colorPrimary')};
      padding: 5px 20px;
      border-radius: 50px;
    }
    .content-title {
      font-size: 0.9rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .content-feedback-type-checkbox-group {
      margin-top: 20px;
      text-align: center;
      width: 100%;
    }
    .content-feedback-editor {
      margin-top: 20px;
    }
  }
  .report-confirm-modal {
    .modal-close-button {
      top: -7px;
      right: -15px;
    }
    .confirm-modal {
      padding: 20px 25px;
      max-width: 500px;
    }
    .confirm-modal-button-wrapper {
      gap: 10px;
      button {
        width: 100%;
      }
    }
  }
`;
