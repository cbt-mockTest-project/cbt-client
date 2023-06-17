import { gql } from '@apollo/client';

export const GET_TODO = gql`
  query GetTodo($input: GetTodoInput!) {
    getTodo(input: $input) {
      error
      ok
      todo {
        dateString
        id
        todoList {
          todo
        }
      }
    }
  }
`;

export const CREATE_OR_UPDATE_TODO = gql`
  mutation CreateOrUpdateTodo($input: CreateOrUpdateTodoInput!) {
    createOrUpdateTodo(input: $input) {
      ok
      error
    }
  }
`;
