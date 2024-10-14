import { Pagination, Skeleton } from 'antd';
import React, { Suspense, useMemo, useState } from 'react';
import styled from 'styled-components';
import { responsive } from '@lib/utils/responsive';
import useQuestions from '@lib/hooks/useQuestions';
import StudyPaymentGuard from '@components/study/StudyPaymentGuard';
import { useRouter } from 'next/router';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { shallowEqual } from 'react-redux';
import SolutionModeCardItem from './SolutionModeCardItem';
import useDeferredRederingForPaginationItemList from '@lib/graphql/hook/useDeferredRederingForPaginationItemList';
import SolutionModeControlButtons from './SolutionModeControlButtons';
import GoogleAd from '@components/common/ad/GoogleAd';

const pageSize = 20;

const SolutionModeComponentBlock = styled.div`
  .solution-mode-solution-card-list {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .solution-mode-pagination-wrapper {
    position: sticky;
    top: 0px;
    background-color: ${({ theme }) => theme.color('colorBgContainer')};
    padding: 10px 0;
    z-index: 10;
    background-color: ${({ theme }) => theme.color('colorBgLayout')};
  }
  .solution-mode-body {
    max-width: 1280px;
    margin: 0 auto;
  }

  @media (max-width: ${responsive.medium}) {
    .solution-mode-body {
      padding: 10px;
    }
  }
`;

interface SolutionModeComponentProps {}

const SolutionModeComponent: React.FC<SolutionModeComponentProps> = () => {
  const [page, setPage] = useState(1);
  const { fetchQuestions, setServerSideQuestions } = useQuestions();

  const questionIds = useAppSelector(
    (state) =>
      state.mockExam.questions?.length
        ? state.mockExam.questions.map((question) => question.id)
        : [],
    shallowEqual
  );

  const totalQuestionCount = questionIds.length;
  const router = useRouter();
  const examIdsQuery = router.query.examIds;

  const examIds = useMemo(() => {
    if (typeof examIdsQuery === 'string') {
      return examIdsQuery.split(',').map((id) => parseInt(id));
    }
    return null;
  }, [examIdsQuery]);

  const AsyncItemList = useDeferredRederingForPaginationItemList(
    questionIds,
    page,
    pageSize,
    (questionId, index) => (
      <>
        <SolutionModeCardItem key={questionId} index={index} />
        {index % 4 === 0 && <GoogleAd />}
      </>
    )
  );

  return (
    <SolutionModeComponentBlock>
      {totalQuestionCount > pageSize && (
        <div className="solution-mode-pagination-wrapper">
          <Pagination
            align="end"
            total={totalQuestionCount}
            pageSize={pageSize}
            current={page}
            onChange={(page, pageSize) => setPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
      <div className="solution-mode-body">
        <SolutionModeControlButtons />
        <ul className="solution-mode-solution-card-list">
          <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
            <AsyncItemList />
          </Suspense>
        </ul>
      </div>

      {examIds && <StudyPaymentGuard examIds={examIds} />}
    </SolutionModeComponentBlock>
  );
};

export default SolutionModeComponent;
