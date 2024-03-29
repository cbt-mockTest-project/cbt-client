import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditorStyle from '@styles/editorStyle';
import { ReadQuestionsByExamIdsOutput } from 'types';
import BasicCard from '@components/common/card/BasicCard';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import palette from '@styles/palette';
import useHandleQuestion from '@lib/hooks/useHandleQuestion';

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
  defaultQuestion: ReadQuestionsByExamIdsOutput['questions'][0];
  index: number;
  isAnswerAllHidden: boolean;
  hasScoreTable?: boolean;
}

const SolutionModeCardItem: React.FC<SolutionModeCardItemProps> = ({
  defaultQuestion,
  index,
  isAnswerAllHidden,
  hasScoreTable = true,
}) => {
  const {
    question,
    setQuestion,
    handleSaveQuestionState,
    handleSaveBookmark,
    handleAddFeedback,
    handleDeleteFeedback,
    handleEditFeedback,
    handleUpdateFeedbackRecommendation,
  } = useHandleQuestion({
    defaultQuestion,
  });
  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  useEffect(() => {
    setIsAnswerHidden(isAnswerAllHidden);
  }, [isAnswerAllHidden]);

  useEffect(() => {
    setQuestion(defaultQuestion);
  }, [defaultQuestion]);

  return (
    <SolutionModeCardItemBlock id={`question-${index}`}>
      <BasicCard className="solution-mode-question-card" type="primary">
        <div className="solution-mode-question-content-wrapper">
          <StudyQuestionBox
            saveBookmark={handleSaveBookmark}
            questionNumber={index + 1}
            question={question}
          />
        </div>
      </BasicCard>
      <BasicCard className="solution-mode-solution-card" type="primary">
        <div className="solution-mode-question-content-wrapper">
          <StudyAnswerBox
            deleteFeedback={handleDeleteFeedback}
            updateFeedbackRecommendation={handleUpdateFeedbackRecommendation}
            isAnswerHidden={isAnswerHidden}
            question={question}
            editFeedback={handleEditFeedback}
            addFeedback={handleAddFeedback}
          />
        </div>
      </BasicCard>
      <StudyControlBox
        hasHelpButtonText={false}
        addFeedback={handleAddFeedback}
        editFeedback={handleEditFeedback}
        saveQuestionState={handleSaveQuestionState}
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
