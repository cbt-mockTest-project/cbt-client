import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ReadQuestionsByExamIdsInput } from 'types';
import { responsive } from '@lib/utils/responsive';
import useQuestions from '@lib/hooks/useQuestions';
import StudyPaymentGuard from '@components/study/StudyPaymentGuard';
import { useRouter } from 'next/router';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { shallowEqual } from 'react-redux';
import SolutionModeCardItem from './SolutionModeCardItem';
import SolutionModeControlButtons from './SolutionModeControlButtons';

const SolutionModeCompoForStaticPagenentBlock = styled.div`
  margin: 20px 0;
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

interface SolutionModeCompoForStaticPagenentProps {
  questionsQueryInput?: ReadQuestionsByExamIdsInput;
}

const SolutionModeForStaticPageComponent: React.FC<
  SolutionModeCompoForStaticPagenentProps
> = ({ questionsQueryInput }) => {
  const { fetchQuestions, setServerSideQuestions } = useQuestions();

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
    if (clientSideQuestionIds.length > 0) {
      return clientSideQuestionIds;
    }
    if (serverSideQuestionIds.length > 0) {
      return serverSideQuestionIds;
    }
    return [];
  }, [serverSideQuestionIds, clientSideQuestionIds]);
  const router = useRouter();
  const examIdsQuery = router.query.examIds;

  const examIds = useMemo(() => {
    if (questionsQueryInput) return questionsQueryInput.ids;
    if (typeof examIdsQuery === 'string') {
      return examIdsQuery.split(',').map((id) => parseInt(id));
    }
    return null;
  }, [questionsQueryInput, examIdsQuery]);

  useEffect(() => {
    if (questionsQueryInput) {
      fetchQuestions(questionsQueryInput, 'network-only').then(() => {
        setServerSideQuestions(null);
      });
    }
  }, []);
  return (
    <SolutionModeCompoForStaticPagenentBlock>
      <div className="solution-mode-body">
        <SolutionModeControlButtons />
        <ul className="solution-mode-solution-card-list">
          {questionIds.map((questionId, index) => (
            <SolutionModeCardItem
              key={questionId}
              index={index}
              isStaticPage={true}
            />
          ))}
        </ul>
      </div>

      {examIds && <StudyPaymentGuard examIds={examIds} />}
    </SolutionModeCompoForStaticPagenentBlock>
  );
};

export default SolutionModeForStaticPageComponent;
