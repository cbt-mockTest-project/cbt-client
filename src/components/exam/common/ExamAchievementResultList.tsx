import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { convertStateToIcon } from '@lib/utils/utils';
import palette from '@styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';
import { QuestionState, ReadMockExamQuestionsByMockExamIdInput } from 'types';

interface ExamAchievementResultProps {
  className?: string;
  examId: number;
  onListClick?: (value: number) => void;
  questionQueryDataProps?: ReadMockExamQuestionsByMockExamIdQuery;
}

const ExamAchievementResultList: React.FC<ExamAchievementResultProps> = ({
  className,
  onListClick,
  examId,
  questionQueryDataProps,
}) => {
  console.log(questionQueryDataProps);

  const { data: meQuery } = useMeQuery();
  if (!questionQueryDataProps) return null;
  const { questions } =
    questionQueryDataProps.readMockExamQuestionsByMockExamId;
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
              convertStateToIcon(
                meQuery?.me.user ? question.state[0].state : QuestionState.Core
              )}
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
  overflow: auto;
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
    width: max-content;
  }
`;
