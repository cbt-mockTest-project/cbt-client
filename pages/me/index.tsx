import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import MypageComponent from '@components/mypage/MypageComponent';
import { useFineMyExamHistory } from '@lib/graphql/user/hook/useExam';
import { NextPage } from 'next';
import React from 'react';

const Mypage: NextPage = () => {
  const { data: examHistoryQuery } = useFineMyExamHistory({ categoryIds: [] });
  return (
    <>
      <WithHead title="마이페이지 | 실기CBT" pageHeadingTitle="마이페이지" />
      <Layout subNav={true}>
        {examHistoryQuery && (
          <MypageComponent examHistoryQuery={examHistoryQuery} />
        )}
      </Layout>
    </>
  );
};

export default Mypage;
