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


export type ReadMockExamQuestionsByMockExamIdQuery = { __typename?: 'Query', readMockExamQuestionsByMockExamId: { __typename?: 'ReadMockExamQuestionsByMockExamIdOutput', count: number, error?: string | null, ok: boolean, title: string, author: string, questions: Array<{ __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, mockExamQuestionComment: Array<{ __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number, role: Types.UserRole } }>, mockExam?: { __typename?: 'MockExam', title: string } | null, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', id: number, content: string, type: Types.QuestionFeedbackType, created_at: any, updated_at: any, user: { __typename?: 'User', nickname: string, id: number } }>, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string, exam: { __typename?: 'MockExam', id: number } }>, mockExamQuestionBookmark: Array<{ __typename?: 'MockExamQuestionBookmark', user: { __typename?: 'User', id: number } }> }> } };

export type ReadAllQuestionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadAllQuestionsQuery = { __typename?: 'Query', readAllQuestions: { __typename?: 'ReadAllQuestionsOutput', error?: string | null, ok: boolean, questions?: Array<{ __typename?: 'MockExamQuestion', id: number }> | null } };

export type ReadMockExamQuestionQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionInput;
}>;


export type ReadMockExamQuestionQuery = { __typename?: 'Query', readMockExamQuestion: { __typename?: 'ReadMockExamQuestionOutput', isCoAuthor: boolean, error?: string | null, ok: boolean, mockExamQusetion: { __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, user: { __typename?: 'User', id: number, role: Types.UserRole }, mockExam?: { __typename?: 'MockExam', title: string } | null, question_img?: Array<{ __typename?: 'MockExamImageType', url: string, name: string, uid: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string, name: string, uid: string }> | null, mockExamQuestionComment: Array<{ __typename?: 'MockExamQuestionComment', created_at: any, content: string, likeState: boolean, likesCount: number, id: number, user: { __typename?: 'User', nickname: string, id: number, role: Types.UserRole } }>, mockExamQuestionBookmark: Array<{ __typename?: 'MockExamQuestionBookmark', id: number }>, mockExamQuestionFeedback: Array<{ __typename?: 'MockExamQuestionFeedback', id: number, content: string, type: Types.QuestionFeedbackType, created_at: any, updated_at: any, user: { __typename?: 'User', nickname: string, id: number } }> } } };

export type EditMockExamQuestionMutationVariables = Types.Exact<{
  input: Types.EditMockExamQuestionInput;
}>;


export type EditMockExamQuestionMutation = { __typename?: 'Mutation', editMockExamQuestion: { __typename?: 'EditMockExamQuestionOutput', error?: string | null, ok: boolean } };

export type DeleteMockExamQuestionMutationVariables = Types.Exact<{
  input: Types.DeleteMockExamQuestionInput;
}>;


export type DeleteMockExamQuestionMutation = { __typename?: 'Mutation', deleteMockExamQuestion: { __typename?: 'DeleteMockExamQuestionOutput', error?: string | null, ok: boolean } };

export type ReadAllMockExamQuestionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ReadAllMockExamQuestionQuery = { __typename?: 'Query', readAllMockExamQuestion: { __typename?: 'ReadAllMockExamQuestionOutput', error?: string | null, ok: boolean, mockExamQuestions: Array<{ __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> }> } };

export type CreateMockExamQuestionMutationVariables = Types.Exact<{
  input: Types.CreateMockExamQuestionInput;
}>;


export type CreateMockExamQuestionMutation = { __typename?: 'Mutation', createMockExamQuestion: { __typename?: 'CreateMockExamQuestionOutput', error?: string | null, ok: boolean, questionId?: number | null } };

export type ReadMockExamQuestionsByStateQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionsByStateInput;
}>;


export type ReadMockExamQuestionsByStateQuery = { __typename?: 'Query', readMockExamQuestionsByState: { __typename?: 'ReadMockExamQuestionsByStateOutput', error?: string | null, ok: boolean, mockExamQusetions: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, question: { __typename?: 'MockExamQuestion', question: string, solution?: string | null, id: number, number: number, approved: boolean, question_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, solution_img?: Array<{ __typename?: 'MockExamImageType', url: string }> | null, state: Array<{ __typename?: 'MockExamQuestionState', state: Types.QuestionState, answer: string }> }, exam: { __typename?: 'MockExam', title: string } }> } };

export type ReadMockExamQuestionNumbersQueryVariables = Types.Exact<{
  input: Types.ReadMockExamQuestionNumbersInput;
}>;


export type ReadMockExamQuestionNumbersQuery = { __typename?: 'Query', readMockExamQuestionNumbers: { __typename?: 'ReadMockExamQuestionNumbersOutput', error?: string | null, ok: boolean, examStatus?: Types.ExamStatus | null, questionNumbers: Array<{ __typename?: 'QuestionNumber', questionNumber: number, questionId: number }> } };


export const ReadMockExamQuestionsByMockExamIdDocument = gql`
    query ReadMockExamQuestionsByMockExamId($input: ReadMockExamQuestionsByMockExamIdInput!) {
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
        type
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
        type
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
    ${QusetionCommentPartsFragmentDoc}`;

export function useReadMockExamQuestionQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionQuery, ReadMockExamQuestionQueryVariables>({ query: ReadMockExamQuestionDocument, ...options });
};
export const EditMockExamQuestionDocument = gql`
    mutation EditMockExamQuestion($input: EditMockExamQuestionInput!) {
  editMockExamQuestion(input: $input) {
    error
    ok
  }
}
    `;

export function useEditMockExamQuestionMutation() {
  return Urql.useMutation<EditMockExamQuestionMutation, EditMockExamQuestionMutationVariables>(EditMockExamQuestionDocument);
};
export const DeleteMockExamQuestionDocument = gql`
    mutation DeleteMockExamQuestion($input: DeleteMockExamQuestionInput!) {
  deleteMockExamQuestion(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteMockExamQuestionMutation() {
  return Urql.useMutation<DeleteMockExamQuestionMutation, DeleteMockExamQuestionMutationVariables>(DeleteMockExamQuestionDocument);
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
export const CreateMockExamQuestionDocument = gql`
    mutation CreateMockExamQuestion($input: CreateMockExamQuestionInput!) {
  createMockExamQuestion(input: $input) {
    error
    ok
    questionId
  }
}
    `;

export function useCreateMockExamQuestionMutation() {
  return Urql.useMutation<CreateMockExamQuestionMutation, CreateMockExamQuestionMutationVariables>(CreateMockExamQuestionDocument);
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
      exam {
        title
      }
    }
    ok
  }
}
    ${FullQuestionPartsFragmentDoc}`;

export function useReadMockExamQuestionsByStateQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionsByStateQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionsByStateQuery, ReadMockExamQuestionsByStateQueryVariables>({ query: ReadMockExamQuestionsByStateDocument, ...options });
};
export const ReadMockExamQuestionNumbersDocument = gql`
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

export function useReadMockExamQuestionNumbersQuery(options: Omit<Urql.UseQueryArgs<ReadMockExamQuestionNumbersQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadMockExamQuestionNumbersQuery, ReadMockExamQuestionNumbersQueryVariables>({ query: ReadMockExamQuestionNumbersDocument, ...options });
};