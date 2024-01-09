import { useLzaySearchQuestions } from '@lib/graphql/hook/useExamQuestion';
import { MockExamQuestion, SearchQuestionsByKeywordInput } from 'types';
import useApolloClient from './useApolloCient';
import { SearchQuestionsByKeywordQuery } from '@lib/graphql/query/questionQuery.generated';
import { SEARCH_QEUSTIONS } from '@lib/graphql/query/questionQuery';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useAppDispatch } from '@modules/redux/store/configureStore';
import { useEditQuestionBookmark } from '@lib/graphql/hook/useQuestionBookmark';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import { message } from 'antd';
import { useRouter } from 'next/router';

const useSearchQuestions = () => {
  const { updateCache } = useApolloClient();
  const router = useRouter();
  const keyword = router.query.q_keyword as string;
  const [
    searchQuestions,
    { data: searchedQuestionsResponse, loading: searchQuestionsLoading },
  ] = useLzaySearchQuestions();
  const { data: meQuery } = useMeQuery();
  const dispatch = useAppDispatch();
  const [editBookmarkMutaion] = useEditQuestionBookmark();
  const searchedQuestions =
    searchedQuestionsResponse?.searchQuestionsByKeyword.questions || [];

  const handleSaveBookmark = async (question: MockExamQuestion) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }
      const newQuestion = {
        ...question,
        isBookmarked: !question.isBookmarked,
      };
      updateQuestionCache(newQuestion);
      await editBookmarkMutaion({
        variables: {
          input: {
            questionId: question.id,
          },
        },
      });
    } catch {
      updateQuestionCache(question);
      message.error('북마크 저장에 실패했습니다.');
    }
  };

  const updateQuestionCache = (newQuestion: MockExamQuestion) => {
    updateCache<SearchQuestionsByKeywordQuery>(
      {
        query: SEARCH_QEUSTIONS,
        variables: {
          input: {
            keyword,
          },
        },
      },
      (data) => ({
        ...data,
        searchQuestionsByKeyword: {
          ...data.searchQuestionsByKeyword,
          questions: data.searchQuestionsByKeyword.questions.map((question) =>
            question.id === newQuestion.id ? newQuestion : question
          ),
        },
      })
    );
  };
  return {
    searchQuestions,
    searchedQuestions,
    handleSaveBookmark,
    searchQuestionsLoading,
  };
};

export default useSearchQuestions;
