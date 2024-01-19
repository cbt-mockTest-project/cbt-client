import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import BasicCard from '@components/common/card/BasicCard';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import useQuestions from '@lib/hooks/useQuestions';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Input } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperCore from 'swiper';
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
  number: number;
  swiper: any;
}

const TypingModeItem: React.FC<TypingModeItemProps> = ({
  question,
  number,
  swiper,
}) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const {
    saveBookmark,
    saveQuestionState,
    editFeedback,
    addFeedback,
    deleteFeedback,
    updateFeedbackRecommendation,
  } = useQuestions();
  return (
    <TypingModeItemBlock>
      <BasicCard type="primary">
        <StudyQuestionBox
          question={question}
          saveBookmark={saveBookmark}
          questionNumber={number}
        />
      </BasicCard>
      <Input.TextArea
        className="typing-mode-textarea"
        placeholder="답을 확인하기 전에 먼저 답을 작성해 보세요."
        autoSize={{ minRows: 3, maxRows: 8 }}
      />

      <StudyControlBox
        editFeedback={editFeedback}
        addFeedback={addFeedback}
        className="typing-mode-control-box"
        question={question}
        saveQuestionState={saveQuestionState}
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
            onClick={() => {
              swiper.slidePrev();
            }}
          >
            <LeftOutlined />
          </button>
          <button
            className="typing-mode-control-button"
            onClick={() => {
              swiper.slideNext();
            }}
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
                deleteFeedback={deleteFeedback}
                updateFeedbackRecommendation={updateFeedbackRecommendation}
                editFeedback={editFeedback}
                addFeedback={addFeedback}
              />
            </BasicCard>
          </motion.div>
        )}
      </AnimatePresence>
    </TypingModeItemBlock>
  );
};

export default TypingModeItem;
