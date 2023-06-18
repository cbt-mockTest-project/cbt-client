import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextArea from 'antd/lib/input/TextArea';
import { TodoList } from 'types';
import { useApollo } from '@modules/apollo';
import { useCreateOrUpdateTodo } from '@lib/graphql/user/hook/useTodo';
import { removeTypeNameFromObjectArray } from '@lib/utils/utils';
import { FULL_TODO_FRAGMENT } from '@lib/graphql/user/query/todoFragment';

const TodoItemBlock = styled.li`
  display: flex;
  flex-direction: column;
  + li {
    margin-top: 8px;
  }
  .todo-item-wrapper {
    background-color: ${palette.gray_100};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }
  .todo-item-content-wrapper {
    padding: 10px;

    display: flex;
    align-items: center;
  }
  .todo-item-checkbox-button {
    height: 24px;
    margin-right: 8px;
    svg {
      fill: ${palette.antd_blue_01};
    }
  }
  .todo-item-content {
    position: relative;
    word-break: break-all;
  }

  .todo-item-content.checked {
    color: ${palette.gray_500};
    text-decoration: line-through;
  }
  .todo-item-tool-box-wrapper {
    margin-top: 10px;
    border-top: 1px solid ${palette.gray_300};
    display: flex;
  }
  .todo-item-tool-box-button {
    flex: 1;
    padding: 5px 0;
    background-color: ${palette.antd_blue_01};
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    svg {
      fill: white;
    }
  }
  .todo-item-tool-box-button:not(:last-child) {
    border-right: 1px solid white;
  }
`;

interface TodoItemProps {
  handleUpAndDown: (currentIndex: number, afterIndex: number) => void;
  todoIndex: number;
  todoId: number;
  todoList: TodoList[];
  isDone: boolean;
  selectedDateString: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  handleUpAndDown,
  todoIndex,
  todoId,
  todoList,
  selectedDateString,
  isDone,
}) => {
  const [createOrUpdateTodo] = useCreateOrUpdateTodo();
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(todoList[todoIndex].todo);
  const client = useApollo({}, '');
  const handleCheckedState = async () => {
    const newTodoList = todoList.map((item, index) => {
      if (index === todoIndex) {
        return {
          ...item,
          isDone: !isDone,
        };
      }
      return item;
    });
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
      return;
    }
  };
  const handleEdit = async () => {
    const newTodoList = todoList.map((item, index) => {
      if (index === todoIndex) {
        return {
          ...item,
          todo: editContent,
        };
      }
      return item;
    });
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
      toggleEditMode();
      return;
    }
  };
  const handleDelete = async () => {
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      const newTodoList = todoList.filter((item, index) => index !== todoIndex);
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
      }
    }
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  return (
    <TodoItemBlock>
      <div className="todo-item-wrapper">
        <div className="todo-item-content-wrapper">
          <button
            className="todo-item-checkbox-button"
            onClick={handleCheckedState}
          >
            {isDone ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </button>
          {!editMode && (
            <div className={`todo-item-content ${isDone ? 'checked' : ''}`}>
              {todoList[todoIndex].todo}
            </div>
          )}
          {editMode && (
            <TextArea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          )}
        </div>
        <div className="todo-item-tool-box-wrapper">
          {!editMode && (
            <>
              <button
                className="todo-item-tool-box-button"
                onClick={toggleEditMode}
              >
                <EditIcon />
              </button>
              <button
                className="todo-item-tool-box-button"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </button>
              <button
                className="todo-item-tool-box-button"
                onClick={() => {
                  if (todoIndex === 0) return;
                  handleUpAndDown(todoIndex, todoIndex - 1);
                }}
              >
                <KeyboardArrowUpIcon />
              </button>
              <button
                className="todo-item-tool-box-button"
                onClick={() => {
                  if (todoIndex === todoList.length - 1) return;
                  handleUpAndDown(todoIndex, todoIndex + 1);
                }}
              >
                <KeyboardArrowDownIcon />
              </button>
            </>
          )}
          {editMode && (
            <>
              <button
                className="todo-item-tool-box-button"
                onClick={handleEdit}
              >
                수정하기
              </button>
              <button
                className="todo-item-tool-box-button"
                onClick={toggleEditMode}
              >
                취소하기
              </button>
            </>
          )}
        </div>
      </div>
    </TodoItemBlock>
  );
};

export default TodoItem;
