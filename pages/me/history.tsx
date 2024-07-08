import { NextPage } from 'next';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import withAuth from '../../app/_lib/hocs/withAuth';
import HistoryComponent from '../../app/_components/me/history/HistoryComponent';

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
