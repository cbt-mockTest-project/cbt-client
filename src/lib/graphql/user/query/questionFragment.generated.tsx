import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type FullQuestionPartsFragment = { __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> };

export type FullQuestionIncludingExamIdPartsFragment = { __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string, exam: { __typename?: 'MockExam', id: number } }> };

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