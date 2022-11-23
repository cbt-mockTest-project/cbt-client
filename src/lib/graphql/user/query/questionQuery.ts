import { gql } from '@apollo/client';
import { FULL_QUESTION_FRAGMENT } from './questionFragment';

export const READ_QUESTIONS_BY_TITLE = gql`
  query ReadMockExamQuestionsByMockExamTitle(
    $input: ReadMockExamQuestionsByMockExamTitleInput!
  ) {
    readMockExamQuestionsByMockExamTitle(input: $input) {
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
