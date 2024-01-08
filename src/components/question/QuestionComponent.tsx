import { ReadMockExamQuestionQuery } from '@lib/graphql/query/questionQuery.generated';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useQuestion from '@lib/hooks/useQuestion';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { MockExamQuestion, ReadMockExamQuestionInput } from 'types';
import BasicCard from '@components/common/card/BasicCard';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import palette from '@styles/palette';

interface QuestionComponentProps {
  questionQueryInput: ReadMockExamQuestionInput;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionQueryInput,
}) => {
  const { data: meQuery } = useMeQuery();
  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  const {
    refetchQuestion,
    handleSaveBookmark,
    questionQuery,
    handleAddFeedback,
    handleEditFeedback,
    handleSaveQuestionState,
    handleDeleteFeedback,
    handleUpdateFeedbackRecommendation,
  } = useQuestion(questionQueryInput);
  useEffect(() => {
    if (!meQuery?.me.user || !questionQueryInput.questionId) return;
    refetchQuestion({
      input: questionQueryInput,
    });
  }, [questionQueryInput, meQuery]);

  const question = questionQuery?.readMockExamQuestion
    .mockExamQusetion as MockExamQuestion;
  if (!question) return null;
  return (
    <QuestionComponentBlock>
      <BasicCard className="solution-mode-question-card" type="primary">
        <div className="solution-mode-question-content-wrapper">
          <StudyQuestionBox
            saveBookmark={handleSaveBookmark}
            questionNumber={question.number}
            question={question}
          />
          <StudyAnswerBox
            question={question}
            isAnswerHidden={isAnswerHidden}
            addFeedback={handleAddFeedback}
            editFeedback={handleEditFeedback}
            deleteFeedback={handleDeleteFeedback}
            updateFeedbackRecommendation={handleUpdateFeedbackRecommendation}
          />
        </div>
      </BasicCard>
      <StudyControlBox
        addFeedback={handleAddFeedback}
        editFeedback={handleEditFeedback}
        saveQuestionState={handleSaveQuestionState}
        question={question}
        hasScoreTable={false}
        answerHiddenOption={{
          isAnswerHidden,
          setIsAnswerHidden,
        }}
      />
    </QuestionComponentBlock>
  );
};

export default QuestionComponent;

const QuestionComponentBlock = styled.div`
  background-color: inherit;
`;
