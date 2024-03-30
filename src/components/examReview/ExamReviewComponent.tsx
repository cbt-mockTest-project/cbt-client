import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import useQuestions from '@lib/hooks/useQuestions';
import palette from '@styles/palette';
import { Empty, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExamReviewStateCheckboxGroup from './ExamReviewStateCheckboxGroup';

const ExamReviewComponentBlock = styled.div`
  padding: 20px;
  .exam-review-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: ${palette.colorSubText};
  }
  .exam-review-question-list {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;

interface ExamReviewComponentProps {}

const ExamReviewComponent: React.FC<ExamReviewComponentProps> = () => {
  const router = useRouter();
  const examIds = router.query.examIds as string;
  const categoryName = router.query.categoryName as string;
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const { questions, fetchQuestions, resetQuestions } = useQuestions();

  useEffect(() => {
    resetQuestions();
  }, []);

  if (!categoryName) return null;

  return (
    <ExamReviewComponentBlock>
      <div className="exam-review-title">{`"${categoryName}" 오답노트`}</div>
      <ExamReviewStateCheckboxGroup
        setFetchQuestionsLoading={setFetchQuestionsLoading}
        fetchQuestions={fetchQuestions}
        examIds={examIds}
      />
      <div className="exam-review-question-list">
        {!fetchQuestionsLoading &&
          questions.map((question, index) => (
            <SolutionModeCardItem
              key={question.id}
              defaultQuestion={question}
              index={index}
              isAnswerAllHidden={false}
            />
          ))}
        {!fetchQuestionsLoading && questions.length === 0 && (
          <Empty description="문제가 없습니다." />
        )}
        {fetchQuestionsLoading && (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        )}
      </div>
    </ExamReviewComponentBlock>
  );
};

export default ExamReviewComponent;
