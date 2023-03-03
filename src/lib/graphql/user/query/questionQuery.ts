import { gql } from '@apollo/client';
import { FULL_QUESTION_COMMENT_FRAGMENT } from './questionCommentFragment';
import {
  FULL_QUESTION_FRAGMENT,
  FULL_QUESTION_INCLUDING_EXAMID_FRAGMENT,
} from './questionFragment';

export const READ_QUESTIONS_BY_ID = gql`
  query ReadMockExamQuestionsByMockExamId(
    $input: ReadMockExamQuestionsByMockExamIdInput!
  ) {
    readMockExamQuestionsByMockExamId(input: $input) {
      count
      error
      ok
      title
      questions {
        ...FullQuestionIncludingExamIdParts
        mockExamQuestionComment {
          ...QusetionCommentParts
        }
      }
    }
  }
  ${FULL_QUESTION_INCLUDING_EXAMID_FRAGMENT}
  ${FULL_QUESTION_COMMENT_FRAGMENT}
`;

export const READ_QUESTION = gql`
  query ReadMockExamQuestion($input: ReadMockExamQuestionInput!) {
    readMockExamQuestion(input: $input) {
      mockExamQusetion {
        ...FullQuestionParts
      }
      error
      ok
      state
    }
  }
  ${FULL_QUESTION_FRAGMENT}
`;

export const READ_ALL_QUESTION = gql`
  query ReadAllMockExamQuestion {
    readAllMockExamQuestion {
      error
      ok
      mockExamQuestions {
        ...FullQuestionParts
      }
    }
  }
  ${FULL_QUESTION_FRAGMENT}
`;

export const READ_QUESTIONS_BY_STATE = gql`
  query ReadMockExamQuestionsByState(
    $input: ReadMockExamQuestionsByStateInput!
  ) {
    readMockExamQuestionsByState(input: $input) {
      error
      mockExamQusetions {
        ...FullQuestionParts
      }
      ok
    }
  }
  ${FULL_QUESTION_FRAGMENT}
`;
