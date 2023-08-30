import GoogleAd from '@components/common/ad/GoogleAd';
import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamSkeleton from '@components/exam/ExamSkeleton';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

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
      <StyledLayout subNav="main">
        {
          <>
            <ExamComponent />
            <GoogleAd type="display" />
          </>
        }
      </StyledLayout>
    </>
  );
};

export default Exam;

const StyledLayout = styled(Layout)`
  .layout-children-wrapper {
    margin-top: 20px;
  }
`;
