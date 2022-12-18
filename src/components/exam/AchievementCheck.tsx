import { useChangeQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { useApollo } from '@modules/apollo';
import { message } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MockExamQuestionState, QuestionState } from 'types';
import AchievCheckButtonGroup from '@components/common/button/AchievCheckButtonGroup';
import { checkboxOption } from 'customTypes';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import Modal from '@components/common/modal/Modal';
import LoginForm from '@components/common/form/LoginForm';
import { loginModal } from '@lib/constants';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
interface AchievementCheckProps {
  questionIndex: number;
  questionState: QuestionState;
  setQuestionState: React.Dispatch<React.SetStateAction<QuestionState>>;
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const AchievementCheck: React.FC<AchievementCheckProps> = ({
  questionState,
  setQuestionState,
  questionIndex,
  questionsQuery,
}) => {
  const client = useApollo({}, '');
  const [changeQuestionState] = useChangeQuestionState();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const { modalName } = useAppSelector((state) => state.core);
  const onCloseModal = () => dispatch(coreActions.closeModal());
  const onOpenModal = () => dispatch(coreActions.openModal(loginModal));
  const {
    readMockExamQuestionsByMockExamId: { questions },
  } = questionsQuery;
  const currentQuestion = questions[questionIndex - 1];
  const requestChangeState = async (state: checkboxOption['value']) => {
    if (!meQuery?.me.user) {
      onOpenModal();
      return;
    }
    if (state === questionState) return;
    setQuestionState(state as QuestionState);
    const changeQuestionStateQuery = await changeQuestionState({
      variables: {
        input: {
          state: state as QuestionState,
          questionId: currentQuestion.id,
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
          id: `MockExamQuestion:${currentQuestion.id}`,
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
  };

  return (
    <AchievementCheckContainer>
      <span className="select-none">성취도체크</span>
      <AchievCheckButtonGroup
        onCheckboxChange={requestChangeState}
        initialSelectedValue={
          currentQuestion.state.length >= 1
            ? currentQuestion.state[0].state
            : QuestionState.Core
        }
      />
      <Modal onClose={onCloseModal} open={loginModal === modalName}>
        <LoginForm />
      </Modal>
    </AchievementCheckContainer>
  );
};

export default AchievementCheck;

const AchievementCheckContainer = styled.div`
  display: flex;
  align-items: center;
`;
