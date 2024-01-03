import { NextPage } from 'next';
import React from 'react';
import WithHead from '@components/common/head/WithHead';
import withAuth from '@lib/hocs/withAuth';
import HistoryComponent from '@components/me/history/HistoryComponent';

interface MyHistoryProps {}

const MyHistory: NextPage<MyHistoryProps> = () => {
  return (
    <>
      <WithHead
        title="기록 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 기록 페이지"
      />
      <HistoryComponent />
    </>
  );
};

export default withAuth(MyHistory);
