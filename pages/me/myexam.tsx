import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import MyExamComponent from '@components/me/myExam/MyExamComponent';
import React from 'react';
import styled from 'styled-components';

interface MyExamPageProps {}

const MyExamPage: React.FC<MyExamPageProps> = () => {
  return (
    <>
      <WithHead title="내시험지 | 모두CBT" pageHeadingTitle="내시험지페이지" />
      <Layout subNav={true}>
        <MyExamComponent />
      </Layout>
    </>
  );
};

export default MyExamPage;

const MyExamPageContainer = styled.div``;
