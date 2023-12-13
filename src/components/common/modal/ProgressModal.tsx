import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import { useResetQuestionState } from '@lib/graphql/hook/useQuestionState';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/query/questionQuery.generated';
import { extractKeysOfCache, handleError } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import { useRouter } from 'next/router';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import {
  MockExamQuestionState,
  QuestionState,
  ReadMockExamQuestionsByMockExamIdInput,
} from 'types';
import Modal from './Modal';
import { QuestionListType, examActions } from '@modules/redux/slices/exam';
import { useAppDispatch } from '@modules/redux/store/configureStore';

interface ProgressModalProps
  extends Pick<ComponentProps<typeof Modal>, 'open' | 'onClose'> {
  questionList: QuestionListType;
  readQuestionInput?: ReadMockExamQuestionsByMockExamIdInput;
}

const ProgressModal: React.FC<ProgressModalProps> = ({
  onClose,
  open,
  questionList,
}) => {
  const router = useRouter();
  const [resetQuestionStateMutate] = useResetQuestionState();
  const dispatch = useAppDispatch();
  const onMoveQuestion = (questionIndex: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: questionIndex },
    });
  };
  const requestResetQuestionState = async () => {
    try {
      const questionIds = questionList.map((el) => el.id);
      const res = await resetQuestionStateMutate({
        variables: {
          input: {
            questionIds,
          },
        },
      });
      if (res.data?.resetMyExamQuestionState.ok) {
        const newQuestionList = questionList.map((el) => ({
          ...el,
          state: [
            {
              ...el.state[0],
              state: QuestionState.Core,
            },
          ],
        }));
        dispatch(examActions.setQuestionList(newQuestionList));
        message.success({ content: '성취도가 초기화 되었습니다.' });
        return;
      }
      return message.error({
        content: res.data?.resetMyExamQuestionState.error,
      });
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <ProgressModalContainer>
      <Modal open={open} onClose={onClose} className="progress-modal-container">
        <h2 className="progress-modal-title">진도체크</h2>
        <ExamAchievementResultList
          className="progress-modal-achievement-result-list"
          onListClick={onMoveQuestion}
          questionList={questionList}
        />
        <p className="progress-modal-info">
          번호를 클릭하면 해당 문제로 이동 합니다.
        </p>
        <Button
          className="progress-modal-achievement-reset-button"
          type="primary"
          onClick={requestResetQuestionState}
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
    border-bottom: 1px solid ${palette.gray_400};
    padding: 0 0px 10px 50px;
  }
  .progress-modal-achievement-result-list {
    padding: 10px 30px;
    max-height: 300px;
  }
  .exam-achievement-result-count-block {
    padding: 10px 50px;
  }
  .progress-modal-info {
    border-top: 1px solid ${palette.gray_400};
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
