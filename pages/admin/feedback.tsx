import AdminFeedbackComponent from '@components/admin/feedback/AdminFeedbackComponent';
import Layout from '@components/common/layout/Layout';
import React from 'react';
import styled from 'styled-components';

interface AdminFeedbackPageProps {}

const AdminFeedbackPage: React.FC<AdminFeedbackPageProps> = () => {
  return (
    <>
      <Layout>
        <AdminFeedbackComponent />
      </Layout>
    </>
  );
};

export default AdminFeedbackPage;

const AdminFeedbackPageContainer = styled.div``;
