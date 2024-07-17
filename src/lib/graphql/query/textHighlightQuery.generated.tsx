import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type InsertTextHighlightMutationVariables = Types.Exact<{
  input: Types.InsertTextHighlightInput;
}>;


export type InsertTextHighlightMutation = { __typename?: 'Mutation', insertTextHighlight: { __typename?: 'InsertTextHighlightOutput', error?: string | null, ok: boolean, textHighlight?: { __typename?: 'TextHighlight', id: string, data?: { __typename?: 'TextHighlightData', memo: string, endOffset: number, endContainer: Array<number>, startContainer: Array<number>, startOffset: number, text: string, type: string } | null } | null } };

export type DeleteTextHighlightMutationVariables = Types.Exact<{
  input: Types.DeleteTextHighlightInput;
}>;


export type DeleteTextHighlightMutation = { __typename?: 'Mutation', deleteTextHighlight: { __typename?: 'DeleteTextHighlightOutput', error?: string | null, ok: boolean } };

export type DeleteTextHighlightsMutationVariables = Types.Exact<{
  input: Types.DeleteTextHighlightsInput;
}>;


export type DeleteTextHighlightsMutation = { __typename?: 'Mutation', deleteTextHighlights: { __typename?: 'DeleteTextHighlightsOutput', error?: string | null, ok: boolean } };


export const InsertTextHighlightDocument = gql`
    mutation InsertTextHighlight($input: InsertTextHighlightInput!) {
  insertTextHighlight(input: $input) {
    error
    ok
    textHighlight {
      data {
        memo
        endOffset
        endContainer
        startContainer
        startOffset
        text
        type
      }
      id
    }
  }
}
    `;

export function useInsertTextHighlightMutation() {
  return Urql.useMutation<InsertTextHighlightMutation, InsertTextHighlightMutationVariables>(InsertTextHighlightDocument);
};
export const DeleteTextHighlightDocument = gql`
    mutation DeleteTextHighlight($input: DeleteTextHighlightInput!) {
  deleteTextHighlight(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteTextHighlightMutation() {
  return Urql.useMutation<DeleteTextHighlightMutation, DeleteTextHighlightMutationVariables>(DeleteTextHighlightDocument);
};
export const DeleteTextHighlightsDocument = gql`
    mutation DeleteTextHighlights($input: DeleteTextHighlightsInput!) {
  deleteTextHighlights(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteTextHighlightsMutation() {
  return Urql.useMutation<DeleteTextHighlightsMutation, DeleteTextHighlightsMutationVariables>(DeleteTextHighlightsDocument);
};