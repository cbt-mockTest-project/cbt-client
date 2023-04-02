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
      author
      questions {
        ...FullQuestionIncludingExamIdParts
        mockExamQuestionComment {
          ...QusetionCommentParts
        }
        mockExam {
          title
        }
        mockExamQuestionFeedback {
          id
          content
          user {
            nickname
            id
          }
          created_at
          updated_at
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
      isCoAuthor
      mockExamQusetion {
        user {
          id
          role
        }
        question
        solution
        mockExam {
          title
        }
        question_img {
          url
          name
          uid
        }
        solution_img {
          url
          name
          uid
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
        mockExamQuestionFeedback {
          id
          content
          user {
            nickname
            id
          }
          created_at
          updated_at
        }
      }
      error
      ok
    }
  }
  ${FULL_QUESTION_COMMENT_FRAGMENT}
`;

export const EDIT_QUESTION = gql`
  mutation EditMockExamQuestion($input: EditMockExamQuestionInput!) {
    editMockExamQuestion(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteMockExamQuestion($input: DeleteMockExamQuestionInput!) {
    deleteMockExamQuestion(input: $input) {
      error
      ok
    }
  }
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

export const CREATE_MOCK_EXAM_QUESTION = gql`
  mutation CreateMockExamQuestion($input: CreateMockExamQuestionInput!) {
    createMockExamQuestion(input: $input) {
      error
      ok
      questionId
    }
  }
`;

export const READ_QUESTIONS_BY_STATE = gql`
  query ReadMockExamQuestionsByState(
    $input: ReadMockExamQuestionsByStateInput!
  ) {
    readMockExamQuestionsByState(input: $input) {
      error
      mockExamQusetions {
        state
        question {
          ...FullQuestionParts
        }
        exam {
          title
        }
      }
      ok
    }
  }
  ${FULL_QUESTION_FRAGMENT}
`;

export const READ_QUESTION_NUMBERS = gql`
  query ReadMockExamQuestionNumbers($input: ReadMockExamQuestionNumbersInput!) {
    readMockExamQuestionNumbers(input: $input) {
      error
      ok
      questionNumbers {
        questionNumber
        questionId
      }
      examStatus
    }
  }
`;
