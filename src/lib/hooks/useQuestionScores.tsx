import {
  useReadExamTitleAndIdByState,
  useResetAllQuestionState,
} from '@lib/graphql/hook/useQuestionState';
import { handleError } from '@lib/utils/utils';
import { Modal, message } from 'antd';
import { useMemo } from 'react';
import useQuestions from './useQuestions';

const useQuestionScores = () => {
  const { resetQuestions } = useQuestions();
  const { data: readExamTitlesQuery, loading: getExamTitlesLoading } =
    useReadExamTitleAndIdByState();
  const [resetAllQuestionStates] = useResetAllQuestionState();

  const examTitles = useMemo(() => {
    if (!readExamTitlesQuery?.readExamTitleAndIdByQuestionState.ok) return [];
    return [
      {
        value: 0,
        label: '전체',
      },
      ...readExamTitlesQuery.readExamTitleAndIdByQuestionState.titleAndId.map(
        (el) => ({
          value: Number(el.id),
          label: String(el.title),
        })
      ),
    ];
  }, [readExamTitlesQuery]);

  const resetQuestionScores = async () => {
    Modal.confirm({
      title: '정말로 점수를 모두 삭제하시겠습니까?',
      content: '삭제된 점수는 복구할 수 없습니다.',
      okText: '삭제',
      cancelText: '취소',
      onOk: async () => {
        try {
          await resetAllQuestionStates();
          resetQuestions();
          message.success('점수가 삭제되었습니다.');
        } catch (e) {
          message.error('점수 삭제에 실패했습니다.');
          handleError(e);
        }
      },
    });
  };

  return {
    examTitles,
    getExamTitlesLoading,
    resetQuestionScores,
  };
};

export default useQuestionScores;
