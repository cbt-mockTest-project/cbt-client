import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamHistorySkeleton from '@components/me/examhistory/ExamHistorySkeleton';
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
const MemoComponent = dynamic(
  () => import('@components/me/memo/MemoComponent'),
  { ssr: false, loading: () => <ExamHistorySkeleton /> }
);

interface MemoPageProps {}

const MemoPage: React.FC<MemoPageProps> = () => {
  return (
    <>
      <WithHead title="메모 | 모두CBT" pageHeadingTitle="메모페이지" />
      <Layout subNav="main">
        <MemoComponent />
      </Layout>
    </>
  );
};

export default MemoPage;

const MemoPageContainer = styled.div``;
