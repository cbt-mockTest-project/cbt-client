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

export const READ_ALL_QUESTIONS = gql`
  query ReadAllQuestions {
    readAllQuestions {
      error
      ok
      questions {
        id
      }
    }
  }
`;

export const READ_QUESTION = gql`
  query ReadMockExamQuestion($input: ReadMockExamQuestionInput!) {
    readMockExamQuestion(input: $input) {
      mockExamQusetion {
        question
        solution
        mockExam {
          title
        }
        question_img {
          url
        }
        solution_img {
          url
        }
        id
        number
        approved
        mockExamQuestionComment {
          ...QusetionCommentParts
        }
        mockExamQuestionBookmark {
          id
        }
      }
      error
      ok
    }
  }
  ${FULL_QUESTION_COMMENT_FRAGMENT}
`;

// 북마크용 추후 네이밍 수정예정
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
