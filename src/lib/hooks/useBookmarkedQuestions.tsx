import {
  useReadExamTitleAndIdOfBookmarkedQuestion,
  useResetMyQuestionBookmark,
} from '@lib/graphql/hook/useQuestionBookmark';
import { handleError } from '@lib/utils/utils';
import { Modal, message } from 'antd';
import { useMemo } from 'react';
import useQuestions from './useQuestions';

const useBookmarkedQuestions = () => {
  const { resetQuestions } = useQuestions();
  const [resetBookmark] = useResetMyQuestionBookmark();
  const { data: readExamTitlesQuery, loading: getExamTitlesLoading } =
    useReadExamTitleAndIdOfBookmarkedQuestion();

  const examTitles = useMemo(() => {
    if (!readExamTitlesQuery?.readExamTitleAndIdOfBookmarkedQuestion.ok)
      return [];
    return readExamTitlesQuery.readExamTitleAndIdOfBookmarkedQuestion.titleAndId.map(
      (el) => ({
        value: Number(el.id),
        label: String(el.title),
      })
    );
  }, [readExamTitlesQuery]);

  const resetQuestionBookmarks = async () => {
    Modal.confirm({
      title: '정말로 저장된 문제를 모두 삭제하시겠습니까?',
      content: '삭제된 문제는 복구할 수 없습니다.',
      okText: '삭제',
      cancelText: '취소',
      onOk: async () => {
        try {
          await resetBookmark();
          resetQuestions();
          message.success('저장된 문제가 삭제되었습니다.');
        } catch (e) {
          message.error('저장된 문제 삭제에 실패했습니다.');
          handleError(e);
        }
      },
    });
  };

  return {
    examTitles,
    getExamTitlesLoading,
    resetQuestionBookmarks,
  };
};

export default useBookmarkedQuestions;
