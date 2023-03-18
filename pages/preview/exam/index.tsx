import GoogleAd from '@components/common/ad/GoogleAd';
import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamSkeleton from '@components/exam/ExamSkeleton';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ExamComponent = dynamic(() => import('@components/exam/ExamComponent'), {
  ssr: false,
  loading: () => <ExamSkeleton />,
});

const Exam: NextPage = () => {
  return (
    <>
      <WithHead
        title={`시험모드 미리보기 | 모두CBT`}
        pageHeadingTitle={`시험모드 미리보기 페이지`}
      />
      <Layout>
        {
          <>
            <ExamComponent isPreview={true} />
            <GoogleAd type="display" />
          </>
        }
      </Layout>
    </>
  );
};

export default Exam;
