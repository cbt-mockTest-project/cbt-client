import { gql } from '@apollo/client';

export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      error
      ok
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($input: DeleteItemInput!) {
    deleteItem(input: $input) {
      error
      ok
    }
  }
`;

export const APPROVE_ITEM_MUTATION = gql`
  mutation ApproveItem($input: ApproveItemInput!) {
    approveItem(input: $input) {
      error
      ok
    }
  }
`;

export const REJECT_ITEM_MUTATION = gql`
  mutation RejectItem($input: RejectItemInput!) {
    rejectItem(input: $input) {
      error
      ok
    }
  }
`;

export const GET_ITEM_REVISION_QUERY = gql`
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

export const GET_ITEM_QUERY = gql`
  query GetItem($input: GetItemInput!) {
    getItem(input: $input) {
      created_at
      description
      urlSlug
      file {
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
`;

export const GET_ITEMS_QUERY = gql`
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
