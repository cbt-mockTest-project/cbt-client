import WithHead from '@components/common/head/WithHead';
import RefundPolicyComponent from '@components/refund/policy/RefundPolicyComponent';
import { NextPage } from 'next';
import React from 'react';

const RefundPolicyPage: NextPage = () => {
  return (
    <>
      <WithHead
        title="모두CBT | 환불정책"
        pageHeadingTitle="모두CBT 환불정책페이지"
      />
      <RefundPolicyComponent />
    </>
  );
};

export default RefundPolicyPage;
