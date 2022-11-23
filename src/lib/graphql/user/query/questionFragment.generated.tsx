import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type FullQuestionPartsFragment = { __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', content: string, id: number }> };

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
  id
  mockExamQuestionFeedback {
    content
    id
  }
  number
  approved
}
    `;