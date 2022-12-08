import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateMockExamQuestionFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateMockExamQuestionFeedbackInput;
}>;


export type CreateMockExamQuestionFeedbackMutation = { __typename?: 'Mutation', createMockExamQuestionFeedback: { __typename?: 'CreateMockExamQuestionFeedbackOutput', error?: string | null, ok: boolean } };


export const CreateMockExamQuestionFeedbackDocument = gql`
    mutation CreateMockExamQuestionFeedback($input: CreateMockExamQuestionFeedbackInput!) {
  createMockExamQuestionFeedback(input: $input) {
    error
    ok
  }
}
    `;

export function useCreateMockExamQuestionFeedbackMutation() {
  return Urql.useMutation<CreateMockExamQuestionFeedbackMutation, CreateMockExamQuestionFeedbackMutationVariables>(CreateMockExamQuestionFeedbackDocument);
};