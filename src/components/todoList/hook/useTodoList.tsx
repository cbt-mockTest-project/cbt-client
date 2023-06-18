import {
  useCreateOrUpdateTodo,
  useGetTodo,
} from '@lib/graphql/user/hook/useTodo';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { FULL_TODO_FRAGMENT } from '@lib/graphql/user/query/todoFragment';
import { GET_TODO } from '@lib/graphql/user/query/todoQuery';
import { GetTodoQuery } from '@lib/graphql/user/query/todoQuery.generated';
import { removeTypeNameFromObjectArray, swapArray } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { useCallback, useEffect, useState } from 'react';

interface TodoListHookProps {
  selectedDateString: string;
}

const useTodoList = ({ selectedDateString }: TodoListHookProps) => {
  const [getTodo, { data: getTodoData }] = useGetTodo();
  const [createOrUpdateTodo] = useCreateOrUpdateTodo();
  const { data: meQuery } = useMeQuery();
  const client = useApollo({}, '');

  const todoList = getTodoData?.getTodo.todo?.todoList || [];
  const todoId = getTodoData?.getTodo.todo?.id || 0;

  const handleMoveTodoList = async (
    currentIndex: number,
    afterIndex: number
  ) => {
    const reOrderedList = swapArray(todoList, currentIndex, afterIndex);
    const res = await createOrUpdateTodo({
      variables: {
        input: {
          todoList: removeTypeNameFromObjectArray(reOrderedList),
          dateString: selectedDateString,
        },
      },
    });
    if (res.data?.createOrUpdateTodo.ok) {
      const currentTodo = client.readFragment({
        id: `Todo:${todoId}`,
        fragment: FULL_TODO_FRAGMENT,
      });
      client.writeFragment({
        id: `Todo:${todoId}`,
        fragment: FULL_TODO_FRAGMENT,
        data: {
          ...currentTodo,
          todoList: reOrderedList,
        },
      });
      return;
    }
  };

  const handlePostTodo = async (value: string) => {
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
    if (res.data?.createOrUpdateTodo.ok && res.data?.createOrUpdateTodo.todo) {
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
    }
  };

  const handleGetTodo = useCallback(async () => {
    await getTodo({
      variables: {
        input: {
          dateString: selectedDateString,
        },
      },
    });
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
  };
};

export default useTodoList;
