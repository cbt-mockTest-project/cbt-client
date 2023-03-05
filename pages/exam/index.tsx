import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamSkeleton from '@components/exam/ExamSkeleton';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ExamComponent = dynamic(() => import('@components/exam/ExamComponent'), {
  ssr: false,
  loading: () => <ExamSkeleton />,
});

const Exam: NextPage = () => {
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
      <Layout>{<ExamComponent />}</Layout>
    </>
  );
};

export default Exam;
