import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import EditorStyle from '../../_styles/editorStyle';
import { QuestionState } from '../../types';
import BasicCard from '../common/card/BasicCard';
import StudyQuestionBox from '../study/StudyQuestionBox';
import StudyAnswerBox from '../study/StudyAnswerBox';
import StudyControlBox from '../study/StudyControlBox';
import useQuestions from '../../_lib/hooks/useQuestions';
import { useAppSelector } from '../../_modules/redux/store/configureStore';
import { useEditQuestionBookmark } from '../../_lib/graphql/hook/useQuestionBookmark';
import useAuth from '../../_lib/hooks/useAuth';
import { useChangeQuestionState } from '../../_lib/graphql/hook/useQuestionState';

const SolutionModeCardItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .solution-mode-question-content-wrapper {
    ${EditorStyle}
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .solution-mode-question-card {
    background-color: ${({ theme }) => theme.color('colorFillAlter')};
  }
`;

interface SolutionModeCardItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  isAnswerAllHidden: boolean;
  hasScoreTable?: boolean;
  filterStates?: QuestionState[];
  isStaticPage?: boolean;
}

const SolutionModeCardItem: React.FC<SolutionModeCardItemProps> = ({
  index,
  isAnswerAllHidden,
  hasScoreTable = true,
  filterStates = [],
  isStaticPage,
}) => {
  const {
    addFeedback,
    deleteFeedback,
    editFeedback,
    updateFeedbackRecommendation,
    saveQuestionState,
    saveBookmark,
  } = useQuestions();

  const serverQuestion = useAppSelector((state) =>
    state.mockExam.serverSideQuestions &&
    state.mockExam.serverSideQuestions.length
      ? state.mockExam.serverSideQuestions[index]
      : null
  );
  const clientQuestion = useAppSelector((state) =>
    state.mockExam.questions && state.mockExam.questions.length
      ? state.mockExam.questions[index]
      : null
  );

  const question = useMemo(
    () => (isStaticPage ? clientQuestion || serverQuestion : clientQuestion),
    [clientQuestion, isStaticPage, serverQuestion]
  );

  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  useEffect(() => {
    setIsAnswerHidden(isAnswerAllHidden);
  }, [isAnswerAllHidden]);

  if (filterStates.length > 0) {
    if (!question) return null;
    if (!filterStates.includes(question.myQuestionState)) return null;
  }

  return (
    <SolutionModeCardItemBlock id={`question-${index}`}>
      <BasicCard className="solution-mode-question-card" type="primary">
        <div className="solution-mode-question-content-wrapper">
          <StudyQuestionBox
            questionNumber={index + 1}
            question={question}
            saveBookmark={saveBookmark}
          />
        </div>
      </BasicCard>
      <BasicCard className="solution-mode-solution-card" type="primary">
        <div className="solution-mode-question-content-wrapper">
          <StudyAnswerBox
            deleteFeedback={deleteFeedback}
            updateFeedbackRecommendation={updateFeedbackRecommendation}
            isAnswerHidden={isAnswerHidden}
            question={question}
            editFeedback={editFeedback}
            addFeedback={addFeedback}
          />
        </div>
      </BasicCard>
      <StudyControlBox
        hasHelpButtonText={false}
        addFeedback={addFeedback}
        editFeedback={editFeedback}
        saveQuestionState={saveQuestionState}
        question={question}
        answerHiddenOption={{
          isAnswerHidden,
          setIsAnswerHidden,
        }}
        hasScoreTable={hasScoreTable}
      />
    </SolutionModeCardItemBlock>
  );
};

export default SolutionModeCardItem;
