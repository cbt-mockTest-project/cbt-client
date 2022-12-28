import { useChangeQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { useApollo } from '@modules/apollo';
import { message } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MockExamQuestion, MockExamQuestionState, QuestionState } from 'types';
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
import { responsive } from '@lib/utils/responsive';
interface AchievementCheckProps {
  questionIndex: number;
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const AchievementCheck: React.FC<AchievementCheckProps> = ({
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
  const currentQuestionId = currentQuestion.id;
  const requestChangeState = async (state: checkboxOption['value']) => {
    if (!meQuery?.me.user) {
      onOpenModal();
      return;
    }
    const changeQuestionStateQuery = await changeQuestionState({
      variables: {
        input: {
          state: state as QuestionState,
          questionId: currentQuestionId,
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
          id: `MockExamQuestion:${currentQuestionId}`,
          fields: {
            state(state) {
              return state.length === 1
                ? state.map((state: MockExamQuestionState) => ({
                    ...state,
                    state: currentState,
                  }))
                : state;
            },
          },
        });
      }
    }
  };
  return (
    <AchievementCheckContainer>
      <span className="achievement-check-label select-none">성취도체크</span>
      <AchievCheckButtonGroup
        onCheckboxChange={requestChangeState}
        currentQuestionId={currentQuestionId}
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
  @media (max-width: ${responsive.medium}) {
    .achievement-check-label {
      display: none;
    }
  }
`;
