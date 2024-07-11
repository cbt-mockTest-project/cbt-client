import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const BookmarkFolderItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color('colorBorder')};
  button {
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  .bookmark-folder-item-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .bookmark-folder-item-actions {
    flex-shrink: 0;
  }
`;

interface BookmarkFolderItemProps {
  defaultTitle: string;
  onDelete: () => void;
  onEdit: (title: string) => void;
}

const BookmarkFolderItem: React.FC<BookmarkFolderItemProps> = ({
  defaultTitle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const onClickEditButton = () => {
    if (isEditing) {
      onEdit(title);
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
            key={title}
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          title
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
