import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import { useLazyReadQuestionsByExamIdQuery } from '@lib/graphql/user/hook/useExamQuestion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Exam: NextPage = () => {
  const router = useRouter();
  const examId = Number(router.query.e);
  const [readQuestions, { data: questionsQuery }] =
    useLazyReadQuestionsByExamIdQuery();
  useEffect(() => {
    if (router.isReady) {
      readQuestions({
        variables: {
          input: {
            id: examId,
            isRandom: router.query.r === 'true' ? true : false,
          },
        },
      });
    }
  }, [router.isReady]);
  return (
    <>
      <WithHead
        title={`${questionsQuery?.readMockExamQuestionsByMockExamId.title} | 모두CBT`}
        pageHeadingTitle={`${questionsQuery?.readMockExamQuestionsByMockExamId.title} 문제풀이 페이지`}
      />
      <Layout mainBanner={true}>
        {questionsQuery && <ExamComponent questionsQuery={questionsQuery} />}
      </Layout>
    </>
  );
};

export default Exam;
