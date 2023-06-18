import React, { useState } from 'react';
import styled from 'styled-components';
import TodoToggleButton from './TodoToggleButton';
import TodoList from './TodoList';
import { AnimatePresence } from 'framer-motion';

const TodoListComponentBlock = styled.div``;

interface TodoListComponentProps {}

const TodoListComponent: React.FC<TodoListComponentProps> = () => {
  const [isTodoListOpen, setIsTodoListOpen] = useState(false);
  const toggleTodoList = () => {
    setIsTodoListOpen(!isTodoListOpen);
  };
  return (
    <TodoListComponentBlock>
      <AnimatePresence>
        {isTodoListOpen && (
          <TodoList key="todo-list" onClose={toggleTodoList} />
        )}
        {!isTodoListOpen && (
          <TodoToggleButton key="todo-toggle-button" onClick={toggleTodoList} />
        )}
      </AnimatePresence>
    </TodoListComponentBlock>
  );
};

export default TodoListComponent;
