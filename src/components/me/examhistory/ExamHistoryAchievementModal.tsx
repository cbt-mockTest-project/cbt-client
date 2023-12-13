import Modal, { ModalProps } from '@components/common/modal/Modal';
import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import { useReadQuestionsByExamId } from '@lib/graphql/hook/useExamQuestion';
import { useResetQuestionState } from '@lib/graphql/hook/useQuestionState';
import { handleError } from '@lib/utils/utils';
import { QuestionListType } from '@modules/redux/slices/exam';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';

const ExamHistoryAchievementModalBlock = styled(Modal)``;

interface ExamHistoryAchievementModalProps
  extends Omit<ModalProps, 'children'> {
  className?: string;
  examId: number;
}

const ExamHistoryAchievementModal: React.FC<
  ExamHistoryAchievementModalProps
> = ({ open, onClose, className, examId }) => {
  const [resetQuestionStateMutate] = useResetQuestionState();
  const { data: questionQueryData } = useReadQuestionsByExamId(examId);
  const [questionList, setQuestionList] = useState<QuestionListType>([]);
  const requestResetQuestionState = async () => {
    try {
      const res = await resetQuestionStateMutate({
        variables: {
          input: {
            examId,
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
        setQuestionList(newQuestionList);
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

  useEffect(() => {
    if (!questionQueryData) return;
    setQuestionList(
      questionQueryData?.readMockExamQuestionsByMockExamId
        .questions as QuestionListType
    );
  }, [questionQueryData]);
  return (
    <ExamHistoryAchievementModalBlock
      open={open}
      onClose={onClose}
      className={className || ''}
    >
      <ExamAchievementResultList
        examId={examId}
        className="achievement-modal-result-list"
        questionList={questionList}
      />
      <Button type="primary" onClick={requestResetQuestionState}>
        성취도 초기화
      </Button>
    </ExamHistoryAchievementModalBlock>
  );
};

export default ExamHistoryAchievementModal;
