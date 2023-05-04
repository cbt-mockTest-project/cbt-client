import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ManageComponent from '@components/manage/ManageComponent';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const ManagePageBlock = styled.div``;

const ManagePage: NextPage = () => {
  return (
    <>
      <WithHead title="관리 | 모두CBT" pageHeadingTitle="관리페이지" />
      <Layout>
        <ManageComponent />
      </Layout>
    </>
  );
};

export default ManagePage;
