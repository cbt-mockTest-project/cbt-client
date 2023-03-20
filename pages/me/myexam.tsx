import Layout from '@components/common/layout/Layout';
import MyExamComponent from '@components/me/myExam/MyExamComponent';
import React from 'react';
import styled from 'styled-components';

interface MyExamPageProps {}

const MyExamPage: React.FC<MyExamPageProps> = () => {
  return (
    <Layout subNav={true}>
      <MyExamComponent />
    </Layout>
  );
};

export default MyExamPage;

const MyExamPageContainer = styled.div``;
