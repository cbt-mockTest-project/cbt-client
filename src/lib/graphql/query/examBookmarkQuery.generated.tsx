import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetMyBookmarkedExamsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyBookmarkedExamsQuery = { __typename?: 'Query', getMyBookmarkedExams: { __typename?: 'GetMyBookmarkedExamsOutput', error?: string | null, ok: boolean, exams?: Array<{ __typename?: 'MockExam', id: number, slug?: string | null, title: string, user: { __typename?: 'User', id: number, nickname: string } }> | null } };

export type ToggleExamBookmarkMutationVariables = Types.Exact<{
  input: Types.ToggleExamBookmarkInput;
}>;


export type ToggleExamBookmarkMutation = { __typename?: 'Mutation', toggleExamBookmark: { __typename?: 'ToggleExamBookmarkOutput', error?: string | null, ok: boolean, isBookmarked?: boolean | null } };


export const GetMyBookmarkedExamsDocument = gql`
    query GetMyBookmarkedExams {
  getMyBookmarkedExams {
    error
    ok
    exams {
      id
      slug
      title
      user {
        id
        nickname
      }
    }
  }
}
    `;

export function useGetMyBookmarkedExamsQuery(options?: Omit<Urql.UseQueryArgs<GetMyBookmarkedExamsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyBookmarkedExamsQuery, GetMyBookmarkedExamsQueryVariables>({ query: GetMyBookmarkedExamsDocument, ...options });
};
export const ToggleExamBookmarkDocument = gql`
    mutation ToggleExamBookmark($input: ToggleExamBookmarkInput!) {
  toggleExamBookmark(input: $input) {
    error
    ok
    isBookmarked
  }
}
    `;

export function useToggleExamBookmarkMutation() {
  return Urql.useMutation<ToggleExamBookmarkMutation, ToggleExamBookmarkMutationVariables>(ToggleExamBookmarkDocument);
};