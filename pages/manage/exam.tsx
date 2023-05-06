import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ManageExamComponent from '@components/manage/exam/ManageExamComponent';
import { NextPage } from 'next';
import React from 'react';

const ExamPage: NextPage = () => {
  return (
    <>
      <WithHead title="관리 | 모두CBT" pageHeadingTitle="관리페이지" />
      <Layout subNav="manage">
        <ManageExamComponent />
      </Layout>
    </>
  );
};

export default ExamPage;
