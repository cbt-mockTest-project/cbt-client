import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditMockExamQuestionCommentLikeMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionCommentLikeInput;
}>;


export type EditMockExamQuestionCommentLikeMutation = { __typename?: 'Mutation', editMockExamQuestionCommentLike: { __typename?: 'EditMockExamQuestionCommentLikeOutput', error?: string | null, ok: boolean, currentState: boolean } };

export type ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionCommentLikesByQuestinIdInput;
}>;


export type ReadMockExamQuestionCommentLikesByQuestinIdQuery = { __typename?: 'Query', readMockExamQuestionCommentLikesByQuestinId: { __typename?: 'ReadMockExamQuestionCommentLikesByQuestinIdOutput', count: number, error?: string | null, ok: boolean } };


export const EditMockExamQuestionCommentLikeDocument = gql`
    mutation EditMockExamQuestionCommentLike($input: EditMockExamQuestionCommentLikeInput!) {
  editMockExamQuestionCommentLike(input: $input) {
    error
    ok
    currentState
  }
}
    `;

export function useEditMockExamQuestionCommentLikeMutation() {
  return Urql.useMutation<EditMockExamQuestionCommentLikeMutation, EditMockExamQuestionCommentLikeMutationVariables>(EditMockExamQuestionCommentLikeDocument);
};
export const ReadMockExamQuestionCommentLikesByQuestinIdDocument = gql`
    query ReadMockExamQuestionCommentLikesByQuestinId($input: ReadMockExamQuestionCommentLikesByQuestinIdInput!) {
  readMockExamQuestionCommentLikesByQuestinId(input: $input) {
    count
    error
    ok
  }
}
    `;

export function useReadMockExamQuestionCommentLikesByQuestinIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionCommentLikesByQuestinIdQuery, ReadMockExamQuestionCommentLikesByQuestinIdQueryVariables>({ query: ReadMockExamQuestionCommentLikesByQuestinIdDocument, ...options });
};