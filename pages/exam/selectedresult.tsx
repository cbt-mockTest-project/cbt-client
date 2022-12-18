import Layout from '@components/common/layout/Layout';
import SelectedResultComponent from '@components/exam/selectedResult/SelectedResultComponent';
import { useReadQuestionsByState } from '@lib/graphql/user/hook/useExamQuestion';
import { READ_QUESTIONS_BY_STATE } from '@lib/graphql/user/query/questionQuery';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo } from '@modules/apollo';
import * as cookie from 'cookie';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect } from 'react';
import { QuestionState } from 'types';

interface SelectedResultPageProps {
  readQuestionByStateInput: {
    states: QuestionState[];
    examId: number;
  };
}

const SelectedResult: NextPage<SelectedResultPageProps> = (pageProps) => {
  const data = useReadQuestionsByState({
    input: pageProps.readQuestionByStateInput,
  });

  return (
    <Layout mainBanner={true}>
      <SelectedResultComponent questionsQuery={data} />
    </Layout>
  );
};

export default SelectedResult;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apolloClient = initializeApollo({}, String(context.req.headers.cookie));
  const states: QuestionState[] = JSON.parse(String(query.c));
  const examId = Number(query.e);
  const readQuestionByStateInput = { states, examId };
  const tryReadQuestionsByState = convertWithErrorHandlingFunc({
    callback: () =>
      apolloClient.query({
        query: READ_QUESTIONS_BY_STATE,
        variables: {
          input: {
            states,
            examId,
          },
        },
      }),
  });
  await tryReadQuestionsByState();
  return addApolloState(apolloClient, { props: { readQuestionByStateInput } });
};
