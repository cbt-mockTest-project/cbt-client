import { EDIT_QUESTION_BOOKMARK } from '@lib/graphql/query/questionBookmarkQuery';
import {
  EditMockExamQuestionBookmarkMutation,
  EditMockExamQuestionBookmarkMutationVariables,
} from '@lib/graphql/query/questionBookmarkQuery.generated';
import { SEARCH_QEUSTIONS } from '@lib/graphql/query/questionQuery';
import {
  SearchQuestionsByKeywordQuery,
  SearchQuestionsByKeywordQueryVariables,
} from '@lib/graphql/query/questionQuery.generated';
import { handleError } from '@lib/utils/utils';
import { initializeApollo } from '@modules/apollo';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { EditMockExamQuestionBookmarkInput } from 'types';
import { queryClient } from '../../../pages/_app';

const useSearchQuestions = () => {
  const router = useRouter();
  const apolloClient = initializeApollo({}, '');
  const keyword = router.query.q;
  const examIds = router.query.examIds as string;

  const searchQuestionsQueryOptions = queryOptions({
    queryKey: ['searchQuestions', keyword, examIds],
    queryFn: async () => {
      if (!keyword || !examIds) return;
      const { data } = await apolloClient.query<
        SearchQuestionsByKeywordQuery,
        SearchQuestionsByKeywordQueryVariables
      >({
        query: SEARCH_QEUSTIONS,
        variables: {
          input: {
            keyword: keyword as string,
            examIds: examIds ? examIds.split(',').map((id) => Number(id)) : [],
          },
        },
      });
      return data;
    },
  });

  const { data, isLoading } = useQuery(searchQuestionsQueryOptions);

  const toogleQuestionBookmarkMutation = useMutation({
    mutationKey: ['toggleQuestionBookmark'],
    mutationFn: async (input: EditMockExamQuestionBookmarkInput) => {
      const {
        data: { editMockExamQuestionBookmark: toggleQuestionBookmark },
      } = await apolloClient.mutate<
        EditMockExamQuestionBookmarkMutation,
        EditMockExamQuestionBookmarkMutationVariables
      >({
        mutation: EDIT_QUESTION_BOOKMARK,
        variables: { input },
      });
      return toggleQuestionBookmark;
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({
        queryKey: searchQuestionsQueryOptions.queryKey,
      });
      const previousValue =
        queryClient.getQueryData<SearchQuestionsByKeywordQuery>(
          searchQuestionsQueryOptions.queryKey
        );
      queryClient.setQueryData<SearchQuestionsByKeywordQuery>(
        searchQuestionsQueryOptions.queryKey,
        (prev) => {
          return {
            ...prev,
            searchQuestionsByKeyword: {
              ...prev.searchQuestionsByKeyword,
              questions: prev.searchQuestionsByKeyword.questions.map(
                (question) => {
                  if (question.id === input.questionId) {
                    return {
                      ...question,
                      isBookmarked: !question.isBookmarked,
                    };
                  }
                  return question;
                }
              ),
            },
          };
        }
      );
      return { previousValue };
    },
    onError: (error, newQuestitons, context) => {
      message.error('북마크를 수정하는데 실패했습니다.');
      handleError(error);
      queryClient.setQueryData<SearchQuestionsByKeywordQuery>(
        searchQuestionsQueryOptions.queryKey,
        context.previousValue
      );
    },
    onSuccess: (data) => {
      if (data.error) {
        return message.error(data.error);
      }
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: searchQuestionsQueryOptions.queryKey,
    //   });
    // },
  });

  return {
    questions: data?.searchQuestionsByKeyword.questions || [],
    isLoading,
    toogleQuestionBookmark: toogleQuestionBookmarkMutation.mutate,
  };
};

export default useSearchQuestions;
