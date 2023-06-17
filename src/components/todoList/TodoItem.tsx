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
  }

  .todo-item-content::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 1px;
    background: ${palette.antd_blue_01};
    transition: width 0.3s;
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
  defaultChecked: boolean;
  content: string;
  handleUpAndDown: (currentIndex: number, afterIndex: number) => void;
  index: number;
  arrayLength: number;
}

const TodoItem: React.FC<TodoItemProps> = ({
  defaultChecked,
  content,
  handleUpAndDown,
  index,
  arrayLength,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const handleCheckedState = () => {
    setChecked(!checked);
  };
  const handleEdit = () => {
    // 수정
    toggleEditMode();
  };
  const handleDelete = () => {
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      // 삭제
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
            {checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </button>
          {!editMode && (
            <div className={`todo-item-content ${checked ? 'checked' : ''}`}>
              {content}
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
                  if (index === 0) return;
                  handleUpAndDown(index, index - 1);
                }}
              >
                <KeyboardArrowUpIcon />
              </button>
              <button
                className="todo-item-tool-box-button"
                onClick={() => {
                  if (index === arrayLength - 1) return;
                  handleUpAndDown(index, index + 1);
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
