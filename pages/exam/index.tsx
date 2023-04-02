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
  const router = useRouter();
  const title = router.query.t
    ? router.query.c + ' ' + router.query.t + ' | '
    : '';

  return (
    <>
      <WithHead
        title={`${title}모두CBT`}
        pageHeadingTitle={`${title} 문제풀이 페이지`}
      />
      <Layout>
        {
          <>
            <ExamComponent
              coAuthor={
                router.query.t === '계산문제 제외 모음집' ? 'Pooh' : undefined
              }
            />
            <GoogleAd type="display" />
          </>
        }
      </Layout>
    </>
  );
};

export default Exam;
