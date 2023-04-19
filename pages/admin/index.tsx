import AdminComponent from '@components/admin/AdminComponent';
import Layout from '@components/common/layout/Layout';
import React from 'react';
import styled from 'styled-components';

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  return (
    <>
      <Layout>
        <AdminComponent />
      </Layout>
    </>
  );
};

export default AdminPage;

const AdminPageContainer = styled.div``;
