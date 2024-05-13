import { NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import withAuth from '@lib/hocs/withAuth';

interface SettlementPageProps {}

const SettlementPage: NextPage<SettlementPageProps> = () => {
  return (
    <>
      <WithHead
        title="정산 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 마이 페이지"
      />
    </>
  );
};

export default withAuth(SettlementPage);
