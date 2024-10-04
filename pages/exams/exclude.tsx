import WithHead from '@components/common/head/WithHead';
import ExamExcludeComponent from '@components/examExclude/ExamExcludeComponent';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const ExamsExcludePage: NextPage = () => {
  return (
    <>
      <WithHead
        title={`제외된 문제 페이지 | 모두CBT`}
        pageHeadingTitle={'제외된 문제'}
      />
      <ExamExcludeComponent />
    </>
  );
};

export default ExamsExcludePage;
