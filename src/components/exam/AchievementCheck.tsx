import AchievCheckButtonGroup from '@components/common/button/AchievCheckButtonGroup';
import Tooltip from '@components/common/tooltip/Tooltip';
import { loginModal } from '@lib/constants';
import { useChangeQuestionState } from '@lib/graphql/hook/useQuestionState';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import useIsMobile from '@lib/hooks/useIsMobile';
import { responsive } from '@lib/utils/responsive';
import { coreActions } from '@modules/redux/slices/core';
import { examActions } from '@modules/redux/slices/exam';
import {
  useAppDispatch,
  useAppSelector,
} from '@modules/redux/store/configureStore';
import { message } from 'antd';
import { checkboxOption } from 'customTypes';
import { cloneDeep } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
interface AchievementCheckProps {}

const AchievementCheck: React.FC<AchievementCheckProps> = ({}) => {
  const [changeQuestionState] = useChangeQuestionState();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const onOpenLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const currentQuestion = useAppSelector((state) => state.exam.currentQuestion);
  const requestChangeState = async (state: checkboxOption['value']) => {
    if (!meQuery?.me.user) {
      onOpenLoginModal();
      return;
    }
    if (!currentQuestion?.id) {
      message.error({ content: '문제가 존재하지 않습니다.' });
      return;
    }
    const currentQuestionState = currentQuestion.state[0].state;
    if (currentQuestionState === state) {
      return;
    }
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
        const newQuestion = cloneDeep(currentQuestion);
        newQuestion.state[0].state = currentState;
        dispatch(
          examActions.setCurrentQuestion({
            question: newQuestion,
            updateList: true,
          })
        );
      }
    }
  };
  return (
    <AchievementCheckContainer>
      <Tooltip className="achievement-check-tooltip">
        <p className="achievement-check-tooltip-content">
          {`성취도체크를 통해 학습기록을 남길 수 있습니다.
          학습기록은 성취도 버튼을 클릭해 확인 할 수 있습니다.
          문제풀이가 끝난 이후에는 성취도탭에서 확인할 수 있습니다.`}
        </p>
      </Tooltip>
      <span className="achievement-check-label select-none">성취도체크</span>
      <AchievCheckButtonGroup onCheckboxChange={requestChangeState} />
    </AchievementCheckContainer>
  );
};

export default AchievementCheck;

const AchievementCheckContainer = styled.div`
  display: flex;
  align-items: center;
  .achievement-check-tooltip {
    position: relative;
    top: 4px;
  }
  .achievement-check-tooltip-content {
    white-space: pre-line;
    font-size: 0.8rem;
    color: white;
    width: 330px;
  }
  @media (max-width: ${responsive.medium}) {
    .achievement-check-label {
      margin: 0 10px 0 5px;
    }
  }
  @media (max-width: ${responsive.small}) {
    .achievement-check-tooltip-content {
      width: 280px;
    }
  }
`;
