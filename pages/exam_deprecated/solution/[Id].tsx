import React, { Suspense, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo, useApollo } from '@modules/apollo';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { convertExamTitle } from '@lib/utils/utils';
import WithHead from '@components/common/head/WithHead';
import { READ_ALL_MOCK_EXAM } from '@lib/graphql/user/query/examQuery';
import { ReadAllMockExamQuery } from '@lib/graphql/user/query/examQuery.generated';
import { ReadMockExamQuestionsByMockExamIdInput, UserRole } from 'types';
import dynamic from 'next/dynamic';
import SolutionComponentSkeleton from '@components/solution/SolutionComponentSkeleton';
import GoogleAd from '@components/common/ad/GoogleAd';
import styled from 'styled-components';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';

const SolutionComponent = dynamic(
  () => import('@components/solution/SolutionComponent'),
  { loading: () => <SolutionComponentSkeleton /> }
);
interface SolutionProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const Solution: NextPage<SolutionProps> = ({ questionsQuery }) => {
  const title = questionsQuery?.readMockExamQuestionsByMockExamId.title;
  const { data: meQuery } = useMeQuery();
  return (
    <>
      <WithHead
        title={`${convertExamTitle(title)} 해설 | 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)} 해설 페이지`}
      />
      <StyledLayout subNav="main">
        <SolutionComponent
          questionsQuery={questionsQuery}
          hasSearchInput={true}
          hasNewWindowButton={true}
        />
        <GoogleAd type="display" />
      </StyledLayout>
    </>
  );
};

export default Solution;

const StyledLayout = styled(Layout)`
  .layout-children-wrapper {
    max-width: 1280px;
  }
`;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apolloClient = initializeApollo({}, '');
  let paths: { params: { Id: string } }[] = [];
  try {
    const res = await apolloClient.query<ReadAllMockExamQuery>({
      query: READ_ALL_MOCK_EXAM,
      variables: {
        input: {
          category: '',
          query: '',
          all: true,
        },
      },
    });
    if (res.data.readAllMockExam.mockExams) {
      paths = res.data.readAllMockExam.mockExams.map((el) => ({
        params: { Id: String(el.id) },
      }));
    }
    return { paths, fallback: 'blocking' };
  } catch (err) {
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
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
    revalidate: 43200,
  });
};