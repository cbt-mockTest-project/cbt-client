import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateOrUpdateMockExamQuestionStateMutationVariables = Types.Exact<{
  input: Types.CreateOrUpdateMockExamQuestionStateInput;
}>;


export type CreateOrUpdateMockExamQuestionStateMutation = { __typename?: 'Mutation', createOrUpdateMockExamQuestionState: { __typename?: 'CreateOrUpdateMockExamQuestionStateOutput', error?: string | null, message?: string | null, currentState?: Types.QuestionState | null, ok: boolean } };

export type ResetMyExamQuestionStateMutationVariables = Types.Exact<{
  input: Types.ResetMyExamQuestionStateInput;
}>;


export type ResetMyExamQuestionStateMutation = { __typename?: 'Mutation', resetMyExamQuestionState: { __typename?: 'ResetMyExamQuestionStateOutput', error?: string | null, ok: boolean } };


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
export const ResetMyExamQuestionStateDocument = gql`
    mutation ResetMyExamQuestionState($input: ResetMyExamQuestionStateInput!) {
  resetMyExamQuestionState(input: $input) {
    error
    ok
  }
}
    `;

export function useResetMyExamQuestionStateMutation() {
  return Urql.useMutation<ResetMyExamQuestionStateMutation, ResetMyExamQuestionStateMutationVariables>(ResetMyExamQuestionStateDocument);
};