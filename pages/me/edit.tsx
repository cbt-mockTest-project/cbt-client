import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import EditComponent from '@components/me/edit/EditComponent';
import WithHead from '@components/common/head/WithHead';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';

const Edit: NextPage = () => {
  const { data: meQuery } = useMeQuery();
  if (!meQuery?.me.user) return null;
  return (
    <>
      <WithHead title="회원정보 | 모두CBT" pageHeadingTitle="회원정보 페이지" />
      <Layout>
        <EditComponent user={meQuery.me.user} />
      </Layout>
    </>
  );
};

export default Edit;
