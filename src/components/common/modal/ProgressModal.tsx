import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import { useResetQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import {
  convertWithErrorHandlingFunc,
  extractKeysOfCache,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import { useRouter } from 'next/router';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import { MockExamQuestionState, QuestionState } from 'types';
import Modal from './Modal';

interface ProgressModalProps
  extends Pick<ComponentProps<typeof Modal>, 'open' | 'onClose'> {}

const ProgressModal: React.FC<ProgressModalProps> = ({ onClose, open }) => {
  const router = useRouter();
  const [resetQuestionStateMutate] = useResetQuestionState();
  const client = useApollo({}, '');
  const examId = Number(router.query.e);
  const onMoveQuestion = (questionIndex: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: questionIndex },
    });
  };
  const requestResetQuestionState = async () => {
    const res = await resetQuestionStateMutate({
      variables: {
        input: {
          examId,
        },
      },
    });
    if (res.data?.resetMyExamQuestionState.ok) {
      const questionKeys = extractKeysOfCache(client, 'MockExamQuestion:');
      questionKeys.forEach((el) => {
        client.cache.modify({
          id: el,
          fields: {
            state(state) {
              if (
                state.length === 1 &&
                state[0].exam.__ref === `MockExam:${examId}`
              ) {
                return state.map((state: MockExamQuestionState) => ({
                  ...state,
                  state: QuestionState.Core,
                }));
              }
              return state;
            },
          },
        });
      });
      message.success({ content: '성취도가 초기화 되었습니다.' });
      return;
    }
    return message.error({ content: res.data?.resetMyExamQuestionState.error });
  };
  const tryResetQuestionState = convertWithErrorHandlingFunc({
    callback: requestResetQuestionState,
  });
  return (
    <ProgressModalContainer>
      <Modal open={open} onClose={onClose} className="progress-modal-container">
        <h2 className="progress-modal-title">진도체크</h2>
        <ExamAchievementResultList
          className="progress-modal-achievement-result-list"
          onListClick={onMoveQuestion}
          examId={Number(router.query.e)}
        />
        <p className="progress-modal-info">
          번호를 클릭하면 해당 문제로 이동 합니다.
        </p>
        <Button
          className="progress-modal-achievement-reset-button"
          type="primary"
          onClick={tryResetQuestionState}
        >
          성취도 초기화
        </Button>
      </Modal>
    </ProgressModalContainer>
  );
};

export default ProgressModal;

const ProgressModalContainer = styled.div`
  .progress-modal-container {
    padding: 20px 0px 0px 0px;
    .modal-close-button {
      margin: 10px 50px;
    }
  }
  .progress-modal-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${palette.gray_900};
    border-bottom: 1px solid ${palette.gray_300};
    padding: 0 0px 10px 50px;
  }
  .progress-modal-achievement-result-list {
    padding: 10px 30px;
    max-height: 350px;
  }
  .progress-modal-info {
    border-top: 1px solid ${palette.gray_300};
    padding-top: 10px;
    text-align: center;
    font-size: 0.9rem;
    color: ${palette.antd_blue_02};
  }
  .progress-modal-achievement-reset-button {
    margin-top: 20px;
    width: 100%;
  }
`;
