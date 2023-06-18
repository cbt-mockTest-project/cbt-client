import { responsive } from '@lib/utils/responsive';
import { Close } from '@mui/icons-material';
import { DatePicker, DatePickerProps, Spin, message } from 'antd';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import TodoWriteToggleButton from './TodoWriteToggleButton';
import TodoWrite from './TodoWrite';
import shortid from 'shortid';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import useTodoList from './hook/useTodoList';

const TodoListBlock = styled(motion.div)`
  position: fixed;
  z-index: 999;
  left: 40px;
  bottom: 40px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  .todo-list-block-inner {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    padding: 20px 10px 10px 10px;
    width: 500px;
    height: 500px;
    background-color: white;
  }
  .todo-list-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .todo-list-header {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .todo-list-title {
    font-size: 16px;
    font-weight: bold;
  }
  .todo-list-wrapper {
    margin-top: 20px;
    height: calc(100vh - 52px);
    padding-bottom: 60px;
    overflow-y: auto;
  }
  .todo-list-write-toggle-button-wrapper {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .todo-list-loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    svg {
      font-size: 40px;
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: ${responsive.medium}) {
    bottom: 0;
    left: 0;
    .todo-list-block-inner {
      width: 100vw;
      height: 100vh;
    }
  }
`;

interface TodoListProps {
  onClose: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ onClose }) => {
  const { data: meQuery } = useMeQuery();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedDateString, setSelectedDateString] = useState(
    moment().format('YYYY-MM-DD')
  );
  const [isWriteMode, setIsWriteMode] = useState(false);

  const {
    handleMoveTodoList,
    handlePostTodo,
    todoList,
    todoId,
    getTodoLoading,
  } = useTodoList({
    selectedDateString,
  });

  const todoListRef = useRef<HTMLUListElement>(null);

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      setSelectedDate(date);
      setSelectedDateString(dateString);
    }
  };

  const toggleWriteMode = () => {
    if (!isWriteMode && !meQuery?.me.user) {
      return message.error('로그인 후 이용해주세요.');
    }
    setIsWriteMode((prev) => !prev);
  };

  useEffect(() => {
    if (isWriteMode) {
      todoListRef.current?.scrollTo({
        top: todoListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [isWriteMode]);

  return (
    <TodoListBlock
      initial={{ scale: 0, originX: 0, originY: 1 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        repeatDelay: 1,
      }}
    >
      <div className="todo-list-block-inner">
        <button className="todo-list-close-button" onClick={onClose}>
          <Close />
        </button>
        <div className="todo-list-header">
          <div className="todo-list-title">할 일 목록</div>
          <DatePicker value={selectedDate} onChange={onChangeDate} />
        </div>
        <ul className="todo-list-wrapper" ref={todoListRef}>
          {getTodoLoading && (
            <div className="todo-list-loading-wrapper">
              <Spin />
            </div>
          )}
          {todoList.map((todo, index) => (
            <TodoItem
              todoIndex={index}
              todoList={todoList}
              todoId={todoId}
              key={shortid.generate()}
              isDone={todo.isDone}
              handleUpAndDown={handleMoveTodoList}
              selectedDateString={selectedDateString}
            />
          ))}
        </ul>
        {!isWriteMode && (
          <div className="todo-list-write-toggle-button-wrapper">
            <TodoWriteToggleButton onClick={toggleWriteMode} />
          </div>
        )}
        {isWriteMode && (
          <TodoWrite
            onClose={() => {
              setIsWriteMode(false);
            }}
            onPost={handlePostTodo}
          />
        )}
      </div>
    </TodoListBlock>
  );
};

export default TodoList;
