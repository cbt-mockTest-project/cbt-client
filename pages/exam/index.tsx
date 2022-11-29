import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import React from 'react';

const Exam = () => {
  return (
    <Layout mainBanner={true}>
      <ExamComponent />
    </Layout>
  );
};

export default Exam;
