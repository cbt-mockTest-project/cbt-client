import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import McqStudyHeader from './McqStudyHeader';
import useQuestions from '@lib/hooks/useQuestions';
import { useRouter } from 'next/router';
import McqReactiveStudyComponent from './McqReactiveStudyComponent';

const McqStudyComponentBlock = styled.div`
  min-height: 100vh;
`;

interface McqStudyComponentProps {}

const McqStudyComponent: React.FC<McqStudyComponentProps> = () => {
  const router = useRouter();
  const { fetchQuestions } = useQuestions();
  const examIds = useMemo(() => {
    if (typeof router.query.examIds === 'string')
      return router.query.examIds.split(',').map((id: string) => Number(id));
    if (typeof router.query.examId === 'string')
      return [Number(router.query.examId)];
  }, [router.query.examId, router.query.examIds]);

  useEffect(() => {
    if (!router.query.examId) return;
    fetchQuestions({ order: 'normal', ids: examIds });
  }, [examIds]);
  return (
    <McqStudyComponentBlock>
      <McqStudyHeader />
      <McqReactiveStudyComponent />
    </McqStudyComponentBlock>
  );
};

export default McqStudyComponent;
