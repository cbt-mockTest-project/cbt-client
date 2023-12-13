import * as Types from '../../../types';

import gql from 'graphql-tag';
export type PureQuestionPartsFragment = { __typename?: 'MockExamQuestion', question?: string | null, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null };

export type FullQuestionPartsFragment = { __typename?: 'MockExamQuestion', question?: string | null, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> };

export type FullQuestionIncludingExamIdPartsFragment = { __typename?: 'MockExamQuestion', question?: string | null, solution?: string | null, label?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, question_video?: Array<{ __typename?: 'MockExamVideoType', url: string, size: number }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string, exam: { __typename?: 'MockExam', id: number } }>, mockExamQuestionBookmark: Array<{ __typename?: 'MockExamQuestionBookmark', user: { __typename?: 'User', id: number } }> };

export const PureQuestionPartsFragmentDoc = gql`
    fragment PureQuestionParts on MockExamQuestion {
  question
  solution
  question_img {
    url
  }
  solution_img {
    url
  }
  id
  number
  approved
}
    `;
export const FullQuestionPartsFragmentDoc = gql`
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
export const FullQuestionIncludingExamIdPartsFragmentDoc = gql`
    fragment FullQuestionIncludingExamIdParts on MockExamQuestion {
  question
  solution
  label
  question_img {
    url
  }
  solution_img {
    url
  }
  question_video {
    url
    size
  }
  state {
    state
    exam {
      id
    }
    answer
  }
  mockExamQuestionBookmark {
    user {
      id
    }
  }
  id
  number
  approved
}
    `;