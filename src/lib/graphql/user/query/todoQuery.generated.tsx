import * as Types from '../../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetTodoQueryVariables = Types.Exact<{
  input: Types.GetTodoInput;
}>;


export type GetTodoQuery = { __typename?: 'Query', getTodo: { __typename?: 'GetTodoOutput', error?: string | null, ok: boolean, todo?: { __typename?: 'Todo', dateString: string, id: number, todoList: Array<{ __typename?: 'TodoList', todo: string }> } | null } };

export type CreateOrUpdateTodoMutationVariables = Types.Exact<{
  input: Types.CreateOrUpdateTodoInput;
}>;


export type CreateOrUpdateTodoMutation = { __typename?: 'Mutation', createOrUpdateTodo: { __typename?: 'CreateOrUpdateTodoOutput', ok: boolean, error?: string | null } };


export const GetTodoDocument = gql`
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

export function useGetTodoQuery(options: Omit<Urql.UseQueryArgs<GetTodoQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTodoQuery, GetTodoQueryVariables>({ query: GetTodoDocument, ...options });
};
export const CreateOrUpdateTodoDocument = gql`
    mutation CreateOrUpdateTodo($input: CreateOrUpdateTodoInput!) {
  createOrUpdateTodo(input: $input) {
    ok
    error
  }
}
    `;

export function useCreateOrUpdateTodoMutation() {
  return Urql.useMutation<CreateOrUpdateTodoMutation, CreateOrUpdateTodoMutationVariables>(CreateOrUpdateTodoDocument);
};