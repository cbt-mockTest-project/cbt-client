import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ModalProps, Radio, message } from 'antd';
import { checkboxOption } from 'customTypes';
import {
  MockExamQuestion,
  MockExamQuestionFeedback,
  QuestionFeedbackType,
} from 'types';
import CreateQuestionEditor from '@components/exam/write/CreateQuestionEditor';
import { useCreateQuestionFeedBack } from '@lib/graphql/user/hook/useFeedBack';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { mockExamActions } from '@modules/redux/slices/mockExam';
import { useEditQuestionFeedback } from '@lib/graphql/user/hook/useQuestionFeedback';

export const feedbackOptions: checkboxOption[] = [
  { label: '공개', value: QuestionFeedbackType.Public },
  { label: '비공개', value: QuestionFeedbackType.Private },
  { label: '오류신고', value: QuestionFeedbackType.Report },
];
interface QuestionFeedbackModalProps extends Omit<ModalProps, 'children'> {
  title: string | string[];
  question: MockExamQuestion;
  /**
   * 피드백 수정시 피드백 아이디
   */
  feedbackId?: number;
  onClose: () => void;
}

const QuestionFeedbackModal: React.FC<QuestionFeedbackModalProps> = (props) => {
  const { feedbackId = 0, onClose, question, title, ...modalProps } = props;
  const [addQuestionFeedback, { loading: addQuestionFeedbackLoading }] =
    useCreateQuestionFeedBack();
  const [editQuestionFeedback] = useEditQuestionFeedback();

  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState<QuestionFeedbackType>(
    QuestionFeedbackType.Public
  );
  const [content, setContent] = useState('');
  const handleAddQuestionFeedback = async () => {
    try {
      const res = await addQuestionFeedback({
        variables: {
          input: {
            questionId: question.id,
            type: selectedType,
            content,
          },
        },
      });
      if (!res.data?.createMockExamQuestionFeedback.ok) {
        message.error('피드백 등록에 실패했습니다.');
        return;
      }
      if (res.data?.createMockExamQuestionFeedback.feedback) {
        const newFeedback = res.data?.createMockExamQuestionFeedback
          .feedback as MockExamQuestionFeedback;
        const mockExamQuestionFeedback = [...question.mockExamQuestionFeedback];
        if (newFeedback.type === QuestionFeedbackType.Private) {
          mockExamQuestionFeedback.unshift(newFeedback);
        } else {
          mockExamQuestionFeedback.push(newFeedback);
        }
        const newQuestion = {
          ...question,
          mockExamQuestionFeedback,
        };
        dispatch(mockExamActions.setQuestion(newQuestion as MockExamQuestion));
        message.success('피드백이 등록되었습니다.');
        onClose();
      }
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('피드백 등록에 실패했습니다.');
    }
  };
  const handleEditQuestionFeedback = async () => {
    try {
      const res = await editQuestionFeedback({
        variables: {
          input: {
            id: feedbackId,
            content,
            type: selectedType,
          },
        },
      });
      if (!res.data?.editMockExamQuestionFeedback.ok) {
        message.error('피드백 수정에 실패했습니다.');
        return;
      }
      const newQuestion: MockExamQuestion = {
        ...question,
        mockExamQuestionFeedback: question.mockExamQuestionFeedback.map(
          (el) => {
            if (el.id === feedbackId) {
              return {
                ...el,
                content,
                type: selectedType,
              };
            }
            return el;
          }
        ),
      };
      dispatch(mockExamActions.setQuestion(newQuestion));
      message.success('피드백이 수정되었습니다.');
      onClose();
    } catch {
      dispatch(mockExamActions.setQuestion(question));
      message.error('피드백 수정에 실패했습니다.');
    }
  };

  return (
    <QuestionFeedbackModalBlock
      {...modalProps}
      onOk={feedbackId ? handleEditQuestionFeedback : handleAddQuestionFeedback}
      okText={feedbackId ? '수정하기' : '등록하기'}
      cancelText="닫기"
      okButtonProps={{ loading: addQuestionFeedbackLoading }}
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
      color: ${palette.antd_blue_01};
      border: 1px solid ${palette.antd_blue_01};
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
