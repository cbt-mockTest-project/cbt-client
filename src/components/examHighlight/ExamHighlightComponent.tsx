import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import useQuestions from '@lib/hooks/useQuestions';
import { App, Empty, Pagination, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { shallowEqual } from 'react-redux';
import useDeferredRederingForPaginationItemList from '@lib/graphql/hook/useDeferredRederingForPaginationItemList';
import { isUndefined } from 'lodash';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import ExamHighlightHeader from './ExamHighlightHeader';

const ExamHighlightComponentBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .exam-highlight-header {
    padding: 10px 10px 0px 10px;
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.color('colorBgLayout')};
    z-index: 10;
    border-bottom: 1px solid ${({ theme }) => theme.color('colorBorder')};
    margin-bottom: 20px;
    .exam-highlight-header-pagination {
      padding-bottom: 10px;
    }
  }
  .exam-highlight-question-list {
    padding: 0 10px 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;

interface ExamHighlightComponentProps {}

const LIMIT = 20;

const ExamHighlightComponent: React.FC<ExamHighlightComponentProps> = () => {
  const { message } = App.useApp();
  const { data: meQuery } = useMeQuery();
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
      <SolutionModeCardItem key={questionId} index={index} />
    )
  );

  useEffect(() => {
    if (!router.query.examIds) return;
    if (isUndefined(meQuery)) return;
    if (!meQuery.me.ok) {
      message.error('로그인이 필요한 서비스입니다.');
      router.back();
      return;
    }
    setFetchQuestionsLoading(true);
    fetchQuestions({
      ids: examIds.split(',').map((id) => +id),
      highlighted: true,
    }).then(() => setFetchQuestionsLoading(false));
  }, [examIds, meQuery]);

  if (!categoryName) return null;

  return (
    <ExamHighlightComponentBlock>
      <ExamHighlightHeader />
      <div className="exam-highlight-header">
        <Pagination
          className="exam-highlight-header-pagination"
          align="end"
          total={totalQuestionCount}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
        />
      </div>
      <div className="exam-highlight-question-list">
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
    </ExamHighlightComponentBlock>
  );
};

export default ExamHighlightComponent;
