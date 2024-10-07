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
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { isUndefined } from 'lodash';

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
  questionsQueryInput: ReadQuestionsByExamIdsInput;
}

const SolutionModeForStaticPageComponent: React.FC<
  SolutionModeCompoForStaticPagenentProps
> = ({ questionsQueryInput }) => {
  const router = useRouter();
  const { data: meQuery } = useMeQuery();
  const examId = router.query.Id;
  const { fetchQuestions } = useQuestions();

  const questionIds = useAppSelector(
    (state) => state.mockExam.questions.map((question) => question.id),
    shallowEqual
  );

  useEffect(() => {
    if (isUndefined(meQuery)) return;
    if (meQuery.me.user) {
      fetchQuestions(questionsQueryInput, 'network-only');
    }
  }, [meQuery]);

  return (
    <SolutionModeCompoForStaticPagenentBlock>
      <div className="solution-mode-body">
        <SolutionModeControlButtons />
        <ul className="solution-mode-solution-card-list">
          {questionIds.map((questionId, index) => (
            <SolutionModeCardItem key={questionId} index={index} />
          ))}
        </ul>
      </div>

      {examId && <StudyPaymentGuard examId={Number(examId)} />}
    </SolutionModeCompoForStaticPagenentBlock>
  );
};

export default SolutionModeForStaticPageComponent;
