import { useChangeQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MockExamQuestionState, QuestionState } from 'types';

interface AchievementCheckProps {
  questionIndex: number;
  questionState: string;
  setQuestionState: React.Dispatch<React.SetStateAction<string>>;
  questionQueryData: ReadMockExamQuestionsByMockExamIdQuery | undefined;
}

const AchievementCheck: React.FC<AchievementCheckProps> = ({
  questionState,
  setQuestionState,
  questionIndex,
  questionQueryData,
}) => {
  const client = useApollo({}, '');
  const [changeQuestionState] = useChangeQuestionState();
  const onChangeQusetionState = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (e.currentTarget.value === questionState) return;
    if (questionQueryData) {
      const {
        readMockExamQuestionsByMockExamId: { questions },
      } = questionQueryData;
      const questionId = questions[questionIndex - 1].id;
      let state: QuestionState;
      switch (e.currentTarget.value) {
        case 'HIGH':
          state = QuestionState.High;
          break;
        case 'MIDDLE':
          state = QuestionState.Middle;
          break;
        case 'ROW':
          state = QuestionState.Row;
          break;
        default:
          state = QuestionState.Core;
      }
      setQuestionState(e.currentTarget.value);
      const changeQuestionStateQuery = await changeQuestionState({
        variables: {
          input: {
            state: state,
            questionId: questionId,
          },
        },
      });
      if (changeQuestionStateQuery.data) {
        const {
          createOrUpdateMockExamQuestionState: { ok, error, currentState },
        } = changeQuestionStateQuery.data;
        if (error) {
          message.error({ content: error });
        }
        if (ok && currentState) {
          client.cache.modify({
            id: `MockExamQuestion:${questionId}`,
            fields: {
              state(state) {
                return state.length === 1
                  ? state.map((state: MockExamQuestionState) => ({
                      ...state,
                      state: currentState,
                    }))
                  : [
                      {
                        state: currentState,
                        __typename: 'MockExamQuestionState',
                      },
                    ];
              },
            },
          });
        }
      }
    }
  };
  return (
    <AchievementCheckContainer>
      <span className="select-none">성취도체크</span>
      <Button
        className={`exam-question-menu ${
          questionState === 'HIGH' && 'active-button'
        }`}
        type="default"
        value="HIGH"
        onClick={onChangeQusetionState}
      >
        ●
      </Button>
      <Button
        className={`exam-question-menu ${
          questionState === 'MIDDLE' && 'active-button'
        }`}
        type="default"
        value="MIDDLE"
        onClick={onChangeQusetionState}
      >
        ▲
      </Button>
      <Button
        className={`exam-question-menu x ${
          questionState === 'ROW' && 'active-button'
        }`}
        type="default"
        value="ROW"
        onClick={onChangeQusetionState}
      >
        ×
      </Button>
    </AchievementCheckContainer>
  );
};

export default AchievementCheck;

const AchievementCheckContainer = styled.div`
  display: flex;
  align-items: center;
  .exam-question-menu {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  }
  .x {
    font-weight: 2000;
    font-size: 1.1rem;
  }
  .active-button {
    color: ${palette.antd_blue_01};
    border-color: ${palette.antd_blue_01};
  }
`;
