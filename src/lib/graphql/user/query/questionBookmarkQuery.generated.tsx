import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { FullQuestionPartsFragmentDoc } from './questionFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditMockExamQuestionBookmarkMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionBookmarkInput;
}>;


export type EditMockExamQuestionBookmarkMutation = { __typename?: 'Mutation', editMockExamQuestionBookmark: { __typename?: 'EditMockExamQuestionBookmarkOutput', currentState: boolean, error?: string | null, ok: boolean } };

export type ReadMockExamQuestionBookmarkQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionBookmarkInput;
}>;


export type ReadMockExamQuestionBookmarkQuery = { __typename?: 'Query', readMockExamQuestionBookmark: { __typename?: 'ReadMockExamQuestionBookmarkOutput', error?: string | null, ok: boolean, questions: Array<{ __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> }> } };


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
      ...FullQuestionParts
    }
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionBookmarkQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionBookmarkQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionBookmarkQuery, ReadMockExamQuestionBookmarkQueryVariables>({ query: ReadMockExamQuestionBookmarkDocument, ...options });
};