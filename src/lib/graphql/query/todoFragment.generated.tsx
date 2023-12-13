import * as Types from '../../../types';

import gql from 'graphql-tag';
export type TodoPartsFragment = {
  __typename?: 'Todo';
  dateString: string;
  id: number;
  todoList: Array<{ __typename: 'TodoList'; todo: string; isDone: boolean }>;
};

export const TodoPartsFragmentDoc = gql`
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
