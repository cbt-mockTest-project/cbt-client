import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import BookmarkedQuestionsComponent from '@components/me/bookmark/BookmarkedQuestionsComponent';
import BookmarkedQuestionsComponentSkeleton from '@components/me/bookmark/BookmarkedQuestionsComponentSkeleton';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const Mypage: NextPage = () => {
  return (
    <>
      <WithHead title="저장된문제 | 모두CBT" pageHeadingTitle="저장페이지" />
      <Layout subNav="main">
        <BookmarkedQuestionsComponent />
      </Layout>
    </>
  );
};

export default Mypage;
