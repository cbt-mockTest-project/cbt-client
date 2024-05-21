import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateItemMutationVariables = Types.Exact<{
  input: Types.CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'CreateItemOutput', error?: string | null, ok: boolean } };

export type UpdateItemMutationVariables = Types.Exact<{
  input: Types.UpdateItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'UpdateItemOutput', error?: string | null, ok: boolean } };

export type DeleteItemMutationVariables = Types.Exact<{
  input: Types.DeleteItemInput;
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: { __typename?: 'DeleteItemOutput', error?: string | null, ok: boolean } };

export type ApproveItemMutationVariables = Types.Exact<{
  input: Types.ApproveItemInput;
}>;


export type ApproveItemMutation = { __typename?: 'Mutation', approveItem: { __typename?: 'ApproveItemOutput', error?: string | null, ok: boolean } };

export type RejectItemMutationVariables = Types.Exact<{
  input: Types.RejectItemInput;
}>;


export type RejectItemMutation = { __typename?: 'Mutation', rejectItem: { __typename?: 'RejectItemOutput', error?: string | null, ok: boolean } };

export type GetItemRevisionQueryVariables = Types.Exact<{
  input: Types.GetItemRevisionInput;
}>;


export type GetItemRevisionQuery = { __typename?: 'Query', getItemRevision: { __typename?: 'GetItemRevisionOutput', ok: boolean, error?: string | null, itemRevision?: { __typename?: 'ItemRevision', id: number, created_at: any, description: string, urlSlug: string, price: number, state: Types.ItemRevisionStateEnum, thumbnail?: string | null, title: string, updated_at: any, contents: string, file?: { __typename?: 'ItemFileType', page?: number | null, previewImagesCount?: number | null, previewImages?: Array<string> | null, size: number, name: string, type: string, uid: string } | null, item: { __typename?: 'Item', id: number }, user: { __typename?: 'User', id: number }, category?: { __typename?: 'MockExamCategory', id: number } | null } | null } };

export type GetItemQueryVariables = Types.Exact<{
  input: Types.GetItemInput;
}>;


export type GetItemQuery = { __typename?: 'Query', getItem: { __typename?: 'GetItemOutput', ok: boolean, error?: string | null, item?: { __typename?: 'Item', created_at: any, description: string, contents: string, urlSlug: string, id: number, price: number, state: Types.ItemStateEnum, thumbnail?: string | null, title: string, updated_at: any, file?: { __typename?: 'ItemFileType', page?: number | null, previewImagesCount?: number | null, previewImages?: Array<string> | null, name: string, type: string, size: number, uid: string } | null, user: { __typename?: 'User', email: string, id: number, nickname: string }, category?: { __typename?: 'MockExamCategory', id: number, name: string } | null } | null } };

export type GetItemsQueryVariables = Types.Exact<{
  input: Types.GetItemsInput;
}>;


export type GetItemsQuery = { __typename?: 'Query', getItems: { __typename?: 'GetItemsOutput', error?: string | null, ok: boolean, totalCount?: number | null, items?: Array<{ __typename?: 'Item', urlSlug: string, id: number, description: string, price: number, thumbnail?: string | null, title: string, created_at: any, updated_at: any, user: { __typename?: 'User', id: number, nickname: string } }> | null } };

export type GetApprovedItemIdsAndsSlugsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetApprovedItemIdsAndsSlugsQuery = { __typename?: 'Query', getApprovedItemIdsAndsSlugs: { __typename?: 'GetApprovedItemIdsAndsSlugsOutput', error?: string | null, ids?: Array<number> | null, ok: boolean, slugs?: Array<string> | null } };


export const CreateItemDocument = gql`
    mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
    error
    ok
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const UpdateItemDocument = gql`
    mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input) {
    error
    ok
  }
}
    `;

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument);
};
export const DeleteItemDocument = gql`
    mutation DeleteItem($input: DeleteItemInput!) {
  deleteItem(input: $input) {
    error
    ok
  }
}
    `;

export function useDeleteItemMutation() {
  return Urql.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument);
};
export const ApproveItemDocument = gql`
    mutation ApproveItem($input: ApproveItemInput!) {
  approveItem(input: $input) {
    error
    ok
  }
}
    `;

export function useApproveItemMutation() {
  return Urql.useMutation<ApproveItemMutation, ApproveItemMutationVariables>(ApproveItemDocument);
};
export const RejectItemDocument = gql`
    mutation RejectItem($input: RejectItemInput!) {
  rejectItem(input: $input) {
    error
    ok
  }
}
    `;

export function useRejectItemMutation() {
  return Urql.useMutation<RejectItemMutation, RejectItemMutationVariables>(RejectItemDocument);
};
export const GetItemRevisionDocument = gql`
    query GetItemRevision($input: GetItemRevisionInput!) {
  getItemRevision(input: $input) {
    ok
    error
    itemRevision {
      id
      created_at
      description
      urlSlug
      file {
        page
        previewImagesCount
        previewImages
        size
        name
        type
        uid
      }
      id
      item {
        id
      }
      price
      state
      thumbnail
      title
      updated_at
      user {
        id
      }
      category {
        id
      }
      contents
    }
  }
}
    `;

export function useGetItemRevisionQuery(options: Omit<Urql.UseQueryArgs<GetItemRevisionQueryVariables>, 'query'>) {
  return Urql.useQuery<GetItemRevisionQuery, GetItemRevisionQueryVariables>({ query: GetItemRevisionDocument, ...options });
};
export const GetItemDocument = gql`
    query GetItem($input: GetItemInput!) {
  getItem(input: $input) {
    ok
    error
    item {
      created_at
      description
      contents
      urlSlug
      file {
        page
        previewImagesCount
        previewImages
        name
        type
        size
        uid
      }
      id
      price
      state
      thumbnail
      title
      updated_at
      user {
        email
        id
        nickname
      }
      category {
        id
        name
      }
    }
  }
}
    `;

export function useGetItemQuery(options: Omit<Urql.UseQueryArgs<GetItemQueryVariables>, 'query'>) {
  return Urql.useQuery<GetItemQuery, GetItemQueryVariables>({ query: GetItemDocument, ...options });
};
export const GetItemsDocument = gql`
    query GetItems($input: GetItemsInput!) {
  getItems(input: $input) {
    error
    ok
    totalCount
    items {
      urlSlug
      id
      description
      price
      thumbnail
      title
      created_at
      updated_at
      user {
        id
        nickname
      }
    }
  }
}
    `;

export function useGetItemsQuery(options: Omit<Urql.UseQueryArgs<GetItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetItemsQuery, GetItemsQueryVariables>({ query: GetItemsDocument, ...options });
};
export const GetApprovedItemIdsAndsSlugsDocument = gql`
    query GetApprovedItemIdsAndsSlugs {
  getApprovedItemIdsAndsSlugs {
    error
    ids
    ok
    slugs
  }
}
    `;

export function useGetApprovedItemIdsAndsSlugsQuery(options?: Omit<Urql.UseQueryArgs<GetApprovedItemIdsAndsSlugsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetApprovedItemIdsAndsSlugsQuery, GetApprovedItemIdsAndsSlugsQueryVariables>({ query: GetApprovedItemIdsAndsSlugsDocument, ...options });
};