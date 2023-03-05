import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
// import BookmarkedQuestionsComponent from '@components/me/bookmark/BookmarkedQuestionsComponent';
import BookmarkedQuestionsComponentSkeleton from '@components/me/bookmark/BookmarkedQuestionsComponentSkeleton';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const BookmarkedQuestionsComponent = dynamic(
  () => import('@components/me/bookmark/BookmarkedQuestionsComponent'),
  {
    ssr: false,
    loading: () => <BookmarkedQuestionsComponentSkeleton />,
  }
);

const Mypage: NextPage = () => {
  return (
    <>
      <WithHead
        title="북마크페이지 | 모두CBT"
        pageHeadingTitle="북마크페이지"
      />
      <Layout subNav={true}>
        <BookmarkedQuestionsComponent />
      </Layout>
    </>
  );
};

export default Mypage;
