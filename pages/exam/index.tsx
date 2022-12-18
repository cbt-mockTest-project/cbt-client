import Layout from '@components/common/layout/Layout';
import ExamComponent from '@components/exam/ExamComponent';
import { useReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Exam = () => {
  const router = useRouter();
  const [readQuestions, { data: questionsQuery }] = useReadQuestionsByExamId();
  const tryReadQuestions = convertWithErrorHandlingFunc({
    callback: async () =>
      await readQuestions({
        variables: { input: { id: Number(router.query.e) } },
      }),
  });
  useEffect(() => {
    if (router.query.e) {
      tryReadQuestions();
    }
  }, [router.query.e]);
  return (
    <Layout mainBanner={true}>
      {questionsQuery && <ExamComponent questionsQuery={questionsQuery} />}
    </Layout>
  );
};

export default Exam;
