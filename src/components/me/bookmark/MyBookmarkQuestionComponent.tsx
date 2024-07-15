import BookmarkFolderSelect from '@components/common/bookmark/BookmarkFolderSelect';
import useQuestions from '@lib/hooks/useQuestions';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookmarkedQuestionList from './BookmarkedQuestionList';
import BookmarkedExtraQuestionList from './BookmarkedExtraQuestionList';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { isUndefined } from 'lodash';

const MyBookmarkQuestionComponentBlock = styled.div`
  padding: 20px;
`;

interface MyBookmarkQuestionComponentProps {}

const MyBookmarkQuestionComponent: React.FC<
  MyBookmarkQuestionComponentProps
> = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { fetchBookmarkedQuestions } = useQuestions();
  const router = useRouter();
  const folderId = router.query.folderId as string;

  useEffect(() => {
    if (folderId !== undefined) {
      setIsFetching(true);
      fetchBookmarkedQuestions({ folderId: Number(folderId) || 0 }).finally(
        () => {
          setIsFetching(false);
        }
      );
    }
  }, [folderId]);

  return (
    <MyBookmarkQuestionComponentBlock>
      <div className="text-lg font-bold mb-4">내 북마크 문제</div>
      <div className="mb-3 flex justify-between gap-6">
        <BookmarkFolderSelect
          size="large"
          defaultValue={isUndefined(folderId) ? null : Number(folderId)}
          onChange={async (value) => {
            router.push({ query: { folderId: value } }, undefined, {
              shallow: true,
            });
          }}
        />
      </div>
      {isFetching ? (
        <Spin size="large" fullscreen />
      ) : (
        <>
          <BookmarkedQuestionList />
          <BookmarkedExtraQuestionList />
        </>
      )}
    </MyBookmarkQuestionComponentBlock>
  );
};

export default MyBookmarkQuestionComponent;
