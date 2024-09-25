import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MoveQuestionBookmarkMutationVariables = Types.Exact<{
  input: Types.MoveQuestionBookmarkInput;
}>;

export type MoveQuestionBookmarkMutation = {
  __typename?: 'Mutation';
  moveQuestionBookmark: {
    __typename?: 'moveQuestionBookmarkOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type CreateQuestionBookmarkMutationVariables = Types.Exact<{
  input: Types.CreateQuestionBookmarkInput;
}>;

export type CreateQuestionBookmarkMutation = {
  __typename?: 'Mutation';
  createQuestionBookmark: {
    __typename?: 'CreateQuestionBookmarkOutput';
    error?: string | null;
    ok: boolean;
    myBookmark?: {
      __typename?: 'MockExamQuestionBookmark';
      id: number;
      bookmarkFolder?: {
        __typename?: 'MockExamQuestionBookmarkFolder';
        id: number;
      } | null;
    } | null;
  };
};

export type DeleteQuestionBookmarkMutationVariables = Types.Exact<{
  input: Types.DeleteQuestionBookmarkInput;
}>;

export type DeleteQuestionBookmarkMutation = {
  __typename?: 'Mutation';
  deleteQuestionBookmark: {
    __typename?: 'DeleteQuestionBookmarkOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type ResetQuestionBookmarkMutationVariables = Types.Exact<{
  input: Types.ResetQuestionBookmarkInput;
}>;

export type ResetQuestionBookmarkMutation = {
  __typename?: 'Mutation';
  resetQuestionBookmark: {
    __typename?: 'ResetQuestionBookmarkOutput';
    error?: string | null;
    ok: boolean;
  };
};

export const MoveQuestionBookmarkDocument = gql`
  mutation MoveQuestionBookmark($input: MoveQuestionBookmarkInput!) {
    moveQuestionBookmark(input: $input) {
      error
      ok
    }
  }
`;

export function useMoveQuestionBookmarkMutation() {
  return Urql.useMutation<
    MoveQuestionBookmarkMutation,
    MoveQuestionBookmarkMutationVariables
  >(MoveQuestionBookmarkDocument);
}
export const CreateQuestionBookmarkDocument = gql`
  mutation CreateQuestionBookmark($input: CreateQuestionBookmarkInput!) {
    createQuestionBookmark(input: $input) {
      error
      ok
      myBookmark {
        id
        bookmarkFolder {
          id
        }
      }
    }
  }
`;

export function useCreateQuestionBookmarkMutation() {
  return Urql.useMutation<
    CreateQuestionBookmarkMutation,
    CreateQuestionBookmarkMutationVariables
  >(CreateQuestionBookmarkDocument);
}
export const DeleteQuestionBookmarkDocument = gql`
  mutation DeleteQuestionBookmark($input: DeleteQuestionBookmarkInput!) {
    deleteQuestionBookmark(input: $input) {
      error
      ok
    }
  }
`;

export function useDeleteQuestionBookmarkMutation() {
  return Urql.useMutation<
    DeleteQuestionBookmarkMutation,
    DeleteQuestionBookmarkMutationVariables
  >(DeleteQuestionBookmarkDocument);
}
export const ResetQuestionBookmarkDocument = gql`
  mutation ResetQuestionBookmark($input: ResetQuestionBookmarkInput!) {
    resetQuestionBookmark(input: $input) {
      error
      ok
    }
  }
`;

export function useResetQuestionBookmarkMutation() {
  return Urql.useMutation<
    ResetQuestionBookmarkMutation,
    ResetQuestionBookmarkMutationVariables
  >(ResetQuestionBookmarkDocument);
}
