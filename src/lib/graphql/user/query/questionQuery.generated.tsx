import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { FullQuestionPartsFragmentDoc } from './questionFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadMockExamQuestionsByMockExamIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByMockExamIdInput;
}>;


export type ReadMockExamQuestionsByMockExamIdQuery = { __typename?: 'Query', readMockExamQuestionsByMockExamId: { __typename?: 'ReadMockExamQuestionsByMockExamIdOutput', count: number, error?: string | null, ok: boolean, questions: Array<{ __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState }> }> } };

export type ReadMockExamQuestionQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionInput;
}>;


export type ReadMockExamQuestionQuery = { __typename?: 'Query', readMockExamQuestion: { __typename?: 'ReadMockExamQuestionOutput', error?: string | null, ok: boolean, state?: Types.QuestionState | null, mockExamQusetion: { __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState }> } } };


export const ReadMockExamQuestionsByMockExamIdDocument = gql`
    query ReadMockExamQuestionsByMockExamId($input: ReadMockExamQuestionsByMockExamIdInput!) {
  readMockExamQuestionsByMockExamId(input: $input) {
    count
    error
    ok
    questions {
      ...FullQuestionParts
    }
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionsByMockExamIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByMockExamIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByMockExamIdQuery, ReadMockExamQuestionsByMockExamIdQueryVariables>({ query: ReadMockExamQuestionsByMockExamIdDocument, ...options });
};
export const ReadMockExamQuestionDocument = gql`
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
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>({ query: ReadMockExamQuestionDocument, ...options });
};