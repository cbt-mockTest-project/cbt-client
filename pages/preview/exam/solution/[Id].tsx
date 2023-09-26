import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';

import WithHead from '@components/common/head/WithHead';
import dynamic from 'next/dynamic';
import SolutionComponentSkeleton from '@components/solution/SolutionComponentSkeleton';
import GoogleAd from '@components/common/ad/GoogleAd';

const SolutionComponent = dynamic(
  () => import('@components/solution/SolutionComponent'),
  { loading: () => <SolutionComponentSkeleton /> }
);

const Solution: NextPage = () => {
  return (
    <>
      <WithHead
        title={`해설모드 미리보기 | 모두CBT`}
        pageHeadingTitle={`해설모드 미리보기 페이지`}
      />

      <Layout>
        <SolutionComponent isPreview={true} hasNewWindowButton={false} />
        <GoogleAd type="multiflex" />
      </Layout>
    </>
  );
};

export default Solution;
