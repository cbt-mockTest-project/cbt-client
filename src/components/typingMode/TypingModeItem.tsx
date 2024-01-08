import BasicCard from '@components/common/card/BasicCard';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import useQuestions from '@lib/hooks/useQuestions';
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
        className="study-control-box"
        question={question}
        saveQuestionState={saveQuestionState}
        swiper={swiper}
      />
      <Button
        className="typing-mode-answer-visible-toggle-button"
        onClick={() => setIsAnswerVisible((prev) => !prev)}
      >
        {isAnswerVisible ? '정답 가리기' : '정답 보기'}
      </Button>
      <AnimatePresence>
        {isAnswerVisible && (
          <motion.div
            className="typing-mode-answer-box"
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
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
