import BasicBox from '@components/common/box/BasicBox';
import { useReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { convertStateToIcon } from '@lib/utils/utils';
import palette from '@styles/palette';
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
        {questions.map((question, idx) => (
          <li key={idx}>
            <p className="achieve-result-index">{idx + 1}. </p>
            <p>{convertStateToIcon(question.state[0].state)}</p>
          </li>
        ))}
      </ul>
    </ExamAchievementResultContainer>
  );
};

export default ExamAchievementResult;

const ExamAchievementResultContainer = styled(BasicBox)`
  margin-top: 20px;
  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 0;
  }
  li {
    display: flex;
    align-items: center;
    gap: 5px;

    p {
      width: 25px;
      text-align: center;
    }
    .circle-icon {
      width: 80% !important;
      color: ${palette.antd_blue_02};
    }
    .triangle-icon {
      color: ${palette.yellow_500};
    }
    .clear-icon {
      width: 100% !important;
      color: ${palette.red_500};
    }
  }
  .achieve-result-index {
    margin-left: 20px;
  }
`;
