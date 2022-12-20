import Layout from '@components/common/layout/Layout';
import MypageComponent from '@components/mypage/MypageComponent';
import {
  FIND_MY_EXAM_HISTORY_QUERY,
  READ_EXAM_CATEGORIES_QUERY,
} from '@lib/graphql/user/query/examQuery';
import { FindMyExamHistoryQuery } from '@lib/graphql/user/query/examQuery.generated';
import { ME_QUERY } from '@lib/graphql/user/query/userQuery';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

interface MypageProps {
  examHistoryQuery: FindMyExamHistoryQuery;
}

const Mypage: NextPage<MypageProps> = ({ examHistoryQuery }) => {
  return (
    <Layout subNav={true}>
      <MypageComponent examHistoryQuery={examHistoryQuery} />
    </Layout>
  );
};

export default Mypage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const request = async () => {
    await apolloClient.query({
      query: READ_EXAM_CATEGORIES_QUERY,
    });
    await apolloClient.query({
      query: ME_QUERY,
    });
    return await apolloClient.query<FindMyExamHistoryQuery>({
      query: FIND_MY_EXAM_HISTORY_QUERY,
    });
  };
  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const result = await tryRequest();
  const examHistoryQuery = result?.data;
  return addApolloState(apolloClient, { props: { examHistoryQuery } });
};
