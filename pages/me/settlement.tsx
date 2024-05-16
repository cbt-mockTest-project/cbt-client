import { NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import withAuth from '@lib/hocs/withAuth';
import SettlementComponent from '@components/me/settlement/SettlementComponent';

interface SettlementPageProps {}

const SettlementPage: NextPage<SettlementPageProps> = () => {
  return (
    <>
      <WithHead
        title="포인트 출금 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 마이 페이지"
      />
      <SettlementComponent />
    </>
  );
};

export default withAuth(SettlementPage);
