import { gql } from '@apollo/client';

export const FULL_TODO_FRAGMENT = gql`
  fragment TodoParts on Todo {
    dateString
    id
    todoList {
      todo
      isDone
      __typename
    }
  }
`;
