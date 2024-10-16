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
import ExamMemoHeader from './ExamMemoHeader';
import ObjectiveStudyAutoModeItem from '@components/study/objective/autoMode/ObjectiveStudyAutoModeItem';
import GoogleAd from '@components/common/ad/GoogleAd';

const ExamMemoComponentBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .objective-study-mode-item-wrapper {
    padding: 16px 10px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.color('colorBorder')};
  }
  .exam-memo-header {
    padding: 10px 10px 0px 10px;
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.color('colorBgLayout')};
    z-index: 10;
    border-bottom: 1px solid ${({ theme }) => theme.color('colorBorder')};
    margin-bottom: 20px;
    .exam-memo-header-pagination {
      padding-bottom: 10px;
    }
  }
  .exam-memo-question-list {
    padding: 0 10px 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;

interface ExamMemoComponentProps {}

const LIMIT = 20;

const ExamMemoComponent: React.FC<ExamMemoComponentProps> = () => {
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
    (state) =>
      state.mockExam.questions.map((question) => ({
        id: question.id,
        isObjective: question.objectiveData ? true : false,
      })),
    (left, right) =>
      left.length === right.length &&
      left.every((item, index) => item.id === right[index].id)
  );
  const AsyncItemList = useDeferredRederingForPaginationItemList(
    questionIds,
    page,
    LIMIT,
    (questionId, index) =>
      questionId.isObjective ? (
        <div className="objective-study-mode-item-wrapper">
          <ObjectiveStudyAutoModeItem
            key={questionId.id}
            index={index}
            questionId={questionId.id}
          />
        </div>
      ) : (
        <>
          <SolutionModeCardItem key={questionId.id} index={index} />
          {index % 4 === 0 && <GoogleAd />}
        </>
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
      feedbacked: true,
    }).then(() => setFetchQuestionsLoading(false));
  }, [examIds, meQuery]);

  if (!categoryName) return null;

  return (
    <ExamMemoComponentBlock>
      <ExamMemoHeader />
      <div className="exam-memo-header">
        <Pagination
          className="exam-memo-header-pagination"
          align="end"
          total={totalQuestionCount}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
        />
      </div>
      <div className="exam-memo-question-list">
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
    </ExamMemoComponentBlock>
  );
};

export default ExamMemoComponent;
