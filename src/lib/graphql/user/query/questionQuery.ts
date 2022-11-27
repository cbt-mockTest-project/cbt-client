import { gql } from '@apollo/client';
import { FULL_QUESTION_FRAGMENT } from './questionFragment';

export const READ_QUESTIONS_BY_ID = gql`
  query ReadMockExamQuestionsByMockExamId(
    $input: ReadMockExamQuestionsByMockExamIdInput!
  ) {
    readMockExamQuestionsByMockExamId(input: $input) {
      count
      error
      ok
      questions {
        ...FullQuestionParts
      }
    }
  }
  ${FULL_QUESTION_FRAGMENT}
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