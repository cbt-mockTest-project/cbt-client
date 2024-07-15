import { readQuestionBookmarkFolderQueryOption } from '@lib/queryOptions/readQusetionBookmarkFolderQueryOption';
import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Select, SelectProps } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import BookmarkFolderManageModal from './BookmarkFolderManageModal';

const BookmarkFolderSelectBlock = styled.div`
  width: 100%;
  .bookmark-folder-select {
    width: 100%;
  }
`;

interface BookmarkFolderSelectProps extends SelectProps {}

const BookmarkFolderSelect: React.FC<BookmarkFolderSelectProps> = (props) => {
  const { data } = useQuery(readQuestionBookmarkFolderQueryOption);
  const [bookmarkFolderManageModalOpen, setBookmarkFolderManageModalOpen] =
    useState(false);
  const options = [
    { label: '분류 없음', value: 0 },
    ...(data?.readQuestionBookmarkFolders.folders.map((folder) => ({
      label: folder.name,
      value: folder.id,
    })) || []),
  ];
  return (
    <BookmarkFolderSelectBlock>
      <Select
        placeholder="폴더 선택"
        className="bookmark-folder-select"
        options={options}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Button
              size="large"
              className="w-full"
              onClick={() => setBookmarkFolderManageModalOpen(true)}
            >
              폴더 관리
            </Button>
          </>
        )}
        {...props}
        defaultValue={
          options.find((option) => option.value === props.defaultValue)?.value
        }
      />
      <BookmarkFolderManageModal
        open={bookmarkFolderManageModalOpen}
        onCancel={() => setBookmarkFolderManageModalOpen(false)}
      />
    </BookmarkFolderSelectBlock>
  );
};

export default BookmarkFolderSelect;
