import Layout from '@components/common/layout/Layout';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import dynamic from 'next/dynamic';
import CommunityComponentSkeleton from '@components/community/CommunityComponentSkeleton';

const CommunityComponent = dynamic(
  () => import('@components/community/CommunityComponent'),
  { ssr: false, loading: () => <CommunityComponentSkeleton /> }
);

const Community = () => {
  return (
    <>
      <WithHead title="커뮤니티 | 모두CBT" pageHeadingTitle="커뮤니티페이지" />
      <Layout>
        <CommunityComponent />
      </Layout>
    </>
  );
};

export default Community;
