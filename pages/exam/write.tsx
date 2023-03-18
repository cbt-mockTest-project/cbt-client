import Layout from '@components/common/layout/Layout';
import CreateExamComponent from '@components/exam/write/CreateExamComponent';
import React from 'react';
import styled from 'styled-components';

interface CreateExamPageProps {}

const CreateExamPage: React.FC<CreateExamPageProps> = () => {
  return (
    <Layout>
      <CreateExamComponent />
    </Layout>
  );
};

export default CreateExamPage;
