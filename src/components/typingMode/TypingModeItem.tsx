import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import { IN_PROGRESS_ANSWERS } from '@lib/constants/localStorage';
import useHandleQuestion from '@lib/hooks/useHandleQuestion';
import useQuestionSlide from '@lib/hooks/useQuestionSlide';
import useQuestions from '@lib/hooks/useQuestions';
import { LocalStorage } from '@lib/utils/localStorage';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Input, Modal } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';
const TypingModeItemBlock = styled.div`
  .typing-mode-textarea {
    border-color: ${palette.colorBorder};
  }
  .typing-mode-answer-button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .typing-mode-swiper-button-wrapper {
      display: none;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      gap: 10px;
      margin-right: 10px;
      margin-top: 10px;
      .typing-mode-control-button {
        padding: 5px;
        border: 2px solid ${palette.colorBorder};
        color: ${palette.colorText};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: ${palette.antd_blue_02};
        }
        svg {
          font-size: 20px;
        }
      }
    }
  }
  @media (max-width: ${responsive.large}) {
    .typing-mode-answer-button-wrapper {
      .typing-mode-swiper-button-wrapper {
        display: flex;
      }
    }
  }
`;

interface TypingModeItemProps {
  question: MockExamQuestion;
  clearTextAreaTrigger: boolean;
  number: number;
  swiper: any;
}

const TypingModeItem: React.FC<TypingModeItemProps> = ({
  question: defaultQuestion,
  number,
  swiper,
  clearTextAreaTrigger,
}) => {
  const router = useRouter();
  const { questions } = useQuestions();
  const qIndex =
    typeof router.query.qIndex === 'string' ? Number(router.query.qIndex) : 0;
  const handleFinalClick = () => {
    Modal.confirm({
      title: '학습을 종료하시겠습니까?',
      okText: '종료',
      cancelText: '취소',
      onOk: () => {
        router.replace({
          pathname: router.pathname,
          query: { ...router.query, tab: 'end' },
        });
      },
    });
  };
  const questionIndex = Number(router.query.questionIndex);
  const localStorage = new LocalStorage();
  const [answer, setAnswer] = useState('');
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const { handleSlideNext, handleSlidePrev } = useQuestionSlide();
  const {
    question,
    setQuestion,
    handleAddFeedback,
    handleDeleteFeedback,
    handleEditFeedback,
    handleUpdateFeedbackRecommendation,
    handleSaveBookmark,
    handleSaveQuestionState,
  } = useHandleQuestion({ defaultQuestion });
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
    setAnswer(value);
  };

  useEffect(() => {
    if (!answer) {
      setAnswer(localStorage.get(IN_PROGRESS_ANSWERS)[question.id] || '');
    }
  }, [questionIndex]);

  useEffect(() => {
    if (clearTextAreaTrigger) {
      setAnswer('');
    }
  }, [clearTextAreaTrigger]);

  useEffect(() => {
    setQuestion(defaultQuestion);
  }, [defaultQuestion]);
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
        value={answer}
        className="typing-mode-textarea"
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
        swiper={swiper}
      />
      <div className="typing-mode-answer-button-wrapper">
        <Button
          className="typing-mode-answer-visible-toggle-button"
          onClick={() => setIsAnswerVisible((prev) => !prev)}
        >
          {isAnswerVisible ? '정답 가리기' : '정답 보기'}
        </Button>
        <div className="typing-mode-swiper-button-wrapper">
          <button
            className="typing-mode-control-button"
            onClick={() => handleSlidePrev(swiper)}
          >
            <LeftOutlined />
          </button>
          <button
            className="typing-mode-control-button"
            onClick={() => handleSlideNext(questions.length, swiper)}
          >
            <RightOutlined />
          </button>
        </div>
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
