import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo } from '@modules/apollo';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { convertExamTitle } from '@lib/utils/utils';
import WithHead from '@components/common/head/WithHead';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';
import styled from 'styled-components';
import ExamPrintComponent from '@components/exam/print/ExamPrintComponent';

interface SolutionProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const Solution: NextPage<SolutionProps> = ({ questionsQuery }) => {
  const title = questionsQuery?.readMockExamQuestionsByMockExamId.title;
  return (
    <>
      <WithHead
        title={`${convertExamTitle(title)}pdf 출력 페이지| 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)}pdf 출력 페이지`}
      />
      <ExamPrintComponent questionsQuery={questionsQuery} />
    </>
  );
};

export default Solution;

const StyledLayout = styled(Layout)`
  .layout-children-wrapper {
    max-width: 1280px;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params?.Id) {
    return {
      notFound: true,
    };
  }
  const apolloClient = initializeApollo({}, '');
  const examId = context.params?.Id;
  const questionsQueryInput: ReadMockExamQuestionsByMockExamIdInput = {
    id: Number(String(examId)),
    isRandom: false,
  };

  const res = await apolloClient.query<ReadMockExamQuestionsByMockExamIdQuery>({
    query: READ_QUESTIONS_BY_ID,
    variables: {
      input: questionsQueryInput,
    },
  });
  const questionsQuery = res?.data;
  return addApolloState(apolloClient, {
    props: { questionsQuery, questionsQueryInput },
  });
};
