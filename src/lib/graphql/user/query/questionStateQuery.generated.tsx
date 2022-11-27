import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateOrUpdateMockExamQuestionStateMutationVariables = Types.Exact<{
  input: Types.CreateOrUpdateMockExamQuestionStateInput;
}>;


export type CreateOrUpdateMockExamQuestionStateMutation = { __typename?: 'Mutation', createOrUpdateMockExamQuestionState: { __typename?: 'CreateOrUpdateMockExamQuestionStateOutput', error?: string | null, message?: string | null, currentState: Types.QuestionState, ok: boolean } };


export const CreateOrUpdateMockExamQuestionStateDocument = gql`
    mutation CreateOrUpdateMockExamQuestionState($input: CreateOrUpdateMockExamQuestionStateInput!) {
  createOrUpdateMockExamQuestionState(input: $input) {
    error
    message
    currentState
    ok
  }
}
    `;

export function useCreateOrUpdateMockExamQuestionStateMutation() {
  return Urql.useMutation<CreateOrUpdateMockExamQuestionStateMutation, CreateOrUpdateMockExamQuestionStateMutationVariables>(CreateOrUpdateMockExamQuestionStateDocument);
};