import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamHistorySkeleton from '@components/me/examhistory/ExamHistorySkeleton';
// import ExamHistoryComponent from '@components/me/examhistory/ExamHistoryComponent';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const ExamHistoryComponent = dynamic(
  () => import('@components/me/examhistory/ExamHistoryComponent'),
  { ssr: false, loading: () => <ExamHistorySkeleton /> }
);

const Mypage: NextPage = () => {
  return (
    <>
      <WithHead title="시험기록 | 모두CBT" pageHeadingTitle="시험기록페이지" />
      <Layout subNav={true}>
        <ExamHistoryComponent />
      </Layout>
    </>
  );
};

export default Mypage;
