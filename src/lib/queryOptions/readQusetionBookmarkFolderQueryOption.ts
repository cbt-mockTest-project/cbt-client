import { READ_QUESTION_BOOKMARK_FOLDERS } from '@lib/graphql/query/questionBookmarkFolderQuery';
import {
  ReadQuestionBookmarkFoldersQuery,
  ReadQuestionBookmarkFoldersQueryVariables,
} from '@lib/graphql/query/questionBookmarkFolderQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';

export const GET_QUESTION_BOOKMARK_FOLDERS_QUERY_KEY = [
  'questionBookmarkFolder',
];

const randomFolderList = [
  [
    {
      id: '1',
      name: '즐겨찾기 폴더 1',
    },
  ],
  [
    {
      id: '2',
      name: '즐겨찾기 폴더 2',
    },
    {
      id: '1',
      name: '즐겨찾기 폴더 1',
    },
  ],
  [
    {
      id: '3',
      name: '즐겨찾기 폴더 3',
    },
  ],
];

export const readQuestionBookmarkFolderQueryOption = queryOptions({
  queryKey: GET_QUESTION_BOOKMARK_FOLDERS_QUERY_KEY,
  queryFn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(
      randomFolderList[Math.floor(Math.random() * randomFolderList.length)]
    );
    return {
      readQuestionBookmarkFolders: {
        folders:
          randomFolderList[Math.floor(Math.random() * randomFolderList.length)],
      },
    };
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
