import { useCreateQuestionBookmarkFolderMutation } from '@lib/mutation/questionBookmarkMutation';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const BookmarkFolderItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color('colorBorder')};
  button {
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  .bookmark-folder-item-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 10px 0px;
    width: 100%;
  }
  .bookmark-folder-item-actions {
    flex-shrink: 0;
  }
`;

interface BookmarkFolderItemProps {
  defaultName: string;
  onDelete: () => void;
  onEdit: (name: string) => void;
}

const BookmarkFolderItem: React.FC<BookmarkFolderItemProps> = ({
  defaultName,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(defaultName);
  const onClickEditButton = () => {
    if (isEditing) {
      onEdit(name);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
  return (
    <BookmarkFolderItemBlock>
      <div className="bookmark-folder-item-title">
        {isEditing ? (
          <Input
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          name
        )}
      </div>
      <div className="bookmark-folder-item-actions">
        <Button type="text" onClick={onClickEditButton}>
          수정
        </Button>
        <Button type="text" onClick={onDelete}>
          삭제
        </Button>
      </div>
    </BookmarkFolderItemBlock>
  );
};

export default BookmarkFolderItem;
