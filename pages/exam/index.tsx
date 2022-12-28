import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

interface ExamProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const Exam: NextPage<ExamProps> = ({ questionsQuery }) => {
  questionsQuery.readMockExamQuestionsByMockExamId.title;
  return (
    <>
      <WithHead
        title={`${questionsQuery.readMockExamQuestionsByMockExamId.title} | 실기CBT`}
        pageHeadingTitle={`${questionsQuery.readMockExamQuestionsByMockExamId.title} 문제풀이 페이지`}
      />
      <Layout mainBanner={true}>
        {questionsQuery && <ExamComponent questionsQuery={questionsQuery} />}
      </Layout>
    </>
  );
};

export default Exam;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const examId = context.query.e;
  const isRandom = context.query.r === 'true' ? true : false;
  const request = async () => {
    return await apolloClient.query<ReadMockExamQuestionsByMockExamIdQuery>({
      query: READ_QUESTIONS_BY_ID,
      variables: {
        input: {
          id: Number(String(examId)),
          isRandom,
        },
      },
      fetchPolicy: 'network-only',
    });
  };
  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const res = await tryRequest();
  const questionsQuery = res?.data;
  return addApolloState(apolloClient, { props: { questionsQuery } });
};
