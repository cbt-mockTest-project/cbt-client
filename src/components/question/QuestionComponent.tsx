import React, { useState } from 'react';
import styled from 'styled-components';
import useQuestion from '@lib/hooks/useQuestion';
import { ReadMockExamQuestionInput, UserRole } from 'types';
import BasicCard from '@components/common/card/BasicCard';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import { Button } from 'antd';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  getQuestionKey,
  getQuestionQueryOption,
} from '@lib/queryOptions/getQuestionQueryOption';
import { removeHtmlTag } from '@lib/utils/utils';

interface QuestionComponentProps {
  questionQueryInput: ReadMockExamQuestionInput;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionQueryInput,
}) => {
  const {
    handleAddFeedback,
    handleEditFeedback,
    handleSaveQuestionState,
    handleDeleteFeedback,
    handleUpdateFeedbackRecommendation,
  } = useQuestion(questionQueryInput);
  const { data: questionResponse } = useQuery(
    getQuestionQueryOption({
      queryKey: getQuestionKey(questionQueryInput.questionId) as string[],
      input: questionQueryInput,
    })
  );
  const question = questionResponse?.mockExamQusetion;
  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  const isAdmin = [UserRole.Admin, UserRole.Partner].includes(
    question?.user?.role
  );

  if (
    !question ||
    (removeHtmlTag(question.question).trim().length === 0 &&
      removeHtmlTag(question.solution).trim().length === 0)
  )
    return null;

  return (
    <QuestionComponentBlock>
      {(isAdmin || question.mockExam?.approved) && (
        <div className="question-detail-top-button-wrapper">
          <Link href={`/exam/solution/${question.mockExam.id}?rel=q`}>
            <Button>{`관련 시험지로 이동 >`}</Button>
          </Link>
        </div>
      )}
      <BasicCard className="question-detail-question-card" type="primary">
        <div className="question-detail-content-wrapper">
          <StudyQuestionBox
            canHighlight={false}
            hasQuestionLink={false}
            hasExamTitle={false}
            questionNumber={question.number}
            question={question}
            isVisibleImage={isAdmin}
          />
        </div>
      </BasicCard>
      <BasicCard className="question-detail-answer-card" type="primary">
        <div className="question-detail-content-wrapper">
          <StudyAnswerBox
            canHighlight={false}
            question={question}
            isAnswerHidden={isAnswerHidden}
            addFeedback={handleAddFeedback}
            editFeedback={handleEditFeedback}
            deleteFeedback={handleDeleteFeedback}
            updateFeedbackRecommendation={handleUpdateFeedbackRecommendation}
            isVisibleImage={isAdmin}
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
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  display: flex;
  .question-detail-question-card {
    background-color: ${({ theme }) => theme.color('colorFillAlter')};
  }
  .question-detail-top-button-wrapper {
    justify-content: space-between;

    display: flex;
    margin-top: 10px;
    gap: 10px;
  }
`;
