import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DeleteMockExamQuestionFeedbackMutationVariables = Types.Exact<{
  input: Types.DeleteMockExamQuestionFeedbackInput;
}>;


export type DeleteMockExamQuestionFeedbackMutation = { __typename?: 'Mutation', deleteMockExamQuestionFeedback: { __typename?: 'DeleteMockExamQuestionFeedbackOutput', error?: string | null, ok: boolean } };

export type GetExamTitleWithFeedbackQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetExamTitleWithFeedbackQuery = { __typename?: 'Query', getExamTitleWithFeedback: { __typename?: 'GetExamTitleWithFeedbackOutput', error?: string | null, ok: boolean, titles: Array<{ __typename?: 'GetExamTitleWithFeedbackTitle', id: number, title: string }> } };


export const DeleteMockExamQuestionFeedbackDocument = gql`
    mutation DeleteMockExamQuestionFeedback($input: DeleteMockExamQuestionFeedbackInput!) {
  deleteMockExamQuestionFeedback(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteMockExamQuestionFeedbackMutation() {
  return Urql.useMutation<DeleteMockExamQuestionFeedbackMutation, DeleteMockExamQuestionFeedbackMutationVariables>(DeleteMockExamQuestionFeedbackDocument);
};
export const GetExamTitleWithFeedbackDocument = gql`
    query GetExamTitleWithFeedback {
  getExamTitleWithFeedback {
    error
    ok
    titles {
      id
      title
    }
  }
}
    `;

export function useGetExamTitleWithFeedbackQuery(options?: Omit<Urql.UseQueryArgs<GetExamTitleWithFeedbackQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExamTitleWithFeedbackQuery, GetExamTitleWithFeedbackQueryVariables>({ query: GetExamTitleWithFeedbackDocument, ...options });
};