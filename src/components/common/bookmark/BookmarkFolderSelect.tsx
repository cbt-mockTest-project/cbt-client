import { Select, SelectProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

const BookmarkFolderSelectBlock = styled.div`
  width: 100%;
  .bookmark-folder-select {
    width: 100%;
  }
`;

interface BookmarkFolderSelectProps extends SelectProps {}

const BookmarkFolderSelect: React.FC<BookmarkFolderSelectProps> = (props) => {
  return (
    <BookmarkFolderSelectBlock>
      <Select
        className="bookmark-folder-select"
        options={[
          { label: '폴더1', value: 'folder1' },
          { label: '폴더2', value: 'folder2' },
          { label: '폴더3', value: 'folder3' },
        ]}
        {...props}
      />
    </BookmarkFolderSelectBlock>
  );
};

export default BookmarkFolderSelect;
