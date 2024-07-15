import { SEARCH_QEUSTIONS } from '@lib/graphql/query/questionQuery';
import {
  SearchQuestionsByKeywordQuery,
  SearchQuestionsByKeywordQueryVariables,
} from '@lib/graphql/query/questionQuery.generated';
import { initializeApollo } from '@modules/apollo';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { HandleDeleteBookmark, HandleSaveBookmark } from './useQuestions';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { useDispatch } from 'react-redux';
import { coreActions } from '@modules/redux/slices/core';
import { loginModal } from '@lib/constants';
import {
  createQuestionBookmarkMutationFn,
  deleteQuestionBookmarkMutationFn,
  moveQuestionBookmarkMutationFn,
} from '@lib/mutation/questionBookmarkMutation';
import { message } from 'antd';

const useSearchQuestions = () => {
  const { data: meQuery } = useMeQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const keyword = router.query.q;
  const examIds = router.query.examIds as string;

  const searchQuestionsQueryOptions = queryOptions({
    queryKey: ['searchQuestions', keyword, examIds],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!keyword || !examIds) return;
      const { data } = await apolloClient.query<
        SearchQuestionsByKeywordQuery,
        SearchQuestionsByKeywordQueryVariables
      >({
        query: SEARCH_QEUSTIONS,
        fetchPolicy: 'network-only',
        variables: {
          input: {
            keyword: keyword as string,
            examIds: examIds ? examIds.split(',').map((id) => Number(id)) : [],
            ...(router.query.isAll === 'eungwang' && {
              isAll: true,
            }),
          },
        },
      });
      return data;
    },
  });

  const { data, isLoading, refetch } = useQuery(searchQuestionsQueryOptions);

  const saveBookmark: HandleSaveBookmark = async (question, folderId) => {
    try {
      if (!meQuery?.me.user) {
        dispatch(coreActions.openModal(loginModal));
        return;
      }

      if (question.myBookmark) {
        const res = await moveQuestionBookmarkMutationFn({
          bookmarkId: question.myBookmark.id,
          bookmarkFolderId: folderId,
        });
        if (res.data.moveQuestionBookmark.error) {
          message.error(res.data.moveQuestionBookmark.error);
          return;
        }
      } else {
        const res = await createQuestionBookmarkMutationFn({
          questionId: question.id,
          questionBookmarkFolderId: folderId,
        });
        if (res.data.createQuestionBookmark.error) {
          message.error(res.data.createQuestionBookmark.error);
          return;
        }
        refetch();
      }
    } catch {
      message.error('북마크 저장에 실패했습니다.');
    }
  };

  const deleteBookmark: HandleDeleteBookmark = async (question) => {
    try {
      if (!question.myBookmark) {
        message.error('북마크가 존재하지 않습니다.');
        return;
      }
      const res = await deleteQuestionBookmarkMutationFn({
        questionBookmarkId: question.myBookmark.id,
      });
      if (res.data.deleteQuestionBookmark.error) {
        message.error(res.data.deleteQuestionBookmark.error);
        return;
      }
      refetch();
    } catch {
      message.error('북마크 삭제에 실패했습니다.');
    }
  };

  return {
    saveBookmark,
    deleteBookmark,
    questions: data?.searchQuestionsByKeyword.questions || [],
    isLoading,
    refetch,
  };
};

export default useSearchQuestions;
