import Layout from '@components/common/layout/Layout';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import CommunityComponent from '@components/community/CommunityComponent';

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
