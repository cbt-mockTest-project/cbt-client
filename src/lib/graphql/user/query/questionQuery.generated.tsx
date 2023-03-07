import * as Types from '../../../../types';

import gql from 'graphql-tag';
import { FullQuestionIncludingExamIdPartsFragmentDoc } from './questionFragment.generated';
import { QusetionCommentPartsFragmentDoc } from './questionCommentFragment.generated';
import { FullQuestionPartsFragmentDoc } from './questionFragment.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReadMockExamQuestionsByMockExamIdQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByMockExamIdInput;
}>;


export type ReadMockExamQuestionsByMockExamIdQuery = { __typename?: 'Query', readMockExamQuestionsByMockExamId: { __typename?: 'ReadMockExamQuestionsByMockExamIdOutput', count: number, error?: string | null, ok: boolean, title: string, questions: Array<{ __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, mockExamQuestionComment: Array<{ __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number, role: Types.UserRole } }>, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string, exam: { __typename?: 'MockExam', id: number } }>, mockExamQuestionBookmark: Array<{ __typename?: 'MockExamQuestionBookmark', user: { __typename?: 'User', id: number } }> }> } };

export type ReadAllQuestionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadAllQuestionsQuery = { __typename?: 'Query', readAllQuestions: { __typename?: 'ReadAllQuestionsOutput', error?: string | null, ok: boolean, questions?: Array<{ __typename?: 'MockExamQuestion', id: number }> | null } };

export type ReadMockExamQuestionQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionInput;
}>;


export type ReadMockExamQuestionQuery = { __typename?: 'Query', readMockExamQuestion: { __typename?: 'ReadMockExamQuestionOutput', error?: string | null, ok: boolean, mockExamQusetion: { __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, mockExam: { __typename?: 'MockExam', title: string }, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, mockExamQuestionComment: Array<{ __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number, role: Types.UserRole } }>, mockExamQuestionBookmark: Array<{ __typename?: 'MockExamQuestionBookmark', id: number }> } } };

export type ReadAllMockExamQuestionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadAllMockExamQuestionQuery = { __typename?: 'Query', readAllMockExamQuestion: { __typename?: 'ReadAllMockExamQuestionOutput', error?: string | null, ok: boolean, mockExamQuestions: Array<{ __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> }> } };

export type ReadMockExamQuestionsByStateQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByStateInput;
}>;


export type ReadMockExamQuestionsByStateQuery = { __typename?: 'Query', readMockExamQuestionsByState: { __typename?: 'ReadMockExamQuestionsByStateOutput', error?: string | null, ok: boolean, mockExamQusetions: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, question: { __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> } }> } };


export const ReadMockExamQuestionsByMockExamIdDocument = gql`
    query ReadMockExamQuestionsByMockExamId($input: ReadMockExamQuestionsByMockExamIdInput!) {
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
    ${FullQuestionIncludingExamIdPartsFragmentDoc}
${QusetionCommentPartsFragmentDoc}`;

export function useReadMockExamQuestionsByMockExamIdQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByMockExamIdQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByMockExamIdQuery, ReadMockExamQuestionsByMockExamIdQueryVariables>({ query: ReadMockExamQuestionsByMockExamIdDocument, ...options });
};
export const ReadAllQuestionsDocument = gql`
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

export function useReadAllQuestionsQuery(options?: Omit<Urql.UseQueryArgs<ReadAllQuestionsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllQuestionsQuery, ReadAllQuestionsQueryVariables>({ query: ReadAllQuestionsDocument, ...options });
};
export const ReadMockExamQuestionDocument = gql`
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
    ${QusetionCommentPartsFragmentDoc}`;

export function useReadMockExamQuestionQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>({ query: ReadMockExamQuestionDocument, ...options });
};
export const ReadAllMockExamQuestionDocument = gql`
    query ReadAllMockExamQuestion {
  readAllMockExamQuestion {
    error
    ok
    mockExamQuestions {
      ...FullQuestionParts
    }
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadAllMockExamQuestionQuery(options?: Omit<Urql.UseQueryArgs<ReadAllMockExamQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadAllMockExamQuestionQuery, ReadAllMockExamQuestionQueryVariables>({ query: ReadAllMockExamQuestionDocument, ...options });
};
export const ReadMockExamQuestionsByStateDocument = gql`
    query ReadMockExamQuestionsByState($input: ReadMockExamQuestionsByStateInput!) {
  readMockExamQuestionsByState(input: $input) {
    error
    mockExamQusetions {
      state
      question {
        ...FullQuestionParts
      }
    }
    ok
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionsByStateQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByStateQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByStateQuery, ReadMockExamQuestionsByStateQueryVariables>({ query: ReadMockExamQuestionsByStateDocument, ...options });
};