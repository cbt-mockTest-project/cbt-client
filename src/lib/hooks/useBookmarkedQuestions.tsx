import { useReadExamTitleAndIdOfBookmarkedQuestion } from '@lib/graphql/hook/useQuestionBookmark';
import { handleError } from '@lib/utils/utils';
import { Modal } from 'antd';
import { useMemo } from 'react';

const useBookmarkedQuestions = () => {
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
          window.location.reload();
        } catch (e) {
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
