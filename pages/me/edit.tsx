import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import WithHead from '@components/common/head/WithHead';
import EditComponentSkeleton from '@components/me/edit/EditComponentSkeleton';
import dynamic from 'next/dynamic';

const EditComponent = dynamic(
  () => import('@components/me/edit/EditComponent'),
  { ssr: false, loading: () => <EditComponentSkeleton /> }
);

const Edit: NextPage = () => {
  return (
    <>
      <WithHead title="회원정보 | 모두CBT" pageHeadingTitle="회원정보 페이지" />
      <Layout>
        <EditComponent />
      </Layout>
    </>
  );
};

export default Edit;
