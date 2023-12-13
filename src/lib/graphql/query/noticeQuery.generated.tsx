import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditNoticeMutationVariables = Types.Exact<{
  input: Types.EditNoticeInput;
}>;

export type EditNoticeMutation = {
  __typename?: 'Mutation';
  editNotice: {
    __typename?: 'EditNoticeOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type DeleteNoticeMutationVariables = Types.Exact<{
  input: Types.DeleteNoticeInput;
}>;

export type DeleteNoticeMutation = {
  __typename?: 'Mutation';
  deleteNotice: {
    __typename?: 'DeleteNoticeOutput';
    error?: string | null;
    ok: boolean;
  };
};

export type DeleteAllNoticesOfMeMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type DeleteAllNoticesOfMeMutation = {
  __typename?: 'Mutation';
  deleteAllNoticesOfMe: {
    __typename?: 'CoreOutput';
    error?: string | null;
    ok: boolean;
  };
};

export const EditNoticeDocument = gql`
  mutation EditNotice($input: EditNoticeInput!) {
    editNotice(input: $input) {
      error
      ok
    }
  }
`;

export function useEditNoticeMutation() {
  return Urql.useMutation<EditNoticeMutation, EditNoticeMutationVariables>(
    EditNoticeDocument
  );
}
export const DeleteNoticeDocument = gql`
  mutation DeleteNotice($input: DeleteNoticeInput!) {
    deleteNotice(input: $input) {
      error
      ok
    }
  }
`;

export function useDeleteNoticeMutation() {
  return Urql.useMutation<DeleteNoticeMutation, DeleteNoticeMutationVariables>(
    DeleteNoticeDocument
  );
}
export const DeleteAllNoticesOfMeDocument = gql`
  mutation DeleteAllNoticesOfMe {
    deleteAllNoticesOfMe {
      error
      ok
    }
  }
`;

export function useDeleteAllNoticesOfMeMutation() {
  return Urql.useMutation<
    DeleteAllNoticesOfMeMutation,
    DeleteAllNoticesOfMeMutationVariables
  >(DeleteAllNoticesOfMeDocument);
}
