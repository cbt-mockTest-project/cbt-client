import useQuestions from '@lib/hooks/useQuestions';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import QuizItem from './QuizItem';
import { Collapse } from 'antd';
import { useRouter } from 'next/router';
import useQuizs from '@lib/hooks/useQuizs';
import { convertServerTimeToKST } from '@lib/utils/utils';
import { MockExamQuestion, Quiz } from 'types';

const TodayQuizComponentBlock = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface TodayQuizComponentProps {}

const TodayQuizComponent: React.FC<TodayQuizComponentProps> = () => {
  const { quizs } = useQuizs();
  return (
    <TodayQuizComponentBlock>
      {quizs?.map((quiz, index) => (
        <QuizItem key={quiz.id} quiz={quiz as Quiz} number={index + 1} />
      ))}
    </TodayQuizComponentBlock>
  );
};

export default TodayQuizComponent;
