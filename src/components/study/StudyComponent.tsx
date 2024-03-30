import SolutionModeComponent from '@components/solutionMode/SolutionModeComponent';
import useQuestions from '@lib/hooks/useQuestions';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState, ReadQuestionsByExamIdsInput } from 'types';
import FullPageLoader from '@components/common/loader/FullPageLoader';
import StudyPaymentGuard from './StudyPaymentGuard';
import StudyHeaderV2 from './StudyHeaderV2';
import { responsive } from '@lib/utils/responsive';
import StudyModeWrapper from './StudyModeWrapper';

const StudyComponentBlock = styled.div`
  min-height: 100vh;
  .study-component-wrapper {
    padding: 10px 20px;
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
  }
  @media (max-width: ${responsive.medium}) {
    .study-component-wrapper {
      padding: 10px;
    }
  }
`;

interface StudyComponentProps {}

const StudyComponent: React.FC<StudyComponentProps> = () => {
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const { fetchQuestions, resetQuestions } = useQuestions();
  const [questionsQueryInput, setQuestionsQueryInput] =
    useState<ReadQuestionsByExamIdsInput | null>(null);
  const router = useRouter();
  const { order, states, limit, examIds, mode, examId } = router.query;
  useEffect(() => {
    setFetchQuestionsLoading(true);
    if (!router.isReady) return;

    // 단일 문제 풀이
    if (examId) {
      const input: ReadQuestionsByExamIdsInput = {
        order: 'normal',
        ids: [Number(examId)],
      };
      setQuestionsQueryInput(input);
      fetchQuestions(input).finally(() => {
        setFetchQuestionsLoading(false);
      });
    }
    // 다중 문제 풀이
    else {
      if (!order || !examIds || !mode) return;
      const input: ReadQuestionsByExamIdsInput = {
        order: order as string,
        limit: Number(limit),
        ids: String(examIds)
          .split(',')
          .map((id) => Number(id)),
      };
      if (states && typeof states === 'string')
        input.states = states.split(',') as QuestionState[];

      setQuestionsQueryInput(input);
      fetchQuestions(input).finally(() => {
        setFetchQuestionsLoading(false);
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    resetQuestions();
    return () => {
      resetQuestions();
    };
  }, []);

  if (!questionsQueryInput || !mode) return null;
  if (fetchQuestionsLoading) return <FullPageLoader />;

  return (
    <StudyComponentBlock>
      <div className="study-component-wrapper">
        {router.query.tab !== 'end' && <StudyHeaderV2 />}
        {mode === ExamMode.SOLUTION && questionsQueryInput && (
          <SolutionModeComponent />
        )}
        {['typing', 'card'].includes(mode as string) && <StudyModeWrapper />}
        <StudyPaymentGuard
          {...(examId ? { examId: String(examId) } : {})}
          {...(examIds ? { examIds: String(examIds) } : {})}
        />
      </div>
    </StudyComponentBlock>
  );
};

export default StudyComponent;
