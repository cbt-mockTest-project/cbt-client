import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import BookmarkedQuestionsComponent from '@components/me/bookmark/BookmarkedQuestionsComponent';
import MypageComponent from '@components/me/examhistory/ExamHistoryComponent';
import { useFineMyExamHistory } from '@lib/graphql/user/hook/useExam';
import { NextPage } from 'next';
import React from 'react';

const Mypage: NextPage = () => {
  const { data: examHistoryQuery } = useFineMyExamHistory({ categoryIds: [] });
  return (
    <>
      <WithHead title="마이페이지 | 모두CBT" pageHeadingTitle="마이페이지" />
      <Layout subNav={true}>
        <BookmarkedQuestionsComponent />
      </Layout>
    </>
  );
};

export default Mypage;
