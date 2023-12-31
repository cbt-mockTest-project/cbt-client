import { NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import MyAllExamsComponent from '@components/me/allExams/AllExamsComponent';
import withAuth from '@lib/hocs/withAuth';

interface MyAllExamsProps {}

const MyAllExams: NextPage<MyAllExamsProps> = () => {
  return (
    <>
      <WithHead
        title="마이 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 마이 페이지"
      />
      <MyAllExamsComponent />
    </>
  );
};

export default withAuth(MyAllExams);
