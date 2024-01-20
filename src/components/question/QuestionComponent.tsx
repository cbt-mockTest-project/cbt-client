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

interface QuestionComponentProps {
  questionQueryInput: ReadMockExamQuestionInput;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionQueryInput,
}) => {
  const { isLoggedIn, user } = useAuth();
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

  const isMyQuestion = question.user.id == user?.id;

  useEffect(() => {
    if (!isLoggedIn || !questionQueryInput.questionId) return;
    refetchQuestion({
      input: questionQueryInput,
    });
  }, [questionQueryInput, isLoggedIn]);

  if (!question) return null;

  return (
    <QuestionComponentBlock>
      {isMyQuestion && (
        <Link href={`/question/${question.id}/edit`}>
          <Button type="primary" className="question-detail-edit-button">
            수정
          </Button>
        </Link>
      )}
      <BasicCard className="question-detail-card" type="primary">
        <div className="question-detail-content-wrapper">
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
  .question-detail-edit-button {
    margin-bottom: 10px;
  }
`;
