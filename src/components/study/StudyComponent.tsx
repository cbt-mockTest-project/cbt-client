import CardModeComponent from '@components/cardMode/CardModeComponent';
import SolutionModeComponent from '@components/solutionMode/SolutionModeComponent';
import TypingModeComponent from '@components/typingMode/TypingModeComponent';
import useQuestions from '@lib/hooks/useQuestions';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState, ReadQuestionsByExamIdsInput } from 'types';
import StudyHeader from './StudyHeader';
import FullPageLoader from '@components/common/loader/FullPageLoader';

const StudyComponentBlock = styled.div`
  height: 100vh;
`;

interface StudyComponentProps {}

const StudyComponent: React.FC<StudyComponentProps> = () => {
  const [fetchQuestionsLoading, setFetchQuestionsLoading] = useState(false);
  const { fetchQuestions, resetQuestions, questions } = useQuestions();
  const [questionsQueryInput, setQuestionsQueryInput] =
    useState<ReadQuestionsByExamIdsInput | null>(null);
  const router = useRouter();
  const mode = router.query.mode as ExamMode;

  useEffect(() => {
    setFetchQuestionsLoading(true);
    if (!router.isReady) return;

    const { order, states, limit, examIds, mode, examId } = router.query;
    // 단일 문제 풀이
    if (examId) {
      const input: ReadQuestionsByExamIdsInput = {
        order: 'normal',
        ids: [Number(examId)],
      };
      setQuestionsQueryInput(input);
      fetchQuestions(input);
    }
    // 다중 문제 풀이
    else {
      if (!order || !limit || !examIds || !mode) return;
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
      fetchQuestions(input);
    }
    setFetchQuestionsLoading(false);
  }, [router.isReady]);

  useEffect(() => {
    return () => {
      resetQuestions();
    };
  }, []);

  if (!questionsQueryInput || !mode) return null;
  if (fetchQuestionsLoading) return <FullPageLoader />;
  return (
    <StudyComponentBlock>
      <StudyHeader questions={questions} />
      {mode === ExamMode.SOLUTION && questionsQueryInput && (
        <SolutionModeComponent />
      )}
      {mode === ExamMode.TYPYING && questionsQueryInput && (
        <TypingModeComponent />
      )}
      {mode === ExamMode.CARD && questionsQueryInput && <CardModeComponent />}
    </StudyComponentBlock>
  );
};

export default StudyComponent;
