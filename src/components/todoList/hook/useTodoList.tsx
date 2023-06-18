import {
  useCreateOrUpdateTodo,
  useGetTodo,
} from '@lib/graphql/user/hook/useTodo';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { GET_TODO } from '@lib/graphql/user/query/todoQuery';
import { GetTodoQuery } from '@lib/graphql/user/query/todoQuery.generated';
import {
  handleError,
  removeTypeNameFromObjectArray,
  swapArray,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { useCallback, useEffect, useState } from 'react';
import useTodoFragments from './useTodoFragments';
import { message } from 'antd';

interface TodoListHookProps {
  selectedDateString: string;
}

const useTodoList = ({ selectedDateString }: TodoListHookProps) => {
  const [getTodo, { data: getTodoData, loading: getTodoLoading }] =
    useGetTodo();
  const [createOrUpdateTodo, { loading: createOrUpdateTodoLoading }] =
    useCreateOrUpdateTodo();
  const { data: meQuery } = useMeQuery();
  const client = useApollo({}, '');

  const todoList = getTodoData?.getTodo.todo?.todoList || [];
  const todoId = getTodoData?.getTodo.todo?.id || 0;

  const { handleTodoFragments } = useTodoFragments({
    todoList,
    todoId,
    client,
    selectedDateString,
  });

  const handleMoveTodoList = async (
    currentIndex: number,
    afterIndex: number
  ) => {
    try {
      const newTodoList = swapArray(todoList, currentIndex, afterIndex);
      handleTodoFragments(newTodoList);
    } catch (e) {
      handleError(e);
    }
  };

  const handlePostTodo = async (value: string) => {
    try {
      const newTodoList = [
        ...removeTypeNameFromObjectArray(todoList),
        { todo: value, isDone: false },
      ];
      const res = await createOrUpdateTodo({
        variables: {
          input: {
            todoList: newTodoList,
            dateString: selectedDateString,
          },
        },
      });
      if (
        res.data?.createOrUpdateTodo.ok &&
        res.data?.createOrUpdateTodo.todo
      ) {
        client.writeQuery<GetTodoQuery>({
          query: GET_TODO,
          variables: {
            input: {
              dateString: selectedDateString,
            },
          },
          data: {
            getTodo: {
              ok: true,
              error: null,
              todo: res.data.createOrUpdateTodo.todo,
            },
          },
        });
        return;
      }
      return message.error(res.data?.createOrUpdateTodo.error);
    } catch (e) {
      handleError(e);
    }
  };

  const handleGetTodo = useCallback(async () => {
    try {
      const res = await getTodo({
        variables: {
          input: {
            dateString: selectedDateString,
          },
        },
      });
      if (res.data?.getTodo.error) {
        return message.error(res.data?.getTodo.error);
      }
    } catch (e) {
      handleError(e);
    }
  }, [getTodo, selectedDateString]);

  useEffect(() => {
    if (!meQuery?.me.user) return;
    handleGetTodo();
  }, [handleGetTodo, meQuery?.me.user, selectedDateString]);

  return {
    handleMoveTodoList,
    handlePostTodo,
    todoList,
    todoId,
    getTodoLoading,
    createOrUpdateTodoLoading,
  };
};

export default useTodoList;
