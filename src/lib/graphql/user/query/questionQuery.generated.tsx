import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { FullQuestionIncludingExamIdPartsFragmentDoc } from './questionFragment.generated';
import { FullQuestionPartsFragmentDoc } from './questionFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadMockExamQuestionsByMockExamIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByMockExamIdInput;
}>;


export type ReadMockExamQuestionsByMockExamIdQuery = { __typename?: 'Query', readMockExamQuestionsByMockExamId: { __typename?: 'ReadMockExamQuestionsByMockExamIdOutput', count: number, error?: string | null, ok: boolean, title: string, questions: Array<{ __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string, exam: { __typename?: 'MockExam', id: number } }>, mockExamQuestionBookmark: Array<{ __typename?: 'MockExamQuestionBookmark', user: { __typename?: 'User', id: number } }> }> } };

export type ReadMockExamQuestionQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionInput;
}>;


export type ReadMockExamQuestionQuery = { __typename?: 'Query', readMockExamQuestion: { __typename?: 'ReadMockExamQuestionOutput', error?: string | null, ok: boolean, state?: Types.QuestionState | null, mockExamQusetion: { __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> } } };

export type ReadMockExamQuestionsByStateQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByStateInput;
}>;


export type ReadMockExamQuestionsByStateQuery = { __typename?: 'Query', readMockExamQuestionsByState: { __typename?: 'ReadMockExamQuestionsByStateOutput', error?: string | null, ok: boolean, mockExamQusetions: Array<{ __typename?: 'MockExamQuestion', question: string, solution: string, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> }> } };


export const ReadMockExamQuestionsByMockExamIdDocument = gql`
    query ReadMockExamQuestionsByMockExamId($input: ReadMockExamQuestionsByMockExamIdInput!) {
  readMockExamQuestionsByMockExamId(input: $input) {
    count
    error
    ok
    title
    questions {
      ...FullQuestionIncludingExamIdParts
    }
  }
}
    ${FullQuestionIncludingExamIdPartsFragmentDoc}`;

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
export const ReadMockExamQuestionsByStateDocument = gql`
    query ReadMockExamQuestionsByState($input: ReadMockExamQuestionsByStateInput!) {
  readMockExamQuestionsByState(input: $input) {
    error
    mockExamQusetions {
      ...FullQuestionParts
    }
    ok
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionsByStateQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByStateQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByStateQuery, ReadMockExamQuestionsByStateQueryVariables>({ query: ReadMockExamQuestionsByStateDocument, ...options });
};