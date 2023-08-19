import FindPasswordForm from '@components/common/form/FindPasswordForm';
import Layout from '@components/common/layout/Layout';
import React from 'react';
import styled from 'styled-components';

interface FindpwProps {}

const Findpw: React.FC<FindpwProps> = () => {
  return (
    <Layout>
      <FindpwContainer>
        <FindPasswordForm />
      </FindpwContainer>
    </Layout>
  );
};

export default Findpw;

const FindpwContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
