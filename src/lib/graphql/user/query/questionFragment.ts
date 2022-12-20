import { gql } from '@apollo/client';

export const FULL_QUESTION_FRAGMENT = gql`
  fragment FullQuestionParts on MockExamQuestion {
    question
    solution
    question_img {
      url
    }
    solution_img {
      url
    }
    state {
      state
      answer
    }
    id
    number
    approved
  }
`;

export const FULL_QUESTION_INCLUDING_EXAMID_FRAGMENT = gql`
  fragment FullQuestionIncludingExamIdParts on MockExamQuestion {
    question
    solution
    question_img {
      url
    }
    solution_img {
      url
    }
    state {
      state
      exam {
        id
      }
      answer
    }
    id
    number
    approved
  }
`;
