import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useCreateOrUpdateTodo } from '@lib/graphql/user/hook/useTodo';
import { FULL_TODO_FRAGMENT } from '@lib/graphql/user/query/todoFragment';
import { removeTypeNameFromObjectArray } from '@lib/utils/utils';
import { message } from 'antd';
import { TodoListInputType } from 'types';

interface TodoFragmentsHookProps {
  todoList: TodoListInputType[];
  todoId: number;
  client: ApolloClient<NormalizedCacheObject>;
  selectedDateString: string;
}

const useTodoFragments = ({
  todoList,
  todoId,
  client,
  selectedDateString,
}: TodoFragmentsHookProps) => {
  const [createOrUpdateTodo, { loading: createOrUpdateTodoLoading }] =
    useCreateOrUpdateTodo();
  const handleTodoFragments = async (
    newTodoList: TodoListInputType[],
    callback?: () => void
  ) => {
    const res = await createOrUpdateTodo({
      variables: {
        input: {
          todoList: removeTypeNameFromObjectArray(newTodoList),
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
          todoList: newTodoList,
        },
      });
      callback && callback();
      return;
    }
    return message.error(res.data?.createOrUpdateTodo.error);
  };
  return {
    handleTodoFragments,
    createOrUpdateTodoLoading,
  };
};

export default useTodoFragments;
