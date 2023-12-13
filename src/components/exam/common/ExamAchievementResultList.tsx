import { useLazyReadQuestionsByExamId } from '@lib/graphql/hook/useExamQuestion';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/query/questionQuery.generated';
import { convertStateToIcon } from '@lib/utils/utils';
import { QuestionListType } from '@modules/redux/slices/exam';
import palette from '@styles/palette';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { QuestionState, ReadMockExamQuestionsByMockExamIdInput } from 'types';

interface ExamAchievementResultProps {
  className?: string;
  examId?: number;
  onListClick?: (value: number) => void;
  questionList: QuestionListType;
}

const ExamAchievementResultList: React.FC<ExamAchievementResultProps> = ({
  className,
  onListClick,
  examId,
  questionList,
}) => {
  const { data: meQuery } = useMeQuery();
  const [questionStateCount, setQuestionStateCount] = useState<{
    [key in QuestionState]: number;
  }>();
  // const [readQuestions, { data: questionQueryData }] =
  //   useLazyReadQuestionsByExamId('cache-and-network');
  // useEffect(() => {
  //   if (examId) {
  //     readQuestions({
  //       variables: { input: { id: Number(examId) } },
  //     });
  //   }
  // }, [examId]);

  useEffect(() => {
    if (questionList) {
      const questionStateCount = {
        [QuestionState.Core]:
          questionList?.filter(
            (question) => question.state[0].state === QuestionState.Core
          ).length || 0,
        [QuestionState.High]:
          questionList?.filter(
            (question) => question.state[0].state === QuestionState.High
          ).length || 0,
        [QuestionState.Middle]:
          questionList?.filter(
            (question) => question.state[0].state === QuestionState.Middle
          ).length || 0,
        [QuestionState.Row]:
          questionList?.filter(
            (question) => question.state[0].state === QuestionState.Row
          ).length || 0,
      };
      setQuestionStateCount(questionStateCount);
    }
  }, [questionList]);

  if (!questionList) return null;

  return (
    <ExamAchievementResultContainer>
      <ExamAchievementResultContainerList
        className={className}
        isHoverEffect={!!onListClick}
      >
        {questionList?.map((question, idx) => (
          <li
            key={idx}
            className="not-draggable"
            onClick={() => onListClick && onListClick(idx + 1)}
          >
            <p className="achieve-result-index">{idx + 1}. </p>
            <p>
              {question.state.length >= 1 &&
                convertStateToIcon(
                  meQuery?.me.user
                    ? question.state[0].state
                    : QuestionState.Core
                )}
            </p>
          </li>
        ))}
      </ExamAchievementResultContainerList>
      <div className="exam-achievement-result-count-block">
        {Object.keys(questionStateCount || {})
          .filter((el) => el !== QuestionState.Core)
          .map((key, idx) => (
            <div key={idx} className="exam-achievement-result-count-wrapper">
              <span>{convertStateToIcon(key as QuestionState)}</span>
              <span>
                {questionStateCount
                  ? questionStateCount[key as QuestionState]
                  : 0}
              </span>
            </div>
          ))}
      </div>
    </ExamAchievementResultContainer>
  );
};

export default ExamAchievementResultList;

const ExamAchievementResultContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  .exam-achievement-result-count-block {
    display: flex;
    justify-content: space-between;
  }
  .exam-achievement-result-count-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      font-size: 16px;
      font-weight: bold;
    }
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
`;

const ExamAchievementResultContainerList = styled.ul<{
  isHoverEffect: boolean;
}>`
  width: 100%;
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
  }
  .achieve-result-index {
    margin-left: 20px;
    width: max-content;
  }
`;
