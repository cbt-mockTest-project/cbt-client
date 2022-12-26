import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { ME_QUERY } from '@lib/graphql/user/query/userQuery';
import { MeQuery } from '@lib/graphql/user/query/userQuery.generated';
import EditComponent from '@components/me/edit/EditComponent';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import WithHead from '@components/common/head/WithHead';

interface EditPageProps {
  user: MeQuery['me']['user'];
}

const Edit: NextPage<EditPageProps> = ({ user }) => {
  return (
    <>
      <WithHead
        title="회원정보 변경 | 실기CBT"
        pageHeadingTitle="회원정보 변경 페이지"
      />
      <Layout>{user && <EditComponent user={user} />}</Layout>
    </>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const request = async () =>
    await apolloClient.query<MeQuery>({
      query: ME_QUERY,
    });
  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const res = await tryRequest();
  let user: MeQuery['me']['user'];
  if (res?.data.me) {
    user = res.data.me.user;
  }
  return addApolloState(apolloClient, { props: { user } });
};
