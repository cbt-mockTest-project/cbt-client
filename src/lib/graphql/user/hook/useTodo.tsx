import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_OR_UPDATE_TODO, GET_TODO } from '../query/todoQuery';
import {
  CreateOrUpdateTodoMutation,
  CreateOrUpdateTodoMutationVariables,
  GetTodoQuery,
  GetTodoQueryVariables,
} from '../query/todoQuery.generated';

export const useGetTodo = () =>
  useLazyQuery<GetTodoQuery, GetTodoQueryVariables>(GET_TODO);

export const useCreateOrUpdateTodo = () =>
  useMutation<CreateOrUpdateTodoMutation, CreateOrUpdateTodoMutationVariables>(
    CREATE_OR_UPDATE_TODO
  );
