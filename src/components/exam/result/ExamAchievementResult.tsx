import BasicBox from '@components/common/box/BasicBox';
import { useReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { convertStateToIcon } from '@lib/utils/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const ExamAchievementResult = () => {
  const router = useRouter();
  const [readQuestions, { data: questionQueryData }] =
    useReadQuestionsByExamId();
  useEffect(() => {
    readQuestions({
      variables: {
        input: {
          id: Number(router.query.e),
        },
      },
    });
  }, [router.query.e]);
  if (!questionQueryData) return null;
  const {
    readMockExamQuestionsByMockExamId: { questions },
  } = questionQueryData;
  return (
    <ExamAchievementResultContainer
      className="exam-result-achieve-check-box not-draggable"
      maxHeight={280}
    >
      <ul>
        {questions.slice(0, 10).map((question, idx) => (
          <li key={idx}>
            <p>{idx + 1}. </p>
            <p>{convertStateToIcon(question.state[0].state)}</p>
          </li>
        ))}
      </ul>
      <ul>
        {questions.slice(10).map((question, idx) => (
          <li key={idx}>
            <p>{idx + 1}. </p>
            <p>{convertStateToIcon(question.state[0].state)}</p>
          </li>
        ))}
      </ul>
    </ExamAchievementResultContainer>
  );
};

export default ExamAchievementResult;

const ExamAchievementResultContainer = styled(BasicBox)`
  li {
    display: flex;
    align-items: center;
    gap: 15px;
    p {
      width: 25px;
    }
    svg {
      position: relative;
      top: 5px;
      right: 3px;
    }
  }
`;
