import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useQuestion from '@lib/hooks/useQuestion';
import { MockExamQuestion, ReadMockExamQuestionInput, UserRole } from 'types';
import BasicCard from '@components/common/card/BasicCard';
import StudyQuestionBox from '@components/study/StudyQuestionBox';
import StudyAnswerBox from '@components/study/StudyAnswerBox';
import StudyControlBox from '@components/study/StudyControlBox';
import { Button, Skeleton } from 'antd';
import useAuth from '@lib/hooks/useAuth';
import Link from 'next/link';
import { removeHtmlTag } from '@lib/utils/utils';
import { useRouter } from 'next/router';

interface QuestionComponentProps {
  questionQueryInput: ReadMockExamQuestionInput;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionQueryInput,
}) => {
  const router = useRouter();
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
  const { isLoggedIn } = useAuth();
  const [isAnswerHidden, setIsAnswerHidden] = useState(false);
  const isAdmin = [UserRole.Admin, UserRole.Partner].includes(
    question.user.role
  );
  const isApproved = question.mockExam.approved;
  const [isHidden, setIsHidden] = useState(!isAdmin && !isApproved);

  useEffect(() => {
    if (!isLoggedIn || !questionQueryInput.questionId) return;
    refetchQuestion({
      input: questionQueryInput,
    });
  }, [questionQueryInput, isLoggedIn]);

  useEffect(() => {
    if (!isAdmin && !isApproved) {
      setIsHidden(true);
      setTimeout(() => {
        router.replace('/');
      }, 2000);
    }
  }, [isAdmin]);

  if (
    !question ||
    removeHtmlTag(question.question).length < 3 ||
    removeHtmlTag(question.solution).length < 3
  )
    return null;
  if (isHidden) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }
  return (
    <QuestionComponentBlock isHidden={isHidden}>
      {isAdmin && question.mockExam?.approved && (
        <div className="question-detail-top-button-wrapper">
          <Link href={`/exam/solution/${question.mockExam.id}?rel=q`}>
            <Button>{`관련 시험지로 이동 >`}</Button>
          </Link>
        </div>
      )}
      <BasicCard className="question-detail-question-card" type="primary">
        <div className="question-detail-content-wrapper">
          <StudyQuestionBox
            hasQuestionLink={false}
            hasExamTitle={false}
            saveBookmark={handleSaveBookmark}
            questionNumber={question.number}
            question={question}
            isVisibleImage={isAdmin}
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

const QuestionComponentBlock = styled.div<{ isHidden: boolean }>`
  background-color: inherit;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  display: ${(props) => (props.isHidden ? 'none' : 'flex')};
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
