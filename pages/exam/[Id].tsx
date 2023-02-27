import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { READ_ALL_MOCK_EXAM } from '@lib/graphql/user/query/examQuery';
import { ReadAllMockExamQuery } from '@lib/graphql/user/query/examQuery.generated';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { addApolloState, initializeApollo, useApollo } from '@modules/apollo';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';

interface ExamPageProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const Exam: NextPage<ExamPageProps> = ({ questionsQuery }) => {
  const router = useRouter();
  const title = router.query.t
    ? router.query.c + ' ' + router.query.t + ' | '
    : '';

  const client = useApollo({}, '');
  useEffect(() => {}, [router.query.Id]);
  return (
    <>
      <WithHead
        title={`${title}모두CBT`}
        pageHeadingTitle={`${title} 문제풀이 페이지`}
      />
      <Layout>{<ExamComponent questionsQuery={questionsQuery} />}</Layout>
    </>
  );
};

export default Exam;

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
    revalidate: 86400,
  });
};
