import CardModeComponent from '@components/cardMode/CardModeComponent';
import SolutionModeComponent from '@components/solutionMode/SolutionModeComponent';
import TypingModeComponent from '@components/typingMode/TypingModeComponent';
import useQuestions from '@lib/hooks/useQuestions';
import { ExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState, ReadQuestionsByExamIdsInput } from 'types';

const StudyComponentBlock = styled.div``;

interface StudyComponentProps {}

const StudyComponent: React.FC<StudyComponentProps> = () => {
  const { fetchQuestions, resetQuestions } = useQuestions();
  const [questionsQueryInput, setQuestionsQueryInput] =
    useState<ReadQuestionsByExamIdsInput | null>(null);
  const router = useRouter();
  const mode = router.query.mode as ExamMode;

  useEffect(() => {
    if (!router.isReady) return;
    const { order, states, limit, examIds, mode } = router.query;
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
  }, [router.isReady]);

  useEffect(() => {
    return () => {
      resetQuestions();
    };
  }, []);

  if (!questionsQueryInput || !mode) return null;

  return (
    <StudyComponentBlock>
      {mode === ExamMode.SOLUTION && questionsQueryInput && (
        <SolutionModeComponent questionsQueryInput={questionsQueryInput} />
      )}
      {mode === ExamMode.TYPYING && questionsQueryInput && (
        <TypingModeComponent questionsQueryInput={questionsQueryInput} />
      )}
      {mode === ExamMode.CARD && questionsQueryInput && (
        <CardModeComponent questionsQueryInput={questionsQueryInput} />
      )}
    </StudyComponentBlock>
  );
};

export default StudyComponent;
