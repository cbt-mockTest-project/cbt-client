import Layout from '@components/common/layout/Layout';
import React from 'react';
import CommunityContainer from '@components/community/CommunityContainer';
import WithHead from '@components/common/head/WithHead';

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
