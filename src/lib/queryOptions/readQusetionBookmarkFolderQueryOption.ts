import { READ_QUESTION_BOOKMARK_FOLDERS } from '@lib/graphql/query/questionBookmarkFolderQuery';
import {
  ReadQuestionBookmarkFoldersQuery,
  ReadQuestionBookmarkFoldersQueryVariables,
} from '@lib/graphql/query/questionBookmarkFolderQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';

export const readQuestionBookmarkFolderQueryOption = queryOptions({
  queryKey: ['questionBookmarkFolder'],
  queryFn: async () => {
    const { data } = await apolloClient.query<
      ReadQuestionBookmarkFoldersQuery,
      ReadQuestionBookmarkFoldersQueryVariables
    >({
      query: READ_QUESTION_BOOKMARK_FOLDERS,
      fetchPolicy: 'network-only',
    });
    return data;
  },
});
