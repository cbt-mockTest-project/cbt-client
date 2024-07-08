import { gql } from '@apollo/client';

export const GET_QUIZES = gql`
  query GetQuizs($input: GetQuizsInput!) {
    getQuizs(input: $input) {
      error
      ok
      quizs {
        comment {
          user {
            id
            nickname
          }
          content
          likesCount
          likeState
          created_at
          id
        }
        date
        id
        question {
          id
          question
          solution
          question_img {
            url
          }
          solution_img {
            url
          }
          mockExam {
            id
            title
          }
        }
        category {
          name
        }
      }
    }
  }
`;

export const EDIT_QUIZ_COMMENT = gql`
  mutation EditQuizComment($input: EditQuizCommentInput!) {
    editQuizComment(input: $input) {
      error
      ok
    }
  }
`;

export const CREATE_QUIZ_COMMENT = gql`
  mutation CreateQuizComment($input: CreateQuizCommentInput!) {
    createQuizComment(input: $input) {
      ok
      error
      comment {
        user {
          id
          nickname
        }
        content
        likesCount
        likeState
        created_at
        id
      }
    }
  }
`;

export const DELETE_QUIZ_COMMENT = gql`
  mutation DeleteQuizComment($input: DeleteQuizCommentInput!) {
    deleteQuizComment(input: $input) {
      error
      ok
    }
  }
`;
