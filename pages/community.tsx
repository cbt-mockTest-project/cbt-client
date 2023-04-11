import Layout from '@components/common/layout/Layout';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import dynamic from 'next/dynamic';
import CommunityViewSkeleton from '@components/community/CommunityViewSkeleton';

const CommunityContainer = dynamic(
  () => import('@components/community/CommunityContainer'),
  { ssr: false, loading: () => <CommunityViewSkeleton /> }
);

const Community = () => {
  return (
    <>
      <WithHead title="커뮤니티 | 모두CBT" pageHeadingTitle="커뮤니티페이지" />
      <Layout>
        <CommunityContainer />
      </Layout>
    </>
  );
};

export default Community;
