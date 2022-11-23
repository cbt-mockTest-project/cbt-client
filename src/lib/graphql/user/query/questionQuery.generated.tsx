import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { FullQuestionPartsFragmentDoc } from './questionFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadMockExamQuestionsByMockExamTitleQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByMockExamTitleInput;
}>;


export type ReadMockExamQuestionsByMockExamTitleQuery = { __typename?: 'Query', readMockExamQuestionsByMockExamTitle: { __typename?: 'ReadMockExamQuestionsByMockExamTitleOutput', count: number, error?: string | null, ok: boolean, questions: Array<{ __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', content: string, id: number }> }> } };


export const ReadMockExamQuestionsByMockExamTitleDocument = gql`
    query ReadMockExamQuestionsByMockExamTitle($input: ReadMockExamQuestionsByMockExamTitleInput!) {
  readMockExamQuestionsByMockExamTitle(input: $input) {
    count
    error
    ok
    questions {
      ...FullQuestionParts
    }
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionsByMockExamTitleQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByMockExamTitleQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByMockExamTitleQuery, ReadMockExamQuestionsByMockExamTitleQueryVariables>({ query: ReadMockExamQuestionsByMockExamTitleDocument, ...options });
};