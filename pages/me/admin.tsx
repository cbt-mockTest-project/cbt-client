import { NextPage } from 'next';
import React from 'react';
import WithHead from '../../app/_components/common/head/WithHead';
import withAuth from '../../app/_lib/hocs/withAuth';
import AdminComponent from '../../app/_components/me/admin/AdminComponent';

interface AdminPageProps {}

const AdminPage: NextPage<AdminPageProps> = () => {
  return (
    <>
      <WithHead
        title="관리자 페이지 | 모두CBT"
        pageHeadingTitle="모두CBT 서비스 마이 페이지"
      />
      <AdminComponent />
    </>
  );
};

export default withAuth(AdminPage);
