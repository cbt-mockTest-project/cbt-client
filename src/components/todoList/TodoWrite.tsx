import { CloseOutlined } from '@mui/icons-material';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import styled from 'styled-components';

const TodoWriteBlock = styled.form`
  width: 100%;
  .todo-write-title {
    font-weight: bold;
  }
  .todo-write-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: white;
    padding: 10px;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
  .todo-write-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

interface TodoWriteProps {
  onClose: () => void;
  onPost: (value: string) => void;
}

const TodoWrite: React.FC<TodoWriteProps> = ({ onClose, onPost }) => {
  const [value, setValue] = useState('');
  return (
    <TodoWriteBlock
      onSubmit={(e) => {
        e.preventDefault();
        onPost(value);
      }}
    >
      <div className="todo-write-inner">
        <div className="todo-write-title">오늘 할일</div>
        <TextArea value={value} onChange={(e) => setValue(e.target.value)} />
        <Button type="primary" htmlType="submit">
          작성하기
        </Button>
        <button className="todo-write-close-button" onClick={onClose}>
          <CloseOutlined />
        </button>
      </div>
    </TodoWriteBlock>
  );
};

export default TodoWrite;
