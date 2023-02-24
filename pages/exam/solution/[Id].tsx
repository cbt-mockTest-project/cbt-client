import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@components/common/layout/Layout';
import { addApolloState, initializeApollo, useApollo } from '@modules/apollo';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import {
  convertExamTitle,
  convertWithErrorHandlingFunc,
} from '@lib/utils/utils';
import WithHead from '@components/common/head/WithHead';
import { READ_ALL_MOCK_EXAM } from '@lib/graphql/user/query/examQuery';
import { ReadAllMockExamQuery } from '@lib/graphql/user/query/examQuery.generated';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';
import { responsive } from '@lib/utils/responsive';
import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { useRouter } from 'next/router';
import GoogleAd from '@components/common/googleAd/GoogleAd';

interface SolutionProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const Solution: NextPage<SolutionProps> = ({ questionsQuery }) => {
  const [readQuestions, { data: questionsQueryOnClientSide }] =
    useLazyReadQuestionsByExamId('network-only');
  const client = useApollo({}, '');
  const router = useRouter();
  const title = questionsQuery?.readMockExamQuestionsByMockExamId.title;
  useEffect(() => {
    (async () => {
      if (router.query.Id) {
        const res = await readQuestions({
          variables: {
            input: { id: Number(String(router.query.Id)), isRandom: false },
          },
        });
        if (res.data?.readMockExamQuestionsByMockExamId.ok) {
          client.writeQuery<ReadMockExamQuestionsByMockExamIdQuery>({
            query: READ_QUESTIONS_BY_ID,
            data: {
              readMockExamQuestionsByMockExamId:
                res.data.readMockExamQuestionsByMockExamId,
            },
          });
        }
      }
    })();
  }, [router.query.Id]);

  return (
    <>
      <WithHead
        title={`${convertExamTitle(title)} 해설 | 모두CBT`}
        pageHeadingTitle={`${convertExamTitle(title)} 해설 페이지`}
      />
      <Layout>
        <SolutionBlock>
          <h1 className="not-draggable">{convertExamTitle(title)} 문제/해설</h1>
          <ul>
            {(
              questionsQueryOnClientSide || questionsQuery
            ).readMockExamQuestionsByMockExamId.questions.map((el, index) => (
              <>
                <ExamSolutionList
                  key={index}
                  question={el}
                  title={convertExamTitle(title)}
                />
                {index % 3 === 0 && (
                  <GoogleAd className="solution-page-google-ad" />
                )}
              </>
            ))}
          </ul>
        </SolutionBlock>
      </Layout>
    </>
  );
};

export default Solution;

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

const SolutionBlock = styled.div`
  margin-bottom: 50px;
  padding: 20px;
  h1 {
    padding: 0px 20px 0px 20px;
    font-size: 1.3rem;
  }
  @media (max-width: ${responsive.medium}) {
    h1 {
      font-size: 1.1rem;
    }
  }
  .solution-page-google-ad {
    margin-top: 20px;
  }
`;
