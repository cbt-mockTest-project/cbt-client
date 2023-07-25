import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import DataRegisterComponent from '@components/data/register/DataRegisterComponent';
import React from 'react';
import styled from 'styled-components';

const DataRegisterPageBlock = styled.div``;

interface DataRegisterPageProps {}

const DataRegisterPage: React.FC<DataRegisterPageProps> = () => {
  return (
    <>
      <WithHead title="자료등록 | 모두CBT" pageHeadingTitle="자료등록페이지" />
      <Layout>
        <DataRegisterComponent />
      </Layout>
    </>
  );
};

export default DataRegisterPage;
