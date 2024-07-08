import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import BasicCard from '../common/card/BasicCard';
import StudyAnswerBox from '../study/StudyAnswerBox';
import StudyControlBox from '../study/StudyControlBox';
import StudyQuestionBox from '../study/StudyQuestionBox';
import { IN_PROGRESS_ANSWERS } from '../../_lib/constants/localStorage';
import {
  AddFeedbackInput,
  DeleteFeedbackInput,
  EditFeedbackInput,
  UpdateFeedbackRecommendationInput,
} from '../../_lib/hooks/useQuestionFeedback';
import useQuestionSlide from '../../_lib/hooks/useQuestionSlide';
import useQuestions from '../../_lib/hooks/useQuestions';
import { LocalStorage } from '../../_lib/utils/localStorage';
import { responsive } from '../../_lib/utils/responsive';
import palette from '../../_styles/palette';
import { Button, Input, Tooltip } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import { MockExamQuestion, QuestionState } from '../../types';
const TypingModeItemBlock = styled.div`
  position: relative;
  .typing-mode-textarea {
    margin-top: 10px;
    font-size: 16px;
    padding: 10px 20px;
    border-color: ${({ theme }) => theme.color('colorBorder')};
  }
  .typing-mode-answer-visible-toggle-button {
    margin-top: 10px;
  }
  .typing-mode-answer-box {
    margin-top: 10px;
  }
  .study-control-box {
    margin-top: 10px;
  }
  .typing-mode-answer-button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .typing-mode-swiper-button-wrapper {
    display: none;
  }
  @media (max-width: ${responsive.large}) {
    min-height: calc(100vh - 57px);
    padding-bottom: 70px;
  }
`;

interface TypingModeItemProps {
  question: MockExamQuestion;
  hasDefaultAnswers: boolean | null;
  handleAddFeedback: (
    addFeedbackInput: Omit<AddFeedbackInput, 'setQuestion'>
  ) => Promise<void>;
  handleDeleteFeedback: ({
    question,
    feedback,
  }: Omit<DeleteFeedbackInput, 'setQuestion'>) => Promise<void>;
  handleEditFeedback: (
    editFeedbackInput: Omit<EditFeedbackInput, 'setQuestion'>
  ) => Promise<void>;
  handleUpdateFeedbackRecommendation: ({
    type,
    myRecommendationStatus,
    question,
    feedback,
  }: Omit<UpdateFeedbackRecommendationInput, 'setQuestion'>) => Promise<void>;
  handleSaveBookmark: (question: MockExamQuestion) => Promise<void>;
  handleSaveQuestionState: (
    question: MockExamQuestion,
    state: QuestionState
  ) => Promise<void>;
  clearTextAreaTrigger: boolean;
  number: number;
}

const TypingModeItem: React.FC<TypingModeItemProps> = ({
  question,
  hasDefaultAnswers,
  handleAddFeedback,
  handleDeleteFeedback,
  handleEditFeedback,
  handleUpdateFeedbackRecommendation,
  handleSaveBookmark,
  handleSaveQuestionState,
  number,
}) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const localStorage = new LocalStorage();
  const [defaultAnswer, setDefaultAnswer] = useState<string | null>(null);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const onChangeAnswer = (value: string) => {
    const prevAnswer = localStorage.get(IN_PROGRESS_ANSWERS);
    const newAnswer = {
      ...prevAnswer,
      [question.id]: value,
    };
    if (value === '') {
      delete newAnswer[question.id];
    }
    localStorage.set(IN_PROGRESS_ANSWERS, newAnswer);
  };

  useEffect(() => {
    if (!question) return;
    setDefaultAnswer(localStorage.get(IN_PROGRESS_ANSWERS)[question.id] || '');
  }, [hasDefaultAnswers]);

  useEffect(() => {
    if (isMobile) return;
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [textAreaRef, defaultAnswer]);

  useEffect(() => {
    if (isAnswerVisible) {
      // 부드럽게
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [isAnswerVisible]);

  return (
    <TypingModeItemBlock>
      <BasicCard type="primary">
        <StudyQuestionBox
          question={question}
          saveBookmark={handleSaveBookmark}
          questionNumber={number}
        />
      </BasicCard>
      <Input.TextArea
        ref={textAreaRef}
        key={defaultAnswer + hasDefaultAnswers}
        defaultValue={defaultAnswer}
        className={`typing-mode-textarea n${number}`}
        placeholder="답을 확인하기 전에 먼저 답을 작성해 보세요."
        autoSize={{ minRows: 3, maxRows: 8 }}
        onChange={(e) => onChangeAnswer(e.target.value)}
      />

      <StudyControlBox
        editFeedback={handleEditFeedback}
        addFeedback={handleAddFeedback}
        className="typing-mode-control-box"
        question={question}
        saveQuestionState={handleSaveQuestionState}
      />
      <div className="typing-mode-answer-button-wrapper">
        <Tooltip title={isMobile ? '' : 'shift + spacebar'}>
          <Button
            className="typing-mode-answer-visible-toggle-button"
            onClick={() => setIsAnswerVisible((prev) => !prev)}
          >
            {isAnswerVisible ? '정답 가리기' : '정답 보기'}
          </Button>
        </Tooltip>
      </div>
      <AnimatePresence>
        {isAnswerVisible && (
          <motion.div
            className="typing-mode-answer-box"
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 0 }}
          >
            <BasicCard>
              <StudyAnswerBox
                question={question}
                deleteFeedback={handleDeleteFeedback}
                updateFeedbackRecommendation={
                  handleUpdateFeedbackRecommendation
                }
                editFeedback={handleEditFeedback}
                addFeedback={handleAddFeedback}
              />
            </BasicCard>
          </motion.div>
        )}
      </AnimatePresence>
    </TypingModeItemBlock>
  );
};

export default TypingModeItem;
