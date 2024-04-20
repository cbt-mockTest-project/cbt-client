import CardModeItem from '@components/cardMode/CardModeItem';
import TypingModeItem from '@components/typingMode/TypingModeItem';
import useHandleQuestion from '@lib/hooks/useHandleQuestion';
import useQuestions from '@lib/hooks/useQuestions';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MockExamQuestion } from 'types';

const StudyModeItemWrapperBlock = styled.div``;

interface StudyModeItemWrapperProps {
  hasDefaultAnswers: boolean | null;
  number: number;
}

const StudyModeItemWrapper: React.FC<StudyModeItemWrapperProps> = ({
  number,
  hasDefaultAnswers,
}) => {
  const question = useAppSelector(
    (state) => state.mockExam.questions[number - 1]
  );
  const router = useRouter();
  const mode = router.query.mode as 'card' | 'typing';

  const {
    addFeedback,
    deleteFeedback,
    editFeedback,
    updateFeedbackRecommendation,
    saveBookmark,
    saveQuestionState,
  } = useQuestions();

  return (
    <StudyModeItemWrapperBlock>
      {mode === 'card' && (
        <CardModeItem
          question={question}
          handleAddFeedback={addFeedback}
          handleDeleteFeedback={deleteFeedback}
          handleEditFeedback={editFeedback}
          handleUpdateFeedbackRecommendation={updateFeedbackRecommendation}
          handleSaveBookmark={saveBookmark}
          handleSaveQuestionState={saveQuestionState}
          number={number}
        />
      )}
      {mode === 'typing' && (
        <TypingModeItem
          question={question}
          hasDefaultAnswers={hasDefaultAnswers}
          handleAddFeedback={addFeedback}
          handleDeleteFeedback={deleteFeedback}
          handleEditFeedback={editFeedback}
          handleUpdateFeedbackRecommendation={updateFeedbackRecommendation}
          handleSaveBookmark={saveBookmark}
          handleSaveQuestionState={saveQuestionState}
          clearTextAreaTrigger={false}
          number={number}
        />
      )}
    </StudyModeItemWrapperBlock>
  );
};

export default StudyModeItemWrapper;
