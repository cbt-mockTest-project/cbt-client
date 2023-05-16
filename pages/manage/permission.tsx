import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import PermissionManageComponent from '@components/manage/permission/PermissionManageComponent';
import React from 'react';
import styled from 'styled-components';

const PermissionManagepageBlock = styled.div``;

interface PermissionManagepageProps {}

const PermissionManagepage: React.FC<PermissionManagepageProps> = () => {
  return (
    <>
      <WithHead title="관리 | 모두CBT" pageHeadingTitle="관리페이지" />
      <Layout subNav="manage">
        <PermissionManageComponent />
      </Layout>
    </>
  );
};

export default PermissionManagepage;
