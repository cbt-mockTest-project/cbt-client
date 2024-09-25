import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateMockExamHistoryMutationVariables = Types.Exact<{
  input: Types.CreateMockExamHistoryInput;
}>;

export type CreateMockExamHistoryMutation = {
  __typename?: 'Mutation';
  createMockExamHistory: {
    __typename?: 'CreateMockExamHistoryOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type ReadMyExamHistoryQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ReadMyExamHistoryQuery = {
  __typename?: 'Query';
  readMyExamHistory: {
    __typename?: 'ReadMyExamHistoryOutput';
    error?: string | null;
    mockExams?: Array<{
      __typename?: 'MockExam';
      id: number;
      title: string;
      updated_at: any;
    }> | null;
  };
};

export const CreateMockExamHistoryDocument = gql`
  mutation CreateMockExamHistory($input: CreateMockExamHistoryInput!) {
    createMockExamHistory(input: $input) {
      error
      ok
    }
  }
`;

export function useCreateMockExamHistoryMutation() {
  return Urql.useMutation<
    CreateMockExamHistoryMutation,
    CreateMockExamHistoryMutationVariables
  >(CreateMockExamHistoryDocument);
}
export const ReadMyExamHistoryDocument = gql`
  query ReadMyExamHistory {
    readMyExamHistory {
      error
      mockExams {
        id
        title
        updated_at
      }
    }
  }
`;

export function useReadMyExamHistoryQuery(
  options?: Omit<Urql.UseQueryArgs<ReadMyExamHistoryQueryVariables>, 'query'>
) {
  return Urql.useQuery<ReadMyExamHistoryQuery, ReadMyExamHistoryQueryVariables>(
    { query: ReadMyExamHistoryDocument, ...options }
  );
}
