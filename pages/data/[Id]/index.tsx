import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import DataDetailComponent from '@components/data/detail/DataDetailComponent';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const DataDetailPageBlock = styled.div``;

interface DataDetailPageProps {}

const DataDetailPage: NextPage<DataDetailPageProps> = () => {
  return (
    <>
      <WithHead title="자료실 | 모두CBT" pageHeadingTitle="자료실페이지" />
      <Layout>
        <DataDetailComponent />
      </Layout>
    </>
  );
};

export default DataDetailPage;
