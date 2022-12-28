import { gql } from '@apollo/client';
export const CREATE_OR_UPDATE_QUESTION_STATE = gql`
  mutation CreateOrUpdateMockExamQuestionState(
    $input: CreateOrUpdateMockExamQuestionStateInput!
  ) {
    createOrUpdateMockExamQuestionState(input: $input) {
      error
      message
      currentState
      ok
    }
  }
`;

export const RESET_QUESTION_STATE_MUTATION = gql`
  mutation ResetMyExamQuestionState($input: ResetMyExamQuestionStateInput!) {
    resetMyExamQuestionState(input: $input) {
      error
      ok
    }
  }
`;

export const READ_QUESTION_STATE_QUERY = gql`
  query ReadMyExamQuestionState($input: ReadMyExamQuestionStateInput!) {
    readMyExamQuestionState(input: $input) {
      error
      ok
      state {
        state
      }
    }
  }
`;
