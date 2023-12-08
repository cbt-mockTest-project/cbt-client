import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ModalProps, Radio } from 'antd';
import { checkboxOption } from 'customTypes';
import { MockExamQuestion, QuestionFeedbackType } from 'types';
import CreateQuestionEditor from '@components/exam/write/CreateQuestionEditor';
import useQuestions from '@lib/hooks/useQuestions';

export const feedbackOptions: checkboxOption[] = [
  { label: '공개', value: QuestionFeedbackType.Public },
  { label: '비공개', value: QuestionFeedbackType.Private },
  { label: '오류신고', value: QuestionFeedbackType.Report },
];
interface QuestionFeedbackModalProps extends Omit<ModalProps, 'children'> {
  title: string | string[];
  question: MockExamQuestion;
  feedbackId?: number;
  onClose: () => void;
}

const QuestionFeedbackModal: React.FC<QuestionFeedbackModalProps> = (props) => {
  const { feedbackId = 0, onClose, question, title, ...modalProps } = props;
  const { editFeedback, addFeedback, addFeedbackLoading, editFeedbackLoading } =
    useQuestions();

  const [selectedType, setSelectedType] = useState<QuestionFeedbackType>(
    QuestionFeedbackType.Public
  );
  const [content, setContent] = useState('');
  const handleAddQuestionFeedback = async () => {
    await addFeedback({
      content,
      selectedType,
      question,
    });
    onClose();
  };
  const handleEditQuestionFeedback = async () => {
    await editFeedback({
      content,
      selectedType,
      question,
      feedbackId,
    });
    onClose();
  };

  return (
    <QuestionFeedbackModalBlock
      {...modalProps}
      onOk={feedbackId ? handleEditQuestionFeedback : handleAddQuestionFeedback}
      okText={feedbackId ? '수정하기' : '등록하기'}
      cancelText="닫기"
      okButtonProps={{ loading: addFeedbackLoading || editFeedbackLoading }}
    >
      <div className="add-answer-modal-inner">
        <label className="content-label">오류신고 및 답안추가</label>
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
      color: ${palette.emphasisTextColor};
      border: 1px solid ${palette.emphasisTextColor};
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
