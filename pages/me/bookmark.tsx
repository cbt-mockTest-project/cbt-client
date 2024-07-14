import { NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import withAuth from '@lib/hocs/withAuth';
import MyBookmarkQuestionComponent from '@components/me/bookmark/MyBookmarkQuestionComponent';

interface MyBookmarkProps {}

const MyBookmark: NextPage<MyBookmarkProps> = () => {
  return (
    <>
      <WithHead
        title="기록 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 기록 페이지"
      />
      <MyBookmarkQuestionComponent />
    </>
  );
};

export default withAuth(MyBookmark);
