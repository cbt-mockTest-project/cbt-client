import Layout from '@components/common/layout/Layout';
import ExamResultComponent from '@components/exam/result/ExamResultComponent';
import React from 'react';

const result = () => {
  return (
    <Layout mainBanner={true} sideBanner={true}>
      <ExamResultComponent />
    </Layout>
  );
};

export default result;
