import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import ExamSkeleton from '@components/exam/ExamSkeleton';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Exam: NextPage = (asd) => {
  const router = useRouter();
  const examId = Number(router.query.e);
  const title = router.query.t
    ? router.query.c + ' ' + router.query.t + ' | '
    : '';
  const [readQuestions, { data: questionsQuery }] =
    useLazyReadQuestionsByExamId('cache-and-network');

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
        title={`${title}모두CBT`}
        pageHeadingTitle={`${title} 문제풀이 페이지`}
      />
      <Layout>
        {questionsQuery ? (
          <ExamComponent questionsQuery={questionsQuery} />
        ) : (
          <ExamSkeleton />
        )}
      </Layout>
    </>
  );
};

export default Exam;
