import { TodoList, TodoListInputType } from 'types';
import { TodoItemProps } from '../TodoItem';
import { handleError } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import useTodoFragments from './useTodoFragments';

interface TodoItemHookProps extends Omit<TodoItemProps, 'handleUpAndDown'> {}

const useTodoItem = ({
  todoList,
  todoId,
  todoIndex,
  isDone,
  selectedDateString,
}: TodoItemHookProps) => {
  const client = useApollo({}, '');
  const { handleTodoFragments, createOrUpdateTodoLoading } = useTodoFragments({
    todoList,
    todoId,
    client,
    selectedDateString,
  });

  const handleCheckedState = async () => {
    try {
      const newTodoList = todoList.map((item, index) => {
        if (index === todoIndex) {
          return {
            ...item,
            isDone: !isDone,
          };
        }
        return item;
      });
      handleTodoFragments(newTodoList);
    } catch (e) {
      handleError(e);
    }
  };
  const handleEdit = async (todo: string, callback?: () => void) => {
    try {
      const newTodoList = todoList.map((item, index) => {
        if (index === todoIndex) {
          return {
            ...item,
            todo,
          };
        }
        return item;
      });
      handleTodoFragments(newTodoList, callback);
    } catch (e) {
      handleError(e);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        const newTodoList = todoList.filter(
          (item, index) => index !== todoIndex
        );
        handleTodoFragments(newTodoList);
      }
    } catch (e) {
      handleError(e);
    }
  };

  return {
    handleCheckedState,
    handleEdit,
    handleDelete,
    createOrUpdateTodoLoading,
  };
};

export default useTodoItem;
