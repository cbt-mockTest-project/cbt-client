import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';

import WithHead from '@components/common/head/WithHead';
import GoogleAd from '@components/common/ad/GoogleAd';
import QuestionComponent from '@components/question/QuestionComponent';

const Question: NextPage = () => {
  return (
    <>
      <WithHead
        title={`문제 미리보기 | 모두CBT`}
        pageHeadingTitle={`문제 미리보기 페이지`}
      />
      <Layout>
        <QuestionComponent isPreview={true} />
      </Layout>
    </>
  );
};

export default Question;
