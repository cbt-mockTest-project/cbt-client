import { useReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { convertStateToIcon } from '@lib/utils/utils';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ExamAchievementResultProps {
  className?: string;
}

const ExamAchievementResultList: React.FC<ExamAchievementResultProps> = ({
  className,
}) => {
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
  const onMoveQuestion = (questionIndex: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: questionIndex },
    });
  };
  return (
    <ExamAchievementResultContainer className={className}>
      {questions.map((question, idx) => (
        <li
          key={idx}
          className="not-draggable"
          onClick={() => onMoveQuestion(idx + 1)}
        >
          <p className="achieve-result-index">{idx + 1}. </p>
          <p>{convertStateToIcon(question.state[0].state)}</p>
        </li>
      ))}
    </ExamAchievementResultContainer>
  );
};

export default ExamAchievementResultList;

const ExamAchievementResultContainer = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px 0;
  li {
    display: flex;
    align-items: center;
    gap: 5px;
    :hover {
      background-color: ${palette.gray_100};
      cursor: pointer;
      border-radius: 5px;
    }
    p {
      width: 25px;
      text-align: center;
    }
    .circle-icon {
      width: 80% !important;
      position: relative;
      top: 3px;
      color: ${palette.antd_blue_02};
    }
    .triangle-icon {
      color: ${palette.yellow_500};
      position: relative;
      top: 1px;
    }
    .clear-icon {
      width: 100% !important;
      position: relative;
      top: 3px;
      color: ${palette.red_500};
    }
  }
  .achieve-result-index {
    margin-left: 20px;
  }
`;
