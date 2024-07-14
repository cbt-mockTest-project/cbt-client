import BookmarkFolderSelect from '@components/common/bookmark/BookmarkFolderSelect';
import React from 'react';
import styled from 'styled-components';

const MyBookmarkQuestionComponentBlock = styled.div`
  padding: 20px;
`;

interface MyBookmarkQuestionComponentProps {}

const MyBookmarkQuestionComponent: React.FC<
  MyBookmarkQuestionComponentProps
> = () => {
  return (
    <MyBookmarkQuestionComponentBlock>
      <div className="text-lg font-bold mb-4">내 북마크 문제</div>
      <BookmarkFolderSelect
        size="large"
        onChange={(value) => {
          console.log(value);
        }}
      />
    </MyBookmarkQuestionComponentBlock>
  );
};

export default MyBookmarkQuestionComponent;
