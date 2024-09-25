import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateOrUpdateMockExamQuestionStateMutationVariables = Types.Exact<{
  input: Types.CreateOrUpdateMockExamQuestionStateInput;
}>;

export type CreateOrUpdateMockExamQuestionStateMutation = {
  __typename?: 'Mutation';
  createOrUpdateMockExamQuestionState: {
    __typename?: 'CreateOrUpdateMockExamQuestionStateOutput';
    error?: string | null;
    message?: string | null;
    currentState?: Types.QuestionState | null;
    ok: boolean;
  };
};

export type ResetMyExamQuestionStateMutationVariables = Types.Exact<{
  input: Types.ResetMyExamQuestionStateInput;
}>;

export type ResetMyExamQuestionStateMutation = {
  __typename?: 'Mutation';
  resetMyExamQuestionState: {
    __typename?: 'ResetMyExamQuestionStateOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type ReadMyExamQuestionStateQueryVariables = Types.Exact<{
  input: Types.ReadMyExamQuestionStateInput;
}>;

export type ReadMyExamQuestionStateQuery = {
  __typename?: 'Query';
  readMyExamQuestionState: {
    __typename?: 'ReadMyExamQuestionStateOutput';
    error?: string | null;
    ok: boolean;
    state: { __typename?: 'MockExamQuestionState'; state: Types.QuestionState };
  };
};

export type ReadExamTitleAndIdByQuestionStateQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ReadExamTitleAndIdByQuestionStateQuery = {
  __typename?: 'Query';
  readExamTitleAndIdByQuestionState: {
    __typename?: 'ReadExamTitleAndIdByQuestionStateOutput';
    error?: string | null;
    ok: boolean;
    titleAndId?: Array<{
      __typename?: 'TitleAndId';
      id?: number | null;
      title?: string | null;
    }> | null;
  };
};

export type RestMyAllQuestionStatesMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type RestMyAllQuestionStatesMutation = {
  __typename?: 'Mutation';
  restMyAllQuestionStates: {
    __typename?: 'CoreOutput';
    error?: string | null;
    ok: boolean;
  };
};

export const CreateOrUpdateMockExamQuestionStateDocument = gql`
  mutation CreateOrUpdateMockExamQuestionState(
    $input: CreateOrUpdateMockExamQuestionStateInput!
  ) {
    createOrUpdateMockExamQuestionState(input: $input) {
      error
      message
      currentState
      ok
    }
  }
`;

export function useCreateOrUpdateMockExamQuestionStateMutation() {
  return Urql.useMutation<
    CreateOrUpdateMockExamQuestionStateMutation,
    CreateOrUpdateMockExamQuestionStateMutationVariables
  >(CreateOrUpdateMockExamQuestionStateDocument);
}
export const ResetMyExamQuestionStateDocument = gql`
  mutation ResetMyExamQuestionState($input: ResetMyExamQuestionStateInput!) {
    resetMyExamQuestionState(input: $input) {
      error
      ok
    }
  }
`;

export function useResetMyExamQuestionStateMutation() {
  return Urql.useMutation<
    ResetMyExamQuestionStateMutation,
    ResetMyExamQuestionStateMutationVariables
  >(ResetMyExamQuestionStateDocument);
}
export const ReadMyExamQuestionStateDocument = gql`
  query ReadMyExamQuestionState($input: ReadMyExamQuestionStateInput!) {
    readMyExamQuestionState(input: $input) {
      error
      ok
      state {
        state
      }
    }
  }
`;

export function useReadMyExamQuestionStateQuery(
  options: Omit<
    Urql.UseQueryArgs<ReadMyExamQuestionStateQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    ReadMyExamQuestionStateQuery,
    ReadMyExamQuestionStateQueryVariables
  >({ query: ReadMyExamQuestionStateDocument, ...options });
}
export const ReadExamTitleAndIdByQuestionStateDocument = gql`
  query ReadExamTitleAndIdByQuestionState {
    readExamTitleAndIdByQuestionState {
      error
      ok
      titleAndId {
        id
        title
      }
    }
  }
`;

export function useReadExamTitleAndIdByQuestionStateQuery(
  options?: Omit<
    Urql.UseQueryArgs<ReadExamTitleAndIdByQuestionStateQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    ReadExamTitleAndIdByQuestionStateQuery,
    ReadExamTitleAndIdByQuestionStateQueryVariables
  >({ query: ReadExamTitleAndIdByQuestionStateDocument, ...options });
}
export const RestMyAllQuestionStatesDocument = gql`
  mutation RestMyAllQuestionStates {
    restMyAllQuestionStates {
      error
      ok
    }
  }
`;

export function useRestMyAllQuestionStatesMutation() {
  return Urql.useMutation<
    RestMyAllQuestionStatesMutation,
    RestMyAllQuestionStatesMutationVariables
  >(RestMyAllQuestionStatesDocument);
}
