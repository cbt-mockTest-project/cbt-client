import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import DataComponent from '@components/data/DataComponent';
import { NextPage } from 'next';
import React from 'react';

interface DataPageProps {}

const DataPage: NextPage<DataPageProps> = () => {
  return (
    <>
      <WithHead title="자료실 | 모두CBT" pageHeadingTitle="자료실페이지" />
      <DataComponent />
    </>
  );
};

export default DataPage;
