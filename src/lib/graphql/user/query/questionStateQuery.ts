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

export const READ_EXAM_TITLE_AND_ID_BY_QUESTION_STATE = gql`
  query ReadExamTitleAndIdByQuestionState {
    readExamTitleAndIdByQuestionState {
      error
      ok
      titleAndId {
        id
        title
      }
    }
  }
`;

export const RESET_MY_ALL_QUESTION_STATE = gql`
  mutation RestMyAllQuestionStates {
    restMyAllQuestionStates {
      error
      ok
    }
  }
`;
