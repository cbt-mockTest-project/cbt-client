import WithHead from '@components/common/head/WithHead';
import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import { useReadQuestionsByExamIdQuery } from '@lib/graphql/user/hook/useExamQuestion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Exam: NextPage = () => {
  const router = useRouter();
  const examId = Number(router.query.e);
  const { data: questionsQuery } = useReadQuestionsByExamIdQuery({
    id: examId,
    isRandom: router.query.r === 'true' ? true : false,
  });
  if (!questionsQuery) return null;
  return (
    <>
      <WithHead
        title={`${questionsQuery.readMockExamQuestionsByMockExamId.title} | 모두CBT`}
        pageHeadingTitle={`${questionsQuery.readMockExamQuestionsByMockExamId.title} 문제풀이 페이지`}
      />
      <Layout mainBanner={true}>
        <ExamComponent questionsQuery={questionsQuery} />
      </Layout>
    </>
  );
};

export default Exam;
