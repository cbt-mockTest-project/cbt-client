import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo, useApollo } from '@modules/apollo';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';

interface ExamProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const Exam: NextPage<ExamProps> = ({ questionsQuery }) => {
  return (
    <>
      <WithHead
        title={`${questionsQuery.readMockExamQuestionsByMockExamId.title} | 실기CBT`}
        pageHeadingTitle={`${questionsQuery.readMockExamQuestionsByMockExamId.title} 문제풀이 페이지`}
      />
      <Layout mainBanner={true}>
        <ExamComponent questionsQuery={questionsQuery} />
      </Layout>
    </>
  );
};

export default Exam;

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=86400'
  );
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const examId = context.query.e;
  const isRandom = context.query.r === 'true' ? true : false;
  const questionsQueryInput: ReadMockExamQuestionsByMockExamIdInput = {
    id: Number(String(examId)),
    isRandom,
  };
  const request = async () => {
    return await apolloClient.query<ReadMockExamQuestionsByMockExamIdQuery>({
      query: READ_QUESTIONS_BY_ID,
      variables: {
        input: questionsQueryInput,
      },
    });
  };
  const tryRequest = convertWithErrorHandlingFunc({
    callback: request,
  });
  const res = await tryRequest();
  const questionsQuery = res?.data;
  return addApolloState(apolloClient, {
    props: { questionsQuery, questionsQueryInput },
  });
};
