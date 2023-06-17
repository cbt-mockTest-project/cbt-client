import { responsive } from '@lib/utils/responsive';
import { Close } from '@mui/icons-material';
import { DatePicker, DatePickerProps } from 'antd';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { swapArray } from '@lib/utils/utils';
import TodoWriteToggleButton from './TodoWriteToggleButton';
import TodoWrite from './TodoWrite';

const TodoListBlock = styled(motion.div)`
  position: fixed;
  z-index: 9999;
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

const mockup = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit velit illo voluptatem maiores nihil unde soluta dicta commodi, corrupti quas cupiditate ea perspiciatis reprehenderit quo facere aspernatur? Dignissimos, voluptatum illo.',
    isChecked: false,
  },
  {
    id: 2,
    content: '테스트1',
    isChecked: false,
  },
  {
    id: 3,
    content: '테스트2',
    isChecked: false,
  },
  {
    id: 4,
    content: '테스트3',
    isChecked: false,
  },
  {
    id: 5,
    content: '테스트4',
    isChecked: false,
  },
];

const TodoList: React.FC<TodoListProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedDateString, setSelectedDateString] = useState('');
  const [isWriteMode, setIsWriteMode] = useState(false);
  const [todoList, setTodoList] = useState(mockup);
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      setSelectedDate(date);
      setSelectedDateString(dateString);
    }
  };

  const handleUpAndDown = (currentIndex: number, afterIndex: number) => {
    const reOrderedList = swapArray(todoList, currentIndex, afterIndex);
    setTodoList(reOrderedList);
  };

  const toggleWriteMode = () => {
    setIsWriteMode((prev) => !prev);
  };
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
        <ul className="todo-list-wrapper">
          {todoList.map((todo, index) => (
            <TodoItem
              index={index}
              arrayLength={mockup.length}
              key={todo.id}
              content={todo.content}
              defaultChecked={todo.isChecked}
              handleUpAndDown={handleUpAndDown}
            />
          ))}
        </ul>
        {!isWriteMode && (
          <div className="todo-list-write-toggle-button-wrapper">
            <TodoWriteToggleButton onClick={toggleWriteMode} />
          </div>
        )}
      </div>
      {isWriteMode && (
        <TodoWrite
          onClose={() => {
            setIsWriteMode(false);
          }}
          onPost={(value) => {
            console.log(value);
          }}
        />
      )}
    </TodoListBlock>
  );
};

export default TodoList;
