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
  const [bookmarkFolderManageModalOpen, setBookmarkFolderManageModalOpen] =
    useState(false);
  return (
    <BookmarkFolderSelectBlock>
      <Select
        className="bookmark-folder-select"
        options={[
          { label: '분류 없음', value: 0 },
          { label: '폴더1', value: 1 },
          { label: '폴더2', value: 2 },
          { label: '폴더3', value: 3 },
        ]}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Button
              className="w-full"
              onClick={() => setBookmarkFolderManageModalOpen(true)}
            >
              폴더 관리
            </Button>
          </>
        )}
        {...props}
      />
      <BookmarkFolderManageModal
        open={bookmarkFolderManageModalOpen}
        onCancel={() => setBookmarkFolderManageModalOpen(false)}
      />
    </BookmarkFolderSelectBlock>
  );
};

export default BookmarkFolderSelect;
