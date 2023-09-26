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

const RandomSolutionPage: NextPage = () => {
  return (
    <>
      <WithHead
        title={`랜덤 해설모드| 모두CBT`}
        pageHeadingTitle={`랜덤 해설모드 페이지`}
      />

      <Layout>
        <SolutionComponent
          hasNewWindowButton={false}
          isRandomMode={true}
          hasSearchInput={true}
        />
        <GoogleAd type="multiflex" />
      </Layout>
    </>
  );
};

export default RandomSolutionPage;
