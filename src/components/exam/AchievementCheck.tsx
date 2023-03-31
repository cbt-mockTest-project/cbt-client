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
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import { responsive } from '@lib/utils/responsive';
import Tooltip from '@components/common/tooltip/Tooltip';
import useIsMobile from '@lib/hooks/useIsMobile';
interface AchievementCheckProps {
  questionIndex: number;
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const AchievementCheck: React.FC<AchievementCheckProps> = ({
  questionIndex,
  questionsQuery,
}) => {
  const client = useApollo({}, '');
  const isMobile = useIsMobile();
  const [changeQuestionState] = useChangeQuestionState();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const onOpenLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const {
    readMockExamQuestionsByMockExamId: { questions },
  } = questionsQuery;
  const currentQuestion = questions[questionIndex - 1];
  const currentQuestionId = currentQuestion?.id;
  const requestChangeState = async (state: checkboxOption['value']) => {
    if (!meQuery?.me.user) {
      onOpenLoginModal();
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
      <Tooltip className="achievement-check-tooltip">
        <p className="achievement-check-tooltip-content">
          {`성취도체크를 통해 학습기록을 남길 수 있습니다.
          학습기록은 진도확인 버튼을 클릭해 확인 할 수 있습니다.
          문제풀이가 끝난 이후에는 ${
            isMobile ? '북마크탭' : '활동내역'
          }에서 확인할 수 있습니다.`}
        </p>
      </Tooltip>
      <span className="achievement-check-label select-none">성취도체크</span>
      <AchievCheckButtonGroup
        onCheckboxChange={requestChangeState}
        currentQuestionId={currentQuestionId}
      />
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
