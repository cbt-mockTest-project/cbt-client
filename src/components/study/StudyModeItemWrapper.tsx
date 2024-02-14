import CardModeItem from '@components/cardMode/CardModeItem';
import TypingModeItem from '@components/typingMode/TypingModeItem';
import useHandleQuestion from '@lib/hooks/useHandleQuestion';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';

const StudyModeItemWrapperBlock = styled.div``;

interface StudyModeItemWrapperProps {
  question: MockExamQuestion;
  clearTextAreaTrigger: boolean;
  number: number;
  swiper: any;
}

const StudyModeItemWrapper: React.FC<StudyModeItemWrapperProps> = ({
  question: defaultQuestion,
  number,
  swiper,
}) => {
  const router = useRouter();
  const mode = router.query.mode as 'card' | 'typing';
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

  useEffect(() => {
    setQuestion(defaultQuestion);
  }, [defaultQuestion]);

  return (
    <StudyModeItemWrapperBlock>
      {mode === 'card' && (
        <CardModeItem
          question={question}
          handleAddFeedback={handleAddFeedback}
          handleDeleteFeedback={handleDeleteFeedback}
          handleEditFeedback={handleEditFeedback}
          handleUpdateFeedbackRecommendation={
            handleUpdateFeedbackRecommendation
          }
          handleSaveBookmark={handleSaveBookmark}
          handleSaveQuestionState={handleSaveQuestionState}
          number={number}
          swiper={swiper}
        />
      )}
      {mode === 'typing' && (
        <TypingModeItem
          question={question}
          handleAddFeedback={handleAddFeedback}
          handleDeleteFeedback={handleDeleteFeedback}
          handleEditFeedback={handleEditFeedback}
          handleUpdateFeedbackRecommendation={
            handleUpdateFeedbackRecommendation
          }
          handleSaveBookmark={handleSaveBookmark}
          handleSaveQuestionState={handleSaveQuestionState}
          clearTextAreaTrigger={false}
          number={number}
          swiper={swiper}
        />
      )}
    </StudyModeItemWrapperBlock>
  );
};

export default StudyModeItemWrapper;
