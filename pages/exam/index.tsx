import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { ME_QUERY } from '@lib/graphql/user/query/userQuery';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

interface ExamProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const Exam: NextPage<ExamProps> = ({ questionsQuery }) => {
  return (
    <Layout mainBanner={true}>
      {questionsQuery && <ExamComponent questionsQuery={questionsQuery} />}
    </Layout>
  );
};

export default Exam;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const examId = context.query.e;
  const request = async () => {
    await apolloClient.query({
      query: ME_QUERY,
    });
    return await apolloClient.query<ReadMockExamQuestionsByMockExamIdQuery>({
      query: READ_QUESTIONS_BY_ID,
      variables: {
        input: {
          id: Number(String(examId)),
        },
      },
    });
  };

  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const res = await tryRequest();
  const questionsQuery = res?.data;
  return addApolloState(apolloClient, { props: { questionsQuery } });
};
