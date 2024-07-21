import { Button, Tooltip, Pagination, Skeleton } from 'antd';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { ReadQuestionsByExamIdsInput } from 'types';
import { responsive } from '@lib/utils/responsive';
import useQuestions from '@lib/hooks/useQuestions';
import SelectStudyModeModal from './SelectStudyModeModal';
import StudyPaymentGuard from '@components/study/StudyPaymentGuard';
import { useRouter } from 'next/router';
import LoopIcon from '@mui/icons-material/Loop';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { shallowEqual } from 'react-redux';
import SolutionModeCardItem from './SolutionModeCardItem';
import useDeferredRederingForPaginationItemList from '@lib/graphql/hook/useDeferredRederingForPaginationItemList';
import ToggleAnswerAllHiddenButton from './ToggleAnswerAllHiddenButton';

const LIMIT = 20;

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

  .solution-mode-control-button-wrapper {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    .solution-mode-control-button-inner {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
    }
  }

  @media (max-width: ${responsive.medium}) {
    .solution-mode-body {
      padding: 10px;
    }
  }
`;

interface SolutionModeComponentProps {
  questionsQueryInput?: ReadQuestionsByExamIdsInput;
}

const SolutionModeComponent: React.FC<SolutionModeComponentProps> = ({
  questionsQueryInput,
}) => {
  const [page, setPage] = useState(1);
  const isStaticPage = !!questionsQueryInput;
  const { shuffleQuestions, fetchQuestions, setServerSideQuestions } =
    useQuestions();

  const serverSideQuestionIds = useAppSelector(
    (state) =>
      state.mockExam.serverSideQuestions?.length
        ? state.mockExam.serverSideQuestions.map((question) => question.id)
        : [],
    shallowEqual
  );
  const clientSideQuestionIds = useAppSelector(
    (state) =>
      state.mockExam.questions?.length
        ? state.mockExam.questions.map((question) => question.id)
        : [],
    shallowEqual
  );
  const questionIds = useMemo(() => {
    if (isStaticPage) {
      if (clientSideQuestionIds.length > 0) {
        return clientSideQuestionIds;
      }
      if (serverSideQuestionIds.length > 0) {
        return serverSideQuestionIds;
      }
    } else {
      return clientSideQuestionIds;
    }
  }, [serverSideQuestionIds, clientSideQuestionIds, isStaticPage]);
  const totalQuestionCount = questionIds.length;
  const router = useRouter();
  const examIdsQuery = router.query.examIds;
  const [isSelectStudyModeModalOpen, setIsSelectStudyModeModalOpen] =
    useState(false);
  const examIds = useMemo(() => {
    if (questionsQueryInput) return questionsQueryInput.ids;
    if (typeof examIdsQuery === 'string') {
      return examIdsQuery.split(',').map((id) => parseInt(id));
    }
    return null;
  }, [questionsQueryInput, examIdsQuery]);

  const AsyncItemList = useDeferredRederingForPaginationItemList(
    questionIds,
    page,
    LIMIT,
    (questionId, index) => (
      <SolutionModeCardItem
        key={questionId}
        index={index}
        isStaticPage={isStaticPage}
      />
    )
  );

  const StaticItemList = useMemo(() => {
    return questionIds.map((questionId, index) => (
      <SolutionModeCardItem
        key={questionId}
        index={index}
        isStaticPage={isStaticPage}
      />
    ));
  }, [questionIds, isStaticPage]);

  useEffect(() => {
    if (questionsQueryInput) {
      fetchQuestions(questionsQueryInput, 'network-only').then(() => {
        setServerSideQuestions(null);
      });
    }
  }, []);
  return (
    <SolutionModeComponentBlock>
      {!isStaticPage && (
        <div className="solution-mode-pagination-wrapper">
          <Pagination
            align="end"
            total={totalQuestionCount}
            pageSize={LIMIT}
            current={page}
            onChange={(page, pageSize) => setPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
      <div className="solution-mode-body">
        <div className="solution-mode-control-button-wrapper">
          <ToggleAnswerAllHiddenButton />
          <Tooltip title="문제 순서를 섞습니다.">
            <Button onClick={shuffleQuestions}>
              <div className="solution-mode-control-button-inner">
                <ShuffleIcon />
                섞기
              </div>
            </Button>
          </Tooltip>
          <Tooltip title="학습 형태를 변경합니다.">
            <Button onClick={() => setIsSelectStudyModeModalOpen(true)}>
              <div className="solution-mode-control-button-inner">
                <LoopIcon />
                형태
              </div>
            </Button>
          </Tooltip>
        </div>
        <ul className="solution-mode-solution-card-list">
          {isStaticPage ? (
            StaticItemList
          ) : (
            <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
              <AsyncItemList />
            </Suspense>
          )}
        </ul>
      </div>
      {isSelectStudyModeModalOpen && (
        <SelectStudyModeModal
          open={isSelectStudyModeModalOpen}
          onCancel={() => setIsSelectStudyModeModalOpen(false)}
        />
      )}
      {examIds && <StudyPaymentGuard examIds={examIds} />}
    </SolutionModeComponentBlock>
  );
};

export default SolutionModeComponent;
