import { useCreateQuestionBookmarkFolderMutation } from '@lib/mutation/questionBookmarkMutation';
import { handleError } from '@lib/utils/utils';
import { Button, Input, App } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const BookmarkFolderAddButtonBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

interface BookmarkFolderAddButtonProps {}

const BookmarkFolderAddButton: React.FC<BookmarkFolderAddButtonProps> = () => {
  const [folderName, setFolderName] = useState('');
  const createBookmarkFolderMutation =
    useCreateQuestionBookmarkFolderMutation();
  const handleCreateBookmarkFolder = async () => {
    try {
      await createBookmarkFolderMutation.mutateAsync({
        name: folderName,
      });
      setFolderName('');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BookmarkFolderAddButtonBlock>
      <Input
        placeholder="폴더 이름"
        size="large"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <Button type="primary" size="large" onClick={handleCreateBookmarkFolder}>
        추가
      </Button>
    </BookmarkFolderAddButtonBlock>
  );
};

export default BookmarkFolderAddButton;
