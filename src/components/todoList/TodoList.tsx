import { responsive } from '@lib/utils/responsive';
import { Close } from '@mui/icons-material';
import { DatePicker, DatePickerProps } from 'antd';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { swapArray } from '@lib/utils/utils';

const TodoListBlock = styled(motion.div)`
  width: 500px;
  height: 500px;
  background-color: white;
  position: fixed;
  z-index: 9999;
  left: 40px;
  bottom: 40px;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
    overflow-y: auto;
  }

  @media (max-width: ${responsive.medium}) {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    left: 0;
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
    </TodoListBlock>
  );
};

export default TodoList;
