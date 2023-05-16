import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import RefundPolicyComponent from '@components/refund/policy/RefundPolicyComponent';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const RefundPolicyPageBlock = styled.div``;

const RefundPolicyPage: NextPage = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 환불정책"
        pageHeadingTitle="모두CBT 환불정책페이지"
      />
      <Layout>
        <RefundPolicyComponent />
      </Layout>
    </>
  );
};

export default RefundPolicyPage;
