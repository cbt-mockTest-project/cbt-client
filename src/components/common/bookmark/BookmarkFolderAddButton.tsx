import { Button, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const BookmarkFolderAddButtonBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface BookmarkFolderAddButtonProps {}

const BookmarkFolderAddButton: React.FC<BookmarkFolderAddButtonProps> = () => {
  return (
    <BookmarkFolderAddButtonBlock>
      <Input placeholder="폴더 이름" />
      <Button type="primary">추가</Button>
    </BookmarkFolderAddButtonBlock>
  );
};

export default BookmarkFolderAddButton;
