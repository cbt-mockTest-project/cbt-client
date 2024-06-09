import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useQuestion from '@lib/hooks/useQuestion';
import { MockExamQuestion, ReadMockExamQuestionInput } from 'types';
import BasicCard from '@components/common/card/BasicCard';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import { Button } from 'antd';
import useAuth from '@lib/hooks/useAuth';
import Link from 'next/link';
import palette from '@styles/palette';

interface QuestionComponentProps {
  questionQueryInput: ReadMockExamQuestionInput;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionQueryInput,
}) => {
  const { isLoggedIn } = useAuth();
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

  const question = questionQuery?.readMockExamQuestion
    .mockExamQusetion as MockExamQuestion;

  useEffect(() => {
    if (!isLoggedIn || !questionQueryInput.questionId) return;
    refetchQuestion({
      input: questionQueryInput,
    });
  }, [questionQueryInput, isLoggedIn]);

  if (!question) return null;

  return (
    <QuestionComponentBlock>
      {/* {question.mockExam.approved && (
        <div className="question-detail-top-button-wrapper">
          <Link href={`/exam/solution/${question.mockExam.id}?rel=q`}>
            <Button>{`관련 시험지로 이동 >`}</Button>
          </Link>
        </div>
      )} */}
      <BasicCard className="question-detail-question-card" type="primary">
        <div className="question-detail-content-wrapper">
          <StudyQuestionBox
            hasQuestionLink={false}
            hasExamTitle={false}
            saveBookmark={handleSaveBookmark}
            questionNumber={question.number}
            question={question}
          />
        </div>
      </BasicCard>
      <BasicCard className="question-detail-answer-card" type="primary">
        <div className="question-detail-content-wrapper">
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  .question-detail-question-card {
    background-color: rgb(240, 243, 243);
  }
  .question-detail-top-button-wrapper {
    justify-content: space-between;

    display: flex;
    margin-top: 10px;
    gap: 10px;
  }
`;
