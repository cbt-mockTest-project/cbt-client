import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import useQuestions from '@lib/hooks/useQuestions';
import { Empty, Pagination, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { Suspense, useDeferredValue, useMemo, useState } from 'react';
import styled from 'styled-components';
import ExamReviewStateCheckboxGroup from './ExamReviewStateCheckboxGroup';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { shallowEqual } from 'react-redux';
import useDeferredRederingForPaginationItemList from '@lib/graphql/hook/useDeferredRederingForPaginationItemList';

const ExamReviewComponentBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .exam-review-header {
    padding: 10px 10px 0px 10px;
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.color('colorBgLayout')};
    z-index: 1;
    border-bottom: 1px solid ${({ theme }) => theme.color('colorBorder')};
    margin-bottom: 20px;
    .exam-review-header-pagination-and-title {
      display: flex;
      justify-content: space-between;
      .exam-review-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: ${({ theme }) => theme.color('colorTextSecondary')};
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .exam-review-header-pagination {
        flex-shrink: 0;
      }
    }
  }
  .exam-review-question-list {
    padding: 0 10px 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;

interface ExamReviewComponentProps {}

const LIMIT = 20;

const ExamReviewComponent: React.FC<ExamReviewComponentProps> = () => {
  const router = useRouter();
  const examIds = router.query.examIds as string;
  const categoryName = router.query.categoryName as string;
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const { fetchQuestions } = useQuestions();
  const [page, setPage] = useState(1);
  const totalQuestionCount = useAppSelector(
    (state) => state.mockExam.questions.length,
    shallowEqual
  );
  const questionIds = useAppSelector(
    (state) => state.mockExam.questions.map((question) => question.id),
    shallowEqual
  );
  const AsyncItemList = useDeferredRederingForPaginationItemList(
    questionIds,
    page,
    LIMIT,
    (questionId, index) => (
      <SolutionModeCardItem
        key={questionId}
        index={index}
        isAnswerAllHidden={false}
      />
    )
  );

  if (!categoryName) return null;

  return (
    <ExamReviewComponentBlock>
      <div className="exam-review-header">
        <ExamReviewStateCheckboxGroup
          setFetchQuestionsLoading={setFetchQuestionsLoading}
          fetchQuestions={fetchQuestions}
          examIds={examIds}
        />
        <div className="exam-review-header-pagination-and-title">
          <div className="exam-review-title">{`오답노트`}</div>
          <Pagination
            className="exam-review-header-pagination"
            total={totalQuestionCount}
            pageSize={LIMIT}
            current={page}
            onChange={(page, pageSize) => setPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
      <div className="exam-review-question-list">
        {!fetchQuestionsLoading && (
          <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
            <AsyncItemList />
          </Suspense>
        )}
        {!fetchQuestionsLoading && questionIds.length === 0 && (
          <Empty description="문제가 없습니다." />
        )}
        {fetchQuestionsLoading && <Skeleton active paragraph={{ rows: 4 }} />}
      </div>
    </ExamReviewComponentBlock>
  );
};

export default ExamReviewComponent;
