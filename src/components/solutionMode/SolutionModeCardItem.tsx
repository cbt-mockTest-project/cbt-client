import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditorStyle from '@styles/editorStyle';
import {
  MockExamQuestion,
  QuestionState,
  ReadQuestionsByExamIdsOutput,
} from 'types';
import BasicCard from '@components/common/card/BasicCard';
import useQuestions from '@lib/hooks/useQuestions';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import palette from '@styles/palette';

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
    background-color: ${palette.colorContainerBgGrey};
  }
`;

interface SolutionModeCardItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  question: ReadQuestionsByExamIdsOutput['questions'][0];
  saveBookmark: (question: MockExamQuestion) => Promise<void>;
  saveQuestionState: (
    question: MockExamQuestion,
    state: QuestionState
  ) => Promise<void>;
  index: number;
  isAnswerAllHidden: boolean;
}

const SolutionModeCardItem: React.FC<SolutionModeCardItemProps> = ({
  question,
  index,
  isAnswerAllHidden,
  saveBookmark,
  saveQuestionState,
}) => {
  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  const {
    editFeedback,
    addFeedback,
    deleteFeedback,
    updateFeedbackRecommendation,
  } = useQuestions();
  useEffect(() => {
    setIsAnswerHidden(isAnswerAllHidden);
  }, [isAnswerAllHidden]);

  return (
    <SolutionModeCardItemBlock id={`question-${index}`}>
      <BasicCard className="solution-mode-question-card" type="primary">
        <div className="solution-mode-question-content-wrapper">
          <StudyQuestionBox
            saveBookmark={saveBookmark}
            questionNumber={index + 1}
            question={question}
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
        addFeedback={addFeedback}
        editFeedback={editFeedback}
        saveQuestionState={saveQuestionState}
        question={question}
        answerHiddenOption={{
          isAnswerHidden,
          setIsAnswerHidden,
        }}
      />
    </SolutionModeCardItemBlock>
  );
};

export default SolutionModeCardItem;
