import { useReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import {
  convertStateToIcon,
  convertWithErrorHandlingFunc,
} from '@lib/utils/utils';
import palette from '@styles/palette';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

interface ExamAchievementResultProps {
  className?: string;
  examId: number;
  onListClick?: (value: number) => void;
}

const ExamAchievementResultList: React.FC<ExamAchievementResultProps> = ({
  className,
  onListClick,
  examId,
}) => {
  const [readQuestionsMutation, { data: questionQueryData }] =
    useReadQuestionsByExamId();
  const tryReadQuestionsMutation = convertWithErrorHandlingFunc({
    callback: async () =>
      await readQuestionsMutation({
        variables: { input: { id: Number(examId) } },
      }),
  });
  useEffect(() => {
    tryReadQuestionsMutation();
  }, [examId]);
  if (!questionQueryData) return null;
  const {
    readMockExamQuestionsByMockExamId: { questions },
  } = questionQueryData;
  return (
    <ExamAchievementResultContainer
      className={className}
      isHoverEffect={!!onListClick}
    >
      {questions.map((question, idx) => (
        <li
          key={idx}
          className="not-draggable"
          onClick={() => onListClick && onListClick(idx + 1)}
        >
          <p className="achieve-result-index">{idx + 1}. </p>
          <p>
            {question.state.length >= 1 &&
              convertStateToIcon(question.state[0].state)}
          </p>
        </li>
      ))}
    </ExamAchievementResultContainer>
  );
};

export default ExamAchievementResultList;

const ExamAchievementResultContainer = styled.ul<{ isHoverEffect: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px 0;
  li {
    display: flex;
    align-items: center;
    gap: 5px;
    ${(props) =>
      props.isHoverEffect &&
      css`
        :hover {
          background-color: ${palette.gray_100};
          cursor: pointer;
          border-radius: 5px;
        }
      `}

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
