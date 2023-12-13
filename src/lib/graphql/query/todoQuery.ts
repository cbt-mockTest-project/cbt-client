import { gql } from '@apollo/client';
import { FULL_TODO_FRAGMENT } from './todoFragment';

export const GET_TODO = gql`
  query GetTodo($input: GetTodoInput!) {
    getTodo(input: $input) {
      error
      ok
      todo {
        ...TodoParts
      }
    }
  }
  ${FULL_TODO_FRAGMENT}
`;

export const CREATE_OR_UPDATE_TODO = gql`
  mutation CreateOrUpdateTodo($input: CreateOrUpdateTodoInput!) {
    createOrUpdateTodo(input: $input) {
      ok
      error
      __typename
      todo {
        ...TodoParts
      }
    }
  }
  ${FULL_TODO_FRAGMENT}
`;
