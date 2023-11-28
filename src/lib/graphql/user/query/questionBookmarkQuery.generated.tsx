import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { PureQuestionPartsFragmentDoc } from './questionFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditMockExamQuestionBookmarkMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionBookmarkInput;
}>;


export type EditMockExamQuestionBookmarkMutation = { __typename?: 'Mutation', editMockExamQuestionBookmark: { __typename?: 'EditMockExamQuestionBookmarkOutput', currentState: boolean, error?: string | null, ok: boolean } };

export type ReadMockExamQuestionBookmarkQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionBookmarkInput;
}>;


export type ReadMockExamQuestionBookmarkQuery = { __typename?: 'Query', readMockExamQuestionBookmark: { __typename?: 'ReadMockExamQuestionBookmarkOutput', error?: string | null, ok: boolean, questions: Array<{ __typename?: 'MockExamQuestion', question?: string | null, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null }> } };

export type ReadExamTitleAndIdOfBookmarkedQuestionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadExamTitleAndIdOfBookmarkedQuestionQuery = { __typename?: 'Query', readExamTitleAndIdOfBookmarkedQuestion: { __typename?: 'ReadExamTitleAndIdOfBookmarkedQuestionOutput', error?: string | null, ok: boolean, titleAndId?: Array<{ __typename?: 'TitleAndId', id?: number | null, title?: string | null }> | null } };

export type ResetMyQuestionBookmarkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type ResetMyQuestionBookmarkMutation = { __typename?: 'Mutation', resetMyQuestionBookmark: { __typename?: 'CoreOutput', error?: string | null, ok: boolean } };


export const EditMockExamQuestionBookmarkDocument = gql`
    mutation EditMockExamQuestionBookmark($input: EditMockExamQuestionBookmarkInput!) {
  editMockExamQuestionBookmark(input: $input) {
    currentState
    error
    ok
  }
}
    `;

export function useEditMockExamQuestionBookmarkMutation() {
  return Urql.useMutation<EditMockExamQuestionBookmarkMutation, EditMockExamQuestionBookmarkMutationVariables>(EditMockExamQuestionBookmarkDocument);
};
export const ReadMockExamQuestionBookmarkDocument = gql`
    query ReadMockExamQuestionBookmark($input: ReadMockExamQuestionBookmarkInput!) {
  readMockExamQuestionBookmark(input: $input) {
    error
    ok
    questions {
      ...PureQuestionParts
    }
  }
}
    ${PureQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionBookmarkQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionBookmarkQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionBookmarkQuery, ReadMockExamQuestionBookmarkQueryVariables>({ query: ReadMockExamQuestionBookmarkDocument, ...options });
};
export const ReadExamTitleAndIdOfBookmarkedQuestionDocument = gql`
    query ReadExamTitleAndIdOfBookmarkedQuestion {
  readExamTitleAndIdOfBookmarkedQuestion {
    error
    ok
    titleAndId {
      id
      title
    }
  }
}
    `;

export function useReadExamTitleAndIdOfBookmarkedQuestionQuery(options?: Omit<Urql.UseQueryArgs<ReadExamTitleAndIdOfBookmarkedQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadExamTitleAndIdOfBookmarkedQuestionQuery, ReadExamTitleAndIdOfBookmarkedQuestionQueryVariables>({ query: ReadExamTitleAndIdOfBookmarkedQuestionDocument, ...options });
};
export const ResetMyQuestionBookmarkDocument = gql`
    mutation ResetMyQuestionBookmark {
  resetMyQuestionBookmark {
    error
    ok
  }
}
    `;

export function useResetMyQuestionBookmarkMutation() {
  return Urql.useMutation<ResetMyQuestionBookmarkMutation, ResetMyQuestionBookmarkMutationVariables>(ResetMyQuestionBookmarkDocument);
};