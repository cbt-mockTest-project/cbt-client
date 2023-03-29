import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import MemoComponent from '@components/me/memo/MemoComponent';
import React from 'react';
import styled from 'styled-components';

interface MemoPageProps {}

const MemoPage: React.FC<MemoPageProps> = () => {
  return (
    <>
      <WithHead title="메모 | 모두CBT" pageHeadingTitle="메모페이지" />
      <Layout subNav={true}>
        <MemoComponent />
      </Layout>
    </>
  );
};

export default MemoPage;

const MemoPageContainer = styled.div``;
