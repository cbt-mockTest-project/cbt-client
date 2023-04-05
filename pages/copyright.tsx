import Layout from '@components/common/layout/Layout';
import CopyRightComponent from '@components/copyright/CopyRightComponent';
import React from 'react';
import styled from 'styled-components';

interface CopyrightPageProps {}

const CopyrightPage: React.FC<CopyrightPageProps> = () => {
  return (
    <Layout>
      <CopyRightComponent />
    </Layout>
  );
};

export default CopyrightPage;
