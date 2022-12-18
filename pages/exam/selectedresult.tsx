import Layout from '@components/common/layout/Layout';
import SelectedResultComponent from '@components/exam/selectedResult/SelectedResultComponent';
import { useReadQuestionsByState } from '@lib/graphql/user/hook/useExamQuestion';
import { READ_QUESTIONS_BY_STATE } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByStateQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { ME_QUERY } from '@lib/graphql/user/query/userQuery';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { QuestionState } from 'types';

interface SelectedResultPageProps {
  questionsQuery: ReadMockExamQuestionsByStateQuery;
}

const SelectedResult: NextPage<SelectedResultPageProps> = ({
  questionsQuery,
}) => {
  return (
    <Layout mainBanner={true}>
      {questionsQuery && (
        <SelectedResultComponent questionsQuery={questionsQuery} />
      )}
    </Layout>
  );
};

export default SelectedResult;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const states: QuestionState[] = JSON.parse(String(query.c));
  const examId = Number(query.e);
  const request = async () => {
    await apolloClient.query({
      query: ME_QUERY,
    });
    return await apolloClient.query<ReadMockExamQuestionsByStateQuery>({
      query: READ_QUESTIONS_BY_STATE,
      variables: {
        input: {
          states,
          examId,
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
