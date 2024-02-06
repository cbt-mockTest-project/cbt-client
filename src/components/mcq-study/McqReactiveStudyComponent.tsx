import useQuestions from '@lib/hooks/useQuestions';
import React from 'react';
import styled from 'styled-components';
import McqReactiveStudyItem from './McqReactiveStudyItem';
import { useRouter } from 'next/router';

const McqReactiveStudyComponentBlock = styled.div`
  max-width: 640px;
  margin: 0 auto;
  margin-top: 20px;
`;

interface McqReactiveStudyComponentProps {}

const McqReactiveStudyComponent: React.FC<
  McqReactiveStudyComponentProps
> = () => {
  const router = useRouter();
  const { questions } = useQuestions();
  const qestionIndex = Number(router.query.qestionIndex) || 0;
  if (questions.length === 0) return null;
  return (
    <McqReactiveStudyComponentBlock>
      <McqReactiveStudyItem
        {...questions[qestionIndex]}
        number={qestionIndex + 1}
      />
    </McqReactiveStudyComponentBlock>
  );
};

export default McqReactiveStudyComponent;
