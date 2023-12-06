import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamResultComponent from '@components/exam/result/ExamResultComponent';
import React from 'react';

const result = () => {
  return (
    <>
      <WithHead
        title={`문제 풀이 결과 | 모두CBT`}
        pageHeadingTitle={`문제 풀이 결과 페이지`}
      />
      <Layout mainBanner={true} sideBanner={true} subNav="main">
        <ExamResultComponent />
      </Layout>
    </>
  );
};

export default result;
