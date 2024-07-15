import { ClearOutlined } from '@ant-design/icons';
import BookmarkFolderSelect from '@components/common/bookmark/BookmarkFolderSelect';
import Portal from '@components/common/portal/Portal';
import useQuestions from '@lib/hooks/useQuestions';
import { App, Button, Spin } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import BookmarkedQuestionList from './BookmarkedQuestionList';

const MyBookmarkQuestionComponentBlock = styled.div`
  padding: 20px;
`;

interface MyBookmarkQuestionComponentProps {}

const MyBookmarkQuestionComponent: React.FC<
  MyBookmarkQuestionComponentProps
> = () => {
  const { modal } = App.useApp();
  const [isFetching, setIsFetching] = useState(false);
  const { fetchBookmarkedQuestions } = useQuestions();
  const [folderId, setFolderId] = useState<number | null>(null);
  const handleClearBookmark = () => {
    modal.confirm({
      title: '북마크 초기화',
      content: '북마크를 초기화하시겠습니까?',
      okText: '초기화',
      cancelText: '취소',
      onOk: () => {
        console.log('clear bookmark');
      },
    });
  };

  return (
    <MyBookmarkQuestionComponentBlock>
      <div className="text-lg font-bold mb-4">내 북마크 문제</div>
      <div className="max-w-xl mb-3">
        <BookmarkFolderSelect
          size="large"
          onChange={async (value) => {
            setFolderId(value);
            setIsFetching(true);
            await fetchBookmarkedQuestions({ folderId: value });
            setIsFetching(false);
          }}
        />
      </div>
      {typeof folderId === 'number' && (
        <div className="w-full mb-3 flex justify-end">
          <Button
            type="dashed"
            icon={<ClearOutlined />}
            onClick={handleClearBookmark}
          >
            북마크 초기화
          </Button>
        </div>
      )}
      <BookmarkedQuestionList isLoading={isFetching} />
    </MyBookmarkQuestionComponentBlock>
  );
};

export default MyBookmarkQuestionComponent;
