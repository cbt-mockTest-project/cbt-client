import useQuestions from '@lib/hooks/useQuestions';
import React from 'react';
import styled from 'styled-components';
import McqReactiveStudyItem from './McqReactiveStudyItem';
import { useRouter } from 'next/router';
import McqReactiveStudyFooter from './McqReactiveStudyFooter';

const McqReactiveStudyComponentBlock = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 57px);
  display: flex;
  flex-direction: column;
`;

interface McqReactiveStudyComponentProps {}

const McqReactiveStudyComponent: React.FC<
  McqReactiveStudyComponentProps
> = () => {
  const router = useRouter();
  const { questions } = useQuestions();
  const qestionIndex = Number(router.query.qestionIndex) || 1;
  if (questions.length === 0) return null;
  return (
    <McqReactiveStudyComponentBlock>
      <McqReactiveStudyItem
        {...questions[qestionIndex - 1]}
        number={qestionIndex}
        key={qestionIndex}
      />
      <McqReactiveStudyFooter questionLength={questions.length} />
    </McqReactiveStudyComponentBlock>
  );
};

export default McqReactiveStudyComponent;
