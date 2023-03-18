import Layout from '@components/common/layout/Layout';
import QuestionEditComponent from '@components/question/edit/QuestionEditComponent';
import React from 'react';
import styled from 'styled-components';

interface QuestionEditPageProps {}

const QuestionEditPage: React.FC<QuestionEditPageProps> = () => {
  return (
    <Layout>
      <QuestionEditComponent />
    </Layout>
  );
};

export default QuestionEditPage;

const QuestionEditPageContainer = styled.div``;
